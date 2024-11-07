const express = require("express");

const app = express();

const { adminAuth,userAuth} = require("./middlewares/auth");

app.post("/user/login",(req,res)=>{
    res.send("No auth needed");
})


app.use("/admin",adminAuth);


app.get("/user/dashboard",userAuth,(req,res)=>{
    res.send("Fetched Dashboard Successfully");
})

app.get("/admin/allusers",(req,res)=>{
    res.send("Fetched all user details");
});

app.get("/admin/panel",(req,res)=>{
    res.send("Fetched admin panel");
})

app.listen(3000,()=>{
    console.log("Server started at port 3000");
})