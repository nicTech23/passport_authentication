const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const connection = require("./dbConnect")
const { validPassword } = require("../lib/passwordUtils")
const User = require("../model/user")

//passport verification function that verify the user
const verifyCallback = (username, password, done) =>{
     User.findOne({ username: username })
        .then((user)=>{
            if (!user) {
                return done(null, false)
            }

            const isValid = validPassword(password, user.hash, user.salt)

            if (isValid) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch(err =>{
            done(err)
        })
}

// passport require username and passwrd if you dont what to use this names as 
// Fieldname u can customise it
const customFields = {
    usernameField: "username",
    passwordField: "password"
}

// passport-local strategy
const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)

// getting the user_id when login to attached it to session
passport.serializeUser((user, done)=>{
    done(null, user._id)
})


// finding the user with the user id and attached user properties to req.user
passport.deserializeUser((userId, done)=>{
    User.findById(userId)
        .then((user)=>{
            done(null, user)
        })
        .catch(err => done(err))
})