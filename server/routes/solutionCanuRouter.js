var express = require('express');
var bodyParser = require('body-parser');

var Solution = require('../models/solutionCanu').SolutionCanu;
var SolutionAll = require('../models/solutionCanu').SolutionCanuAll;
var Questionnaire = require('../models/Questionnaire').Questionnaire;
//var Solution = require('../models/solutionCanu').SolutionCanu;
//var SolutionAll = require('../models/solutionCanu').SolutionCanuAll;
var Study = require('../models/study').Study;

var solutionCanuRouter = express.Router();

solutionCanuRouter.use(bodyParser.json());

//////////////////////////
// Route zu den einzelnen Studien
// Einsehen der Ergebnisse einzelner Studien
// Eingabe der Lösungen eine VP und Speichern in der Datenbank

solutionCanuRouter.route('/:studyId/:groupId')
    .get((req, res, next) => {
        //res.cookie({ maxAge: 900000, httpOnly: true })
        // Senden der Tasks, die zur jeweiligen Studie gehören
        Study.findById(req.params.studyId)
            .then((study) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.send(req.sessionID);
                /*if (req.session) {
                    req.session.destroy((err) => {
                        if (err) {
                            next(err)
                        } else {
                            console.log("trigger clear");
                            res.clearCookie('connect.sid');
                            res.redirect('/')
                        }
                    })
                }*/
            }, (err) => next(err))

            .catch(err => next(err));
    })
    .post((req, res, next) => {
        //Welcher Aufagabentyp ?
        // Im Fall von "Neue_Wörter" alphabetisches Ordnen in einen Array der Lösungswörter
        // Abgleich mit Datenbank Solutions
        const addedSolutions = []
        return Promise.all([
            req.body.solutions.map((solutionEntry) => {
                return Solution.findOne({$and: [{solution: solutionEntry.solution}]}).then((solution) => {
                    // Im Fall einer neuen Lösung
                    if (!solution) {
                        // Erzeugen eines Eintrages in Solution
                        return Solution.create({
                            solution: solutionEntry.solution,
                            novelty_score: 1,
                            usefulness_score: solutionEntry.usefulness_score,
                            counter: 1,
                        }).then((solution) => {
                            //Erzeugen eines Eintrages in SolutionAll
                            let createSolutionAll = function () {
                                return new Promise(function (resolve, reject) {
                                    SolutionAll.create({
                                        solution: solution._id,
                                        VP_id: req.sessionID,
                                        study: req.params.studyId,
                                        group: req.params.groupId,
                                        motivated: solutionEntry.motivated,
                                        timestamp: solutionEntry.timestamp,
                                        timePassedMil: solutionEntry.timePassedMil
                                    }).then((solution) => {
                                        Study.findById(req.params.studyId)
                                            .then(study => {
                                                study.solutions.push(solution._id)
                                                study.save();
                                                return resolve();
                                            }, err => next(err))
                                    }, err => next(err))
                                })
                            }
                            //Aktualisieren des Neuheitswertes der anderen Lösungen zu diesem Task
                            //Reihenfolge beachten!! Eintragen in Solutions und SolutionsAll muss vor updateNeu beendet sein
                            return createSolutionAll().then(() => {
                                addedSolutions.push(solution)
                            });
                            //     .then(() => {
                            //     //updateNeu(solution, req.body)
                            // }).then(() => {
                            //     // Rückmeldung
                            //     res.statusCode = 200;
                            //     res.setHeader('Content-Type', 'application/json');
                            //     res.json(solution);
                            // }, err => next(err));
                        }, err => next(err));
                    } else {
                        // Im Falle einer bereits existierenden Lösung:
                        // Erzeugen eines Eintrages in SolutionAll
                        return SolutionAll.create({
                            solution: solution._id,
                            VP_id: req.sessionID,
                            study: req.params.studyId,
                            group: req.params.groupId,
                            motivated: solutionEntry.motivated,
                            timestamp: solutionEntry.timestamp,
                            timePassedMil: solutionEntry.timePassedMil
                        }).then((solution) => {
                            const promises = []
                            // Referenz in Study anlegen
                            promises.push(Study.findById(req.params.studyId).then(study => {
                                study.solutions.push(solution._id);
                                study.save();
                            }, err => next(err)))

                            // Aktualisieren der Werte "neu" und "counter" in Solutions und damit auch in SolutionsAll
                            // Funktion "actualizeSolution" siehe unten
                            promises.push(actualizeSolutions(solution, solutionEntry, (solution) => {
                                //Rückmeldung über den Erfolg der Aktion
                                if (!solution) {
                                    err = new Error('solution ' + solutionEntry + ' could not be actualized');
                                    err.status = 404;
                                    return next(err);
                                } else {
                                    addedSolutions.push(solution)
                                }
                            }, err => next(err)));

                            return Promise.all(promises)
                        }, err => next(err));
                    }
                }, err => next(err))
            })
        ]).then(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(addedSolutions);
        });
    });

// Ausgabe aller Tasks vom Typ "Tetris" zu einer Studie
solutionCanuRouter.route('/canu/:studyId/:groupId')
    .get((req, res, next) => {
        Study.findById(req.params.studyId)
            .populate('tasks')
            .then((study) => {
                var blocks = [];
                for (i = 0; i < study.tasks.length; i++) {
                    if (study.tasks[i].task_type == 'Tetris') {
                        blocks.push(study.tasks[i])
                    } else {
                        continue;
                    }
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(blocks);
            }, (err) => next(err))
            .catch(err => next(err));
    });

solutionCanuRouter.route('/clearCookie')
    .get((req, res, next) => {
        res.clearCookie('VP');
        res.send('Cookie cleared');
    });


solutionCanuRouter.route('/updateNovelty')
    .post(/*passport.authenticate('jwt', { session: false }),*/(req, res, next) => {
        updateSolutionNovelty(req, req.body).then((solutions) => {
            //Rückmeldung über den Erfolg der Aktion
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(solutions);
        }, err => next(err));
    });

function updateSolutionNovelty(req, body) {
    // Erhöhen des Zählers der aktuellen Lösung um eins
    //solution.counter = solution.counter + 1;
    //console.log(solution);
    // Zählen aller jemals eingegangenen Lösungen zur aktuellen Aufgabe
    const updatedSolutions = []
    return Questionnaire.countDocuments()
        .then((N_max) => {
            //Aktualisierung des Neuheitswertes dieser Lösung, Berechnung linear
            // Solution.find({"_id": solution.solution}/*ref in SolutionsALl*/)
            return Solution.find( /*ref in SolutionsALl*/)
                .then(solutions => {
                    if (solutions != null) {
                        return Promise.all([
                            solutions.map(function (solution) {
                                if (solution.counter !== 1) {
                                    solution.novelty_score = 1 - (solution.counter / N_max);
                                    // Runden auf fünf Nachkommastellen
                                    solution.novelty_score = Math.round((solution.novelty_score * 100)) / 100;
                                } else {
                                    solution.novelty_score = 1;
                                }
                                // Speichern
                                return solution.save()
                                    .then(solution => {
                                        updatedSolutions.push(solution)
                                    });
                            })
                        ]).then(() => {
                            return Promise.resolve(updatedSolutions)
                        });
                    }
                });
            //Aktualisieren des Neuheitswertes der anderen Lösungen zu diesem Task
            /*Solution.find({ '_id': { $ne: solution.solution }})
                .then((solutions) => {
                    if (solutions != null && N_max !== 1) {
                        solutions.forEach(function (item) {
                            // Berechnung des neuen Neuartigkeitswertes
                            item.novelty_score = 1 - (item.counter / N_max);
                            // Runden auf fünf Nachkommastellen
                            //item.novelty_score = Math.round((item.novelty_score * 100)) / 100;
                            item.save();
                        })
                    }
                    else {
                        return;
                    }
                })*/
        })
};


// Aktualisiert in Solutions den Neuheitswert der anderen Lösungen bei neuer Lösung
let updateNeu = function (solution, body) {
    // Zählen aller Einträge zu aktuellem Task in SolutionsAll
    SolutionAll.countDocuments()
        .then((N_max) => {
            // Ausgeben aller Einträgezu aktuellem Task und Aktualisieren des Neuheitswertes
            Solution.find(/*{ $and: [{ 'task': body.task }, {'_id':{$ne: solution._id}}] }*/)
                .then((solutions) => {
                    if (solutions != null && N_max !== 1) {
                        solutions.forEach(function (item) {
                            // Berechnung des neuen Neuartigkeitswert
                            item.novelty_score = 1 - (item.counter / N_max);
                            // Runden auf fünf Nachkommastellen
                            //item.novelty_score = Math.round((item.novelty_score * 100)) / 100;
                            // Speichern des neuen Wertes
                            item.save();
                        })
                    } else {
                        return;
                    }
                })
        })
};

//Berechnung des Neuheitswertes/ Aktuaisieren der Einträge
function actualizeSolutions(solution, body, callback, next) {
    // Erhöhen des Zählers der aktuellen Lösung um eins
    //solution.counter = solution.counter + 1;
    //console.log(solution);
    // Zählen aller jemals eingegangenen Lösungen zur aktuellen Aufgabe
    return SolutionAll.countDocuments()
        .then((N_max) => {
            const promises = []
            //Aktualisierung des Neuheitswertes dieser Lösung, Berechnung linear
            // Solution.find({"_id": solution.solution}/*ref in SolutionsALl*/)
            promises.push(Solution.findById(solution.solution /*ref in SolutionsALl*/)
                .then(solution => {
                    solution.counter += 1;
                    // solution.novelty_score = 1 - (solution.counter / N_max);
                    // Runden auf fünf Nachkommastellen
                    //solution.novelty_score = Math.round((solution.novelty_score * 100)) / 100;
                    // Speichern
                    solution.save()
                        .then(solution => {
                            callback(solution)
                        });
                }))
            //Aktualisieren des Neuheitswertes der anderen Lösungen zu diesem Task
            promises.push(Solution.find({'_id': {$ne: solution.solution}})
                .then((solutions) => {
                    if (solutions != null && N_max !== 1) {
                        solutions.forEach(function (item) {
                            // Berechnung des neuen Neuartigkeitswertes
                            //item.novelty_score = 1 - (item.counter / N_max);
                            // Runden auf fünf Nachkommastellen
                            //item.novelty_score = Math.round((item.novelty_score * 100)) / 100;
                            item.save();
                        })
                    } else {
                        return;
                    }
                }))
            return Promise.all(promises)
        })
};

module.exports = solutionCanuRouter;
