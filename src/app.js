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
        res.status(401).send("Something went Wrong"+err.message);
    }
});

app.delete("/remove",async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.body.userId);
        res.send("Account Deleted")
    } catch (error) {
        res.status(400).send("Something Went Wrong"+error.message);
    }
});

app.patch("/update",async(req,res)=>{
    try {
        const updated =  await User.findByIdAndUpdate(req.body.userId,req.body,{returnDocument:"after",runValidators:true});
        console.log(updated);
        
        res.send("Document updated!")
        
    } catch (error) {
        res.status(400).send("Something Went Wrong! - " + error.message);
    }
})

app.patch("/updateByEmail", async (req,res)=>{
    try {
        const updated = await User.findOneAndUpdate({emailId:req.body.emailId},req.body,{returnDocument:"after",runValidators:true});
        console.log(updated);
        res.send("document updated with emailId")
    } catch (error) {
        res.status(401).send("Something Went Wrong"+error.message);
    }
})

app.get("/byId", async (req,res)=>{

    try {
        const user = await User.findById(req.body._id);
            res.send(user);
        
    } catch (error) {
        res.status(401).send("Something Went Wrong"+error.message);
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
            res.status(400).send("something went Wrong"+error.message);
    }
})

app.post("/signup", async (req,res)=>{

    // instance of User model
    const user = new User(req.body);

    try{
        await user.save(); // saving document into DB
        res.send("Signup Successful");
    }catch(err){
        res.status(400).send("Failed to Signup - "+ err.message);
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