var express = require('express');
var bodyParser = require('body-parser');

var Questionnaire = require('../models/Questionnaire').Questionnaire;

var QuestionnaireRouter = express.Router();

QuestionnaireRouter.use(bodyParser.json());


QuestionnaireRouter.route('/:studyId')
    .get((req, res, next) => {
    })
    .post((req, res, next) => {
        Questionnaire.create({
            VP_id: req.sessionID,
            email: req.body.email,
            age: req.body.age,
            gender: req.body.gender,
            creative_test: req.body.creative_test,
            creative_skills: req.body.creative_skills,
            education_grade: req.body.education_grade,
            job_area: req.body.job_area,
            personality_adjectives: req.body.personality_adjectives
        })
            .then(object => {
                console.log(object);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(object);
            }, err => next(err))
            .catch(err => next(err));
    })

module.exports = QuestionnaireRouter;
