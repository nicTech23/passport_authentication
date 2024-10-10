const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport")
const crypto = require("crypto")
const route = require("./routes/index")
const MongoStore = require("connect-mongo");
const connection = require("./config/dbConnect");

const app = express();

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// creating session 
app.use(session({
    secret: process.env.secret,
    resave: false,
    // using mongo to store sessions
    store: MongoStore.create({
        mongoUrl: process.env.DB_String,
        autoRemove: "interval", 
        collectionName: "sessionSamo"
    }),
    saveUninitialized: true,
    cookie:{
        maxAge: 60 * 60 * 1000 * 24,
    }
}))


/***passport js configuration */

//import all the passport requirements created
require("./config/passport")

app.use(passport.initialize())
app.use(passport.session())

//middileware to show req function 
app.use((req, res, next)=>{
    console.log(req.session)
    console.log(req.user)
    
    next();
})

/**Route */
app.use(route)

// counting the number of times user has visited the site with sessiona
app.get("/", (req, res, _next) =>
{
    if (req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1
    } else {
        req.session.viewCount = 1
    }

    console.log(req.session.viewCount)
    res.send("<h1>Hello word</h1>")
})


app.listen(3000, ()=>{
    connection()
    console.log("working")
}) 