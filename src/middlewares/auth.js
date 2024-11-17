const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next)=>{
   try {
    const { token } = req.cookies;

    if(!token){
        return res.status(401).send("Invalid Token - Please Login");
    }

    const decoded = jwt.verify(token,"DevConnect#69");
    const { _id } = decoded;

    const user = await User.findById(_id);

    if(!user){
        throw new Error ("Invalid credentials !");
    }

    // attaching verified user into req..
    req.user = user;
    // next() moves to next Route Handler...
    next();

   } catch (error) {
        res.status(400).send("ERR :-"+error.message);
   }
    
}

module.exports = {
    userAuth
}