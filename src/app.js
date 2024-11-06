const express = require("express");

const app = express();

app.use("/test",(req,res)=>{
    res.send("welcome PK!")
})

app.use("/",(req,res)=>{
    res.send("Pushparaj");
})

app.listen(3000,()=>{
    console.log("Server started at port 3000");
})