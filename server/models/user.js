var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');
var StudySchema = require('./study').StudySchema;

var UserSchema = new Schema({
    admin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    studies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Study'
    }]
});

// UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', UserSchema, 'Users');

// module.exports = mongoose.model('User', UserSchema, 'Users');