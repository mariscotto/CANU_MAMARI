var express = require('express');
var bodyParser = require('body-parser');

var Solution = require('../models/solutionCanu').SolutionCanu;
var SolutionAll = require('../models/solutionCanu').SolutionCanuAll;
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
            }, (err) => next(err))

            .catch(err => next(err));
    })
    .post((req, res, next) => {
        //Welcher Aufagabentyp ?
        // Im Fall von "Neue_Wörter" alphabetisches Ordnen in einen Array der Lösungswörter
        // Abgleich mit Datenbank Solutions
        Solution.findOne({ $and: [{ solution: req.body.solution }] })
            .then((solution) => {
                // Im Fall einer neuen Lösung
                if (!solution) {
                    // Erzeugen eines Eintrages in Solution
                    Solution.create({
                        solution: req.body.solution,
                        novelty_score: 1,
                        usefulness_score: req.body.usefulness_score,
                        counter: 1,
                    })
                        .then((solution) => {
                            //Erzeugen eines Eintrages in SolutionAll
                            let createSolutionAll = function () {
                                return new Promise(function (resolve, reject) {
                                    SolutionAll.create({
                                        solution: solution._id,
                                        VP_id: req.sessionID,
                                        study: req.params.studyId,
                                        group: req.params.groupId
                                    }).then((solution) => {
                                        Study.findById(req.params.studyId)
                                            .then(study => {
                                                study.solutions.push(solution._id)
                                                study.save();
                                                resolve();
                                            }, err => next(err))
                                    }, err => next(err))
                                })
                            }
                            //Aktualisieren des Neuheitswertes der anderen Lösungen zu diesem Task
                            //Reihenfolge beachten!! Eintragen in Solutions und SolutionsAll muss vor updateNeu beendet sein
                            createSolutionAll().then(() => {
                                //updateNeu(solution, req.body)
                            }).then(() => {
                                // Rückmeldung
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(solution);
                            }, err => next(err));
                        }, err => next(err));
                }
                else {
                    // Im Falle einer bereits existierenden Lösung:
                    // Erzeugen eines Eintrages in SolutionAll
                    SolutionAll.create({
                        solution: solution._id,
                        VP_id: req.sessionID,
                        study: req.params.studyId,
                        group: req.params.groupId
                    })
                        .then((solution) => {
                            // Referenz in Study anlegen
                            Study.findById(req.params.studyId)
                                .then(study => {
                                    study.solutions.push(solution._id);
                                    study.save();
                                }, err => next(err))

                            // Aktualisieren der Werte "neu" und "counter" in Solutions und damit auch in SolutionsAll
                            // Funktion "actualizeSolution" siehe unten
                            actualizeSolutions(solution, req.body, (solution) => {
                                //Rückmeldung über den Erfolg der Aktion
                                if (!solution) {
                                    err = new Error('solution ' + req.body.solution + ' could not be actualized');
                                    err.status = 404;
                                    return next(err);
                                }
                                else {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(solution);
                                }
                            }, err => next(err));
                        }, err => next(err));
                }
            }, err => next(err))
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
                    }
                    else {
                        continue;
                    }
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(blocks);
            }, (err) => next(err))
            .catch(err => next(err));
    });





solutionCanuRouter.route('/updateNovelty')
    .post(/*passport.authenticate('jwt', { session: false }),*/(req, res, next) => {
        updateSolutionNovelty(req, req.body, (solution) => {
            //Rückmeldung über den Erfolg der Aktion
            if (!solution) {
                err = new Error('solution ' + req.body.solution + ' could not be actualized');
                err.status = 404;
                return next(err);
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(solution);
            }
        }, err => next(err));
    });

function updateSolutionNovelty(req, body, callback) {
    // Erhöhen des Zählers der aktuellen Lösung um eins
    //solution.counter = solution.counter + 1;
    //console.log(solution);
    // Zählen aller jemals eingegangenen Lösungen zur aktuellen Aufgabe
    SolutionAll.countDocuments()
        .then((N_max) => {
            //Aktualisierung des Neuheitswertes dieser Lösung, Berechnung linear
            // Solution.find({"_id": solution.solution}/*ref in SolutionsALl*/)
            Solution.find( /*ref in SolutionsALl*/)
                .then(solutions => {
                    if (solutions != null) {
                        solutions.forEach(function (solution) {
                            if(solution.counter !== 1) {
                                solution.novelty_score = 1 - (solution.counter / N_max);
                                // Runden auf fünf Nachkommastellen
                                solution.novelty_score = Math.round((solution.novelty_score * 100)) / 100;
                            } else{
                                solution.novelty_score = 1;
                            }
                            // Speichern
                            solution.save()
                                .then(solution => {
                                    callback(solution)
                                });
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
                    }
                    else {
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
    SolutionAll.countDocuments()
        .then((N_max) => {
            //Aktualisierung des Neuheitswertes dieser Lösung, Berechnung linear
           // Solution.find({"_id": solution.solution}/*ref in SolutionsALl*/)
            Solution.findById(solution.solution /*ref in SolutionsALl*/)
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
                })
            //Aktualisieren des Neuheitswertes der anderen Lösungen zu diesem Task
            Solution.find({ '_id': { $ne: solution.solution }})
                .then((solutions) => {
                    if (solutions != null && N_max !== 1) {
                        solutions.forEach(function (item) {
                            // Berechnung des neuen Neuartigkeitswertes
                            //item.novelty_score = 1 - (item.counter / N_max);
                            // Runden auf fünf Nachkommastellen
                            //item.novelty_score = Math.round((item.novelty_score * 100)) / 100;
                            item.save();
                        })
                    }
                    else {
                        return;
                    }
                })
        })
};

module.exports = solutionCanuRouter;
