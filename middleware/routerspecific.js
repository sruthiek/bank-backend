//router specific middleware
//import jsonwebtoken
const jwt = require('jsonwebtoken')
//define logic for checking user is loged in or not
const logMiddleware = (req, res, next) => {
    console.log("router specific middleware");
    //get token
    const token = req.headers['access-token']

    try {
        
        //verify token
        const {loginAcno} = jwt.verify(token, "supersecretkey12345")
        console.log(loginAcno);
        //pass loginacno to req
        req.debitAcno=loginAcno
        
        //to process user  request
        next()
    }

    catch {
        res.status(401).json("please login")
    }
}

module.exports = {
    logMiddleware

}