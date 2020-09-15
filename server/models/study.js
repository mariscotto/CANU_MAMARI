var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GroupSchema = require('./group').GroupSchema;
var SolutionSchema = require('./solutionCanu').SolutionCanuSchema;

var StudySchema = new Schema ({
    study_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    open: {
        type: Boolean,
        default: true
    },
    study_link: {
        type: Array
    },
    groups: [GroupSchema],
    solutions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SolutionCanuAll'
    }],
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
    timestamps: true
    }
);

var Study = mongoose.model('Study', StudySchema, 'Studies');

module.exports = {
    Study,
    StudySchema
};
