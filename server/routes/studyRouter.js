var express = require('express');
var bodyParser = require('body-parser');
var shuffle = require('knuth-shuffle').knuthShuffle;
var passport = require('passport');

var User = require('../models/user');
var Study = require('../models/study').Study;
var SolutionAll = require('../models/solutionCanu').SolutionCanuAll;
var Solution = require('../models/solutionCanu').SolutionCanu;
var Questionnaire = require('../models/Questionnaire').Questionnaire;
var APM = require('../models/APM');

var studyRouter = express.Router();

studyRouter.use(bodyParser.json());

//
// Ausgabe der Studien (ohne Lösungen und Tasks) und zugehörigen Teilnehmenern
studyRouter.route('/:userId')
    .get(/*passport.authenticate('jwt', { session: false }),*/(req, res, next) => {
        Study.find({user: req.params.userId})
            .populate({
                path: 'solutions',
                populate: {
                    path: 'solution',
                    model: 'SolutionCanu'
                }
            })
            .then(studies => {
                studies_view = [];
                let loop = function () {
                    return new Promise(function (resolve) {
                        for (i = 0; i < studies.length; i++) {
                            var study_view = new Object;
                            var novelty_mean = 0;
                            var usefulness_mean = 0;
                            var participants = [];
                            var participants_count = 0;
                            var different_solutions = [];

                            for (j = 0; j < studies[i].solutions.length; j++) {
                                if (participants.includes(studies[i].solutions[j].VP_id)) {
                                    continue
                                } else {
                                    participants.push((studies[i].solutions[j].VP_id))
                                }
                            }

                            for (l = 0; l < studies[i].solutions.length; l++) {
                                if (different_solutions.includes(studies[i].solutions[l].solution)) {
                                    continue;
                                } else {
                                    different_solutions.push(studies[i].solutions[l].solution);
                                    novelty_mean = novelty_mean + studies[i].solutions[l].solution.novelty_score;
                                    usefulness_mean = usefulness_mean + studies[i].solutions[l].solution.usefulness_score;
                                }
                            }

                            novelty_mean = novelty_mean / different_solutions.length;
                            usefulness_mean = usefulness_mean / different_solutions.length;
                            creative_mean = (novelty_mean + usefulness_mean) / 2;
                            participants_count = participants.length;

                            // Schreiben der Ergebnisse in ein Objekt
                            study_view.study = studies[i];
                            study_view.novelty_mean = (Math.round(novelty_mean * 100)) / 100;
                            study_view.usefulness_mean = (Math.round(usefulness_mean * 100)) / 100;
                            study_view.creative_mean = (Math.round(creative_mean * 100)) / 100;
                            study_view.participants = participants;
                            study_view.participants_count = participants_count;
                            studies_view.push(study_view);
                        }
                        resolve();
                    })
                }

                loop().then(() => {
                    // Senden der gesamten Lösungen
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(studies_view);
                }, err => next(err))
            }, err => next(err))
            .catch(err => next(err));
    })

    //
    // Anlegen einer Studie
    .post(/*passport.authenticate('jwt', { session: false }),*/(req, res, next) => {
        // Auswählen zufälliger Tasks in jeweils gewünschter Anzahl - siehe untern
        // Kettung der einzelnen Bausteine der Studie
        // Befüllen des Array groups
        let fillUpGroups = function () {
            return new Promise(function (resolve, reject) {
                var groups = [];
                req.body.groups.forEach(function (item) {
                    groups.push(item);
                });
                resolve(groups);
            })
        }

        // Studie erstellen und speichern
        let createStudy = function (groups) {
            return new Promise(function (resolve, reject) {
                Study.create({
                    study_name: req.body.study_name,
                    description: req.body.description,
                    study_link: [],
                    groups: groups,
                    solutions: [],
                    user: req.params.userId
                })
                    .then(study => {
                        resolve(study)
                    }, err => next(err));
            })
        };

        // Befüllen des Arrays study_link mit den zuvor angelegten group._id s
        let fillUpLink = function (study) {
            return new Promise(function (resolve, reject) {
                study.groups.forEach(function (item) {
                    study.study_link.push('creativity.lfe.mw.tum.de/' + study._id + '/' + item._id);
                });
                resolve(study);
            })
        }

        // Reihenfolge festlegen, study._id in User schreiben und Studie ausgeben
        fillUpGroups().then(resolve => {
            return createStudy(resolve).then(resolve => {
                return fillUpLink(resolve).then(resolve => {
                    resolve.save();
                    User.findById(req.params.userId)
                        .then((user) => {
                            user.studies.push(resolve._id);
                            user.save()
                        }, (err) => next(err))
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resolve);
                }, err => next(err));
            }, err => next(err));
        }, err => next(err))
            .catch(err => next(err));
    })

//
// Ausgabe einer bestimmten Studie
studyRouter.route('/:userId/:studyId')
    .get(/*passport.authenticate('jwt', { session: false }),*/(req, res, next) => {
        Study.findById(req.params.studyId)
            .populate({
                path: 'solutions',
                populate: {
                    path: 'solution',
                    model: 'SolutionCanu'
                }
            })
            .then(study => {
                let loop = function () {
                    return new Promise(function (resolve) {
                        for (i = 0; i < study.groups.length; i++) {
                            var usefulness_mean = 0;
                            var novelty_mean = 0;
                            var groupSolutions = [];
                            var different_solutions = [];
                            var participants = [];

                            for (j = 0; j < study.solutions.length; j++) {
                                if (study.solutions[j].group.equals(study.groups[i]._id)) {
                                    study.solutions[j].group_name = study.groups[i].group_name;
                                    study.groups[i].solutions.push(study.solutions[j]);
                                    groupSolutions.push(study.solutions[j]);
                                } else {
                                    continue
                                }
                            }

                            for (l = 0; l < groupSolutions.length; l++) {
                                if (different_solutions.includes(groupSolutions[l].solution)) {
                                    continue;
                                } else {
                                    different_solutions.push(groupSolutions[l].solution);
                                    novelty_mean = novelty_mean + groupSolutions[l].solution.novelty_score;
                                    usefulness_mean = usefulness_mean + groupSolutions[l].solution.usefulness_score;
                                }
                            }

                            for (k = 0; k < groupSolutions.length; k++) {
                                if (participants.includes(groupSolutions[k].VP_id)) {
                                    continue;
                                } else {
                                    participants.push(groupSolutions[k].VP_id)
                                }

                            }

                            novelty_mean = novelty_mean / different_solutions.length;
                            usefulness_mean = usefulness_mean / different_solutions.length;
                            creative_mean = (novelty_mean + usefulness_mean) / 2;
                            study.groups[i].novelty_mean = (Math.round(novelty_mean * 100)) / 100;
                            study.groups[i].usefulness_mean = (Math.round(usefulness_mean * 100)) / 100;
                            study.groups[i].creative_mean = (Math.round(creative_mean * 100)) / 100;
                            study.groups[i].participants_count = participants.length;

                        }
                        resolve();
                    })
                }

                loop().then(() => {
                    // Senden der gesamten Lösungen
                    console.log('send')
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(study)
                }, err => next(err))
            }, err => next(err))
            .catch(err => next(err));
    })

    //
    // Ändern einer Studie
    .put(/*passport.authenticate('jwt', { session: false }),*/(req, res, next) => {
        // Check, if study obtained already one solution
        SolutionAll.findOne({study: req.params.studyId})
            .populate('study')
            .then(solution => {
                if (solution) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('It`s not allowed to change study "' + solution.study.study_name + '". There are already solutions given');
                } else {
                    var old_study_name = req.body.study_name;
                    Study.findById(req.params.studyId)
                        .then(study => {
                            // Kettung der einzelnen Bausteine der Studie
                            // Befüllen des Array groups
                            let fillUpGroups = function (study) {
                                return new Promise(function (resolve, reject) {
                                    study.groups = [];
                                    study.save();
                                    groups = [];
                                    req.body.groups.forEach(function (item) {
                                        groups.push(item);
                                    });
                                    resolve(groups);
                                })
                            }

                            // Studie erstellen und speichern
                            let putStudy = function (study, groups) {
                                return new Promise(function (resolve, reject) {
                                    study.study_name = req.body.study_name;
                                    study.description = req.body.description;
                                    study.study_link = [];
                                    study.groups = groups;
                                    study.solutions = [];
                                    study.user = req.params.userId;
                                    resolve(study);
                                    study.save();
                                }, err => next(err));
                            };

                            // Befüllen des Arrays study_link mit den zuvor angelegten group._id s
                            let fillUpLink = function (study) {
                                return new Promise(function (resolve, reject) {
                                    study.groups.forEach(function (item) {
                                        study.study_link.push('creativity.lfe.mw.tum.de/' + study._id + '/' + item._id);
                                        //console.log(item)
                                    });
                                    resolve(study);
                                })
                            }

                            // Reihenfolge festlegen, study._id in User schreiben und Studie ausgeben
                            fillUpGroups(study).then(resolve => {
                                return putStudy(study, resolve).then(resolve => {
                                    return fillUpLink(resolve).then(resolve => {
                                        resolve.save();
                                        User.findById(req.params.userId)
                                            .then((user) => {
                                                user.studies.push(resolve._id);
                                                user.save();
                                            }, (err) => next(err))
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(resolve);
                                    }, err => next(err));
                                }, err => next(err));
                            }, err => next(err));
                        }, err => next(err));
                }
            }, err => next(err))
            .catch(err => next(err));
    })

    //
    // Löschen einer Studie
    .delete(/*passport.authenticate('jwt', { session: false }),*/(req, res, next) => {
        User.findById(req.params.userId)
            .then(user => {
                for (i = 0; i < user.studies.length; i++) {
                    if (user.studies[i]._id == req.params.studyId) {
                        user.studies.splice(i, 1);
                        user.save();
                    } else {
                        continue;
                    }
                }
            }, err => next(err));

        SolutionAll.find({study: req.params.studyId})
            .then(solutions => {
                for (i = 0; i < solutions.length; i++) {
                    solutions[i].study = undefined;
                    solutions[i].group = undefined;
                    solutions[i].save();
                }
            }, err => next(err));

        Study.findByIdAndDelete(req.params.studyId)
            .then((study) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.send({success: true, status: 'Study deleted!'});
            }, err => next(err))
            .catch((err) => next(err));
    });

//
// Schließen einer Studie - open auf "false" setzen
studyRouter.route('/:userId/:studyId/close')
    .put(/*passport.authenticate('jwt', { session: false }),*/(req, res, next) => {
        Study.findById(req.params.studyId)
            .then(study => {
                if (study.open == true) {
                    study.open = false;
                    // study.open = req.body.open
                    study.save();
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.send({success: true, status: 'Study ' + study.study_name + ' changed to closed'});
                } else if (study.open == false) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.send({success: true, status: 'Study ' + study.study_name + ' already closed'});
                }
            }, err => next(err))
            .catch(err => next(err));

    })


// Ausgabe der Lösungen für das Herunterladen als csv_Daten
studyRouter.route('/:userId/:studyId/download')
    .get(/*passport.authenticate('jwt', { session: false }),*/(req, res, next) => {

        var participants = [];
        var csv_arr = [];
        var csv_sol = [];
        var questionnaires = [];
        var apms = [];
        var studyName = '';
        // Auslesen aller benötigten Daten zu einer Studie
        //
        // Alle Lösungen zu einer Studie
        /*let solutions = function () {
            return new Promise(function (resolve) {
                SolutionAll.find({'study': req.params.studyId})
                    .populate('solution')
                    .populate('study')
                    .then(solutions => {
                        console.log(solutions);
                        for (i = 0; i < solutions.length; i++) {
                            for (j = 0; j < solutions[i].study.groups.length; j++) {
                                if (solutions[i].group.equals(solutions[i].study.groups[j]._id)) {
                                    var group_name = solutions[i].study.groups[j].group_name;
                                } else {
                                    continue
                                }
                            }

                            // Hilfsvariable für solutions_blank
                            studyName = solutions[0].study.study_name;
                            solution = new Object({
                                solution: solutions[i].solution.solution.join(' '),
                                group: group_name,
                                novelty_score: solutions[i].solution.novelty_score,
                                usefulness_score: solutions[i].solution.usefulness_score,
                                study: solutions[i].study.study_name,
                                participant: solutions[i].VP_id
                            });

                            csv_sol.push(solution);
                        }
                        resolve(csv_sol);
                    }, err => next(err));
            })
        };*/

        let solutions = function () {
            return new Promise(function (resolve) {
                SolutionAll.find({'study': req.params.studyId})
                    .populate('solution')
                    .populate('study')
                    //.populate('group')
                    .then(solutions => {
                        for (let i = 0; i < solutions.length; i++) {
                            for (let j = 0; j < solutions[i].study.groups.length; j++) {
                                if (solutions[i].group.equals(solutions[i].study.groups[j]._id)) {
                                    var group_name = solutions[i].study.groups[j].group_name;
                                }
                                else {
                                    continue
                                }
                            }
                            //var group_name = solutions[0].study.groups[0].group_name;
                            // Hilfsvariable für solutions_blank
                            studyName = solutions[0].study.study_name;
                            var solution = new Object({
                                solution: JSON.stringify(solutions[i].solution.solution).replace(/,/g,":").replace(/;/g,"."),
                                group: group_name,
                                novelty_score: solutions[i].solution.novelty_score,
                                usefulness_score: solutions[i].solution.usefulness_score,
                                timestamp: solutions[i].timestamp,
                                timePassedMil: solutions[i].timePassedMil,
                                counter: solutions[i].solution.counter,
                                study: solutions[i].study.study_name,
                                VP_id: solutions[i].VP_id
                            });

                            csv_sol.push(solution);
                        }
                        resolve(csv_sol);
                    }, err => next(err));
            })
        }


        // Daten zu Versuchspersonen
        let questionnaire = function () {
            return new Promise(function (resolve) {
                Questionnaire.find()
                    .then(questionnaires => {
                        resolve(questionnaires);
                    })
            })
        };

        // Daten zum APM
        let apm = function () {
            return new Promise(function (resolve) {
                APM.find()
                    .then(apm => {
                        resolve(apm);
                    })
            })
        };


        // Ausführung nacheinander (damit alle Daten zum Zusammenbau bereitliegen)
        solutions().then(resolve => {
            csv_sol = resolve;
            return questionnaire().then(resolve => {
                questionnaires = resolve;
                 apm().then(resolve => {
                    apms = resolve;

                        // ein Questionnaire pro Teilnehmer
                        // Iteration über alle Teinehmer einer Studie
                        for (i = 0; i < questionnaires.length; i++) {
                            // Zuordnung der zugehörigen Daten
                            if (participants.includes(questionnaires[i].VP_id)) {
                                continue;
                            } else {
                                participants.push(questionnaires[i].VP_id);

                                var apm_aktuell = apms.find(function (element) {
                                    return element.VP_id === questionnaires[i].VP_id;
                                });

                                // Abfangen unausgefüllter APM Bögen
                                if (!apm_aktuell) {
                                    apm_aktuell = [];
                                }

                                var solutions_aktuell = csv_sol.filter(element =>
                                    element.VP_id === questionnaires[i].VP_id
                                );

                                // Handhabe nicht-gegebener Lösungen zum creattest - Auffüllen mit leeren Objecten
                                /*var solution_blank = new Object({
                                    solution: '',
                                    group: '',
                                    novelty_score: '',
                                    study: studyName,
                                    usefulness_score: '',
                                    participant: questionnaires[i].VP_id
                                });*/

                               /* while (solutions_aktuell.length < 8) {
                                    solutions_aktuell.push(solution_blank);
                                }*/
                                //console.log(solutions_aktuell);
                                // Erstellen eines Datensatzes zu je einem Teinehmer
                                var csv = new Object({
                                    Participant: questionnaires[i].VP_id,
                                    Finished:questionnaires[i].createdAt,
                                    Age: questionnaires[i].age,
                                    Gender: questionnaires[i].gender,
                                    Education_grade: questionnaires[i].education_grade,
                                    Job_area: questionnaires[i].job_area,
                                    Creative_test: questionnaires[i].creative_test,
                                    Creative_skills: questionnaires[i].creative_skills,
                                    Personality_adjectives: questionnaires[i].personality_adjectives,
                                    APM_1: apm_aktuell.APM_1,
                                    APM_2: apm_aktuell.APM_2,
                                    APM_3: apm_aktuell.APM_3,
                                    APM_4: apm_aktuell.APM_4,
                                    APM_5: apm_aktuell.APM_5,
                                    APM_6: apm_aktuell.APM_6,
                                    APM_7: apm_aktuell.APM_7,
                                    APM_8: apm_aktuell.APM_8,
                                    APM_9: apm_aktuell.APM_9,
                                    APM_10: apm_aktuell.APM_10,
                                    APM_11: apm_aktuell.APM_11,
                                    APM_12: apm_aktuell.APM_12
                                });

                                solutions_aktuell.forEach((solution, index) => {
                                    if(index === 0){
                                        csv["group"] = solution.group;
                                    }
                                    csv["solution_"+index] = solution.solution;
                                    csv["solution_"+index+"_novScore"] = solution.novelty_score;
                                    csv["solution_"+index+"_usefulScore"] = solution.usefulness_score;
                                    csv["solution_"+index+"_timestamp"] = solution.timestamp;
                                    csv["solution_"+index+"_timePassedMil"] = solution.timePassedMil;
                                    csv["solution_"+index+"_counter"] = solution.counter;
                                });
                                // Erstellen des gesammten AusgabeArrays
                                csv_arr.push(csv);
                            }
                        }

                        // Senden des json Object zur CSV Ausgabe
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(csv_arr);
                }, err => next(err));
            }, err => next(err));
        }, err => next(err));
    });

// Ausgabe der Lösungen für das Herunterladen als csv_Daten
studyRouter.route('/:userId/:studyId/downloadSolutions')
    .get(/*passport.authenticate('jwt', { session: false }),*/(req, res, next) => {
        var csv_arr = [];
        var csv_sol = [];
        let solutions = function () {
            return new Promise(function (resolve) {
                Solution.find()
                    //.populate('study')
                    .then(solutions => {
                        for (let i = 0; i < solutions.length; i++) {
                            /*for (j = 0; j < solutions[i].study.groups.length; j++) {
                                if (solutions[i].group.equals(solutions[i].study.groups[j]._id)) {
                                    var group_name = solutions[i].study.groups[j].group_name;
                                } else {
                                    continue
                                }
                            }*/

                            // Hilfsvariable für solutions_blank
                            //studyName = solutions[0].study.study_name;
                            /* var solution = new Object({
                                 solution: solutions[i].solution.solution.join(' '),
                                 //group: solutions[i].group_name,
                                 novelty_score: solutions[i].solution.novelty_score,
                                 usefulness_score: solutions[i].solution.usefulness_score,
                                 study: solutions[i].study.study_name,
                                 participant: solutions[i].VP_id
                             });*/

                            csv_sol.push(solutions[i]);
                        }
                        resolve(csv_sol);
                    }, err => next(err));
            })
        };




        solutions().then(resolve => {
            csv_sol = resolve;

            csv_sol.forEach((solution) => {
                var csv = new Object({
                    solution: JSON.stringify(solution.solution).replace(/,/g,":").replace(/;/g,"."),
                    novelty_score:solution.novelty_score,
                    usefulness_score:solution.usefulness_score,
                    counter:solution.counter
                });
                csv_arr.push(csv);
            });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(csv_arr);
        }, err => next(err));
    });

//

studyRouter.route('/:userId/:studyId/updateNovelty')
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
                .then(solution => {
                    solution.novelty_score = 1 - (solution.counter / N_max);
                    // Runden auf fünf Nachkommastellen
                    solution.novelty_score = Math.round((solution.novelty_score * 100)) / 100;
                    // Speichern
                    solution.save()
                        .then(solution => {
                            callback(solution)
                        });
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
// Definition Funktion, die die gewünschte Anzahl an zufälligen Tasks der Typen Tetris und Neue_Wörter aus DB filtert
/*function fetchRandomTasks(Tetris_count, NeueWörter_count, callback) {
  parseInt(Tetris_count, 10);
  parseInt(NeueWörter_count, 10);
  var tasks = [];

  // Array mit zufällig ausgewählten Tetris Tasks
  let randomiseTetris = function (Tetris_count) {
    //console.log(Tetris_count)
    return new Promise(function (resolve, reject) {
      //Finden aller ids von Tetris Tasks
      Task.find({ task_type: 'Tetris' }, { '_id': 1 })
        .then(ids => {
          // shuffle array, as per here  https://github.com/coolaj86/knuth-shuffle
          var arrTetris = shuffle(ids.slice(0));
          // get only the first numberOfItems of the shuffled array
          arrTetris.splice(Tetris_count, arrTetris.length - Tetris_count);
          // give result back
          resolve(arrTetris);
        })
    })
  }

  // Array mit zufällig ausgewählten Neue Wörter Tasts
  let randomiseNeueWörter = function (NeueWörter_count) {
    //console.log(NeueWörter_count)
    return new Promise(function (resolve, reject) {
      Task.find({ task_type: 'Neue_Wörter' }, { '_id': 1 })
        .then(ids => {
          // shuffle array, as per here  https://github.com/coolaj86/knuth-shuffle
          var arrNeueWörter = shuffle(ids.slice(0))
          // get only the first numberOfItems of the shuffled array
          arrNeueWörter.splice(NeueWörter_count, arrNeueWörter.length - NeueWörter_count);
          // give result back
          resolve(arrNeueWörter);
        })
    })
  }

  //Zusammenführen der beiden Arrays zu einem Array und callback
  randomiseTetris(Tetris_count).then(resolve => {
    tasks = resolve;
    return randomiseNeueWörter(NeueWörter_count).then(resolve => {
      tasks = tasks.concat(resolve);
      callback(tasks);
    })
  })
}*/

module.exports = studyRouter;
