var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SolutionCanuSchema = new Schema({
    solution: {
        type: Array,
        required: true
    },
    novelty_score: {
        type: Number,
        default: 0
    },
    usefulness_score: {
        type: Number,
        default: 0
    },
    counter: {
        type: Number,
        default: 0
    }
});

var SolutionCanu = mongoose.model('SolutionCanu', SolutionCanuSchema, 'Solutions');

var SolutionCanuAllSchema = new Schema({
        solution: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SolutionCanu'
        },
        VP_id: {
            type: String
        },
        study: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Study'
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        },
        group_name: {
            type: String
        }
    },
    {
        timestamps: true
    }
);


var SolutionCanuAll = mongoose.model('SolutionCanuAll', SolutionCanuAllSchema, 'All Solutions');

module.exports = {
    SolutionCanu,
    SolutionCanuSchema,
    SolutionCanuAll,
    SolutionCanuAllSchema
}

