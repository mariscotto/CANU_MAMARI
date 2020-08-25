// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user');
// //const config = require('../config/database');
// const bcrypt = require('bcryptjs');

// module.exports = function(passport){
//   // Local Strategy
//   passport.use(new LocalStrategy(function(username, password, done){
//     // Match Username
//     let query = {username:username};
//     User.findOne(query, function(err, user){
//       if(err) throw err;
//       if(!user){
//         return done(null, false, {message: 'No user found'});
//       }

//       // Match Password
//       if (password == user.password) {
//           (err, isMatch) => {
//             if(err) throw err;
//             if(isMatch){
//                 return done(null, user);
//                 } else {
//                 return done(null, false, {message: 'Wrong password'});
//                 }
//             }
//          };
//     });
//   }));

//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });

//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });
// }


const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

// const User = mongoose.model("Users");
var User = require('../models/user');

const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};