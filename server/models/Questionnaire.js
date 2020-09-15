var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
//var VPSchema = require('./study').VPSchema;

var QuestionnaireSchema = new Schema({
  VP_id: {
    type: String
  },
  age: {
    type: String
  },
  gender: {
    type: String
  },
  creative_test: {
    type: String
  },
  creative_skills: {
    type: String
  },
  education_grade: {
    type: String
  },
  job_area: {
    type: String
  },
  personality_adjectives: {
    type: Array
  }
});

//var Questionnaire = mongoose.model('Questionnaire', Questionnaire, 'Questionnaires');

//module.exports = Questionnaire;
var Questionnaire = mongoose.model('Questionnaire', QuestionnaireSchema, 'Questionnaires');

module.exports = {Questionnaire, QuestionnaireSchema}
