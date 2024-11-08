const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");



const app = express();

app.post("/signup", async (req,res)=>{

    const user = new User({ // instance of User model
        firstName:"John",
        lastName:"Joe",
        emailId:"john@gmail.com",
        password:"john@123",
        age:24,
        gender:"Male"
    });

    try{
        await user.save(); // saving document into DB
        res.send("Signup Successful");
    }catch(err){
        res.status(400).send("Failed to Signup");
    }
})


connectDB()
.then(()=>{
    console.log("DB Connected Successfully...");
    app.listen(6969,()=>{
        console.log("Server Started Listening @ port:6969");
        
    })
})
.catch((err)=>{
    console.log(err.message);  
})