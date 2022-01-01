var bcrypt = require("bcryptjs")
var LocalStrategy = require("passport-local").Strategy
var userModel = require("../models/user")

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        userModel.getUserByEmail(email).then(rows => {
            if (rows == null) {
                return done(null, false, { message: 'Invalied Email' })
            }
            var user = rows[0];
            var ret = bcrypt.compareSync(password, user.password)
            if(!user.verify){
                return done(null, false, { message: 'Not Verified Email' });
            }
            if (ret) {
                return done(null, user)
            }
            else {
                return done(null, false, { message: 'Invalid password' });
            }
        }).catch(err => {
            return done(err, false);
        })
    })
    )

    passport.serializeUser((user, done) => {
        return done(null, user)
    })
    passport.deserializeUser((user, done) => {
        return done(null, user);
    })
}