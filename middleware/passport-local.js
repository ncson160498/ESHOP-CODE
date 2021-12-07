var bcrypt = require("bcryptjs")
var LocalStrategy = require("passport-local").Strategy
var userModel = require("../models/user")

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        console.log("bat dau loggin")
        userModel.getUserByEmail(email).then(rows => {
            if (rows == null) {
                return done(null, false, { message: 'Invalied Email' })
            }
            var user = rows[0];
            var ret = bcrypt.compareSync(password, user.password)
            if (ret) {
                console.log("password dung")
                return done(null, user)
            }
            else {
                console.log("Sai password")
                return done(null, false, { message: 'Invalid password' });
            }


        }).catch(err => {
            return done(err, false);
        })
    })
    )

    passport.serializeUser((user, done) => {
        console.log("serializeUser")
        return done(null, user)
    })
    passport.deserializeUser((user, done) => {
        //console.log("deserializeUser")
        return done(null, user);
    })
}