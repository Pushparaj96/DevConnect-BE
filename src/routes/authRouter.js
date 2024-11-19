const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignup } = require("../utils/validate");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");


const authRouter = express.Router();

authRouter.post("/signup", async (req,res)=>{
    
    try{

        // validate data from req
        validateSignup(req);
        const { firstName,lastName,emailId,password } = req.body;

        // Hashing the Password 
        const hashedPassword = await bcrypt.hash(password,10);

        // instance of User model
      const user = new User({
        firstName:firstName,
        lastName:lastName,
        emailId:emailId,
        password:hashedPassword
      });

         // saving document into DB
        const signedUpUser =  await user.save(); 
        const token = await signedUpUser.createJwtToken();
        res.cookie("token",token,{expires:new Date(Date.now() + (4 * 86400 * 100))});
        res.json({message:"Signup Successfull!",data:signedUpUser});
    }catch(err){
        res.status(400).send("ERR - "+ err.message);
    }
});

authRouter.post("/login",async (req,res)=>{
    const {emailId,password} = req.body;

    try {

        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials!");
        }
        // validating password using Schema methods
        const isValidPassword = await user.comparePassword(password);

        if(!isValidPassword){
            throw new Error("Invalid Credentials!");
        }
        // signing jwt token using Schema methods
        const token = await user.createJwtToken();

        res.cookie("token",token,{expires:new Date(Date.now() + (4 * 86400 * 1000))});
        res.json({message:`login Success`,data:user});
        
    } catch (error) {
        res.status(400).send("ERR-"+error.message);
    }
});

authRouter.post("/logout",userAuth,(req,res)=>{
    try {
        const user = req.user;
        res.cookie("token",null,{expires:new Date(Date.now())})
        .send(`${user.firstName} Logged out Successfully!`);
        
    } catch (error) {
        res.status(400).send("ERR - "+error.message);
    }
})

module.exports = authRouter;