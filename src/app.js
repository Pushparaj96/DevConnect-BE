const express = require("express");

const app = express();


app.get("/user",(req,res,next)=>{
    throw new Error ("can't get User route");
})

app.get("/admin",(req,res)=>{
    throw new Error ("can't get Admin Route");
})

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send(err.message);
    }
})

app.listen(6969,()=>{
    console.log("DB Connected on Port : 6969");
})