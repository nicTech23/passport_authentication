module.exports.isAth = (req, res, next)=>{
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({msg: "You dont have access"})
    }
}

module.exports.isAdmin = (req, res, next)=>{
    if (req.isAuthenticated() && req.user.admin) {
        next()
    } else {
        res.status(401).json({msg: "You are not an admin"})
    }
}