const { Router } = require("express")
const passport = require("passport")
const passwordUtils = require("../lib/passwordUtils")
const connection = require("../config/dbConnect")
const User = require("../model/user")
const { isAth, isAdmin } = require("./middleware")




const route = Router()

route.post("/login", passport.authenticate("local", {failureMessage:"fail", successMessage:"success"}))

route.post("/register", (req, res, next) => { 
    
    const saltHash = passwordUtils.genPassword(req.body.password)

    const salt = saltHash.salt
    const hash = saltHash.hash

    const newUser = new User({
        username: req.body.username,
        salt,
        hash,
        admin: true
    })
    
    newUser.save()
        .then((user)=>{
            return res.json({user})
        })
        .catch(err => res.json({error: err}))
})

route.get("/logout",  (req, res)=>{
     req.logout((err)=>{
        if(err) res.send(err.message)
        res.json({msg: "logout"})
     })
    console.log("logout")
    
})

route.get("/properties", isAth, (req,res)=>{
    res.json({msg: "You have acess to the properties"})
})

route.get("/admin", isAdmin, (req, res)=>{
     res.json({msg: "You have admin right"})
})

module.exports = route
 
