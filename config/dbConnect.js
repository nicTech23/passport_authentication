const mongoose = require("mongoose")

require("dotenv").config()

const conn = process.env.DB_String;

const connection = async()=>{
    mongoose.connect(conn)
    .then(res =>{
        console.log("db connected")
    })
    .catch(err => console.log(err.message))
}



module.exports = connection;

