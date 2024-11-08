const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json()) ; // express.json() middleware reads JSON and convert it into js Object on every Route

app.post("/signup", async (req,res)=>{

    // instance of User model
    const user = new User(req.body);

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