const crypto = require("crypto")
function keyss(){
    return new Promise((resolve, reject)=>{
        const salt = crypto.randomBytes(32).toString("hex")
        const hash = crypto.pbkdf2Sync(salt, 10000, 64, "sha512").toString("hex")

        if (salt && hash) {
            return resolve({hash, salt})
        } else {
            return reject("fail to generate")
        }
    })
}

keyss()
    .then((result)=>{
        return result;
    })
    .then((data)=>{
        const gen = crypto.pbkdf2Sync("123", data.salt, 10000, 64, "sha512").toString("hex")
        console.log(gen === data.hash)
    })
    .catch(err => console.log("12", err))