var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
//var VPSchema = require('./study').VPSchema;

var Post_QuestionnaireCanuSchema = new Schema({
  VP_id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: "noEmail"
  },
  age: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  creative_test: {
    type: String,
    required: true
  },
  creative_skills: {
    type: String,
    required: true
  },
  education_grade: {
    type: String,
    required: true
  },
  job_area: {
    type: String,
    required: true
  },
  personality_adjectives: {
    type: Array,
    required: true
  }
});

module.exports = Post_Questionnaire_Canu = mongoose.model(
  "Post_Questionnaire_Canu",
  Post_QuestionnaireCanuSchema,
  "Post_Questionnaires"
);
