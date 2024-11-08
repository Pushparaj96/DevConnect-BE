const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json()) ; // express.json() middleware reads JSON and convert it into js Object on every Route

app.get("/feed", async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(401).send("Something went Wrong");
    }
});

app.get("/byId", async (req,res)=>{

    try {
        const user = await User.findById(req.body._id);
            res.send(user);
        
    } catch (error) {
        res.status(401).send("Something Went Wrong");
    }
        
})

app.get("/user", async(req,res)=>{
    try {
        const users = await User.find({emailId:req.body.emailId});
        if(!users.length){
            res.status(404).send("User not Found");
        }else{
            res.send(users);
        }    
    } catch (error) {
            res.status(400).send("something went Wrong");
    }
})

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