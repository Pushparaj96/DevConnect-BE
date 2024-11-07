const express = require("express");

const app = express();

app.get("/user",(req,res,next)=>{
    console.log("1st route Handler!");
    next();
    //res.send("Response from 1st route handler");
    
},(req,res,next)=>{
    console.log("2nd route Handler!");
    //res.send("Response from 2nd Route handler");
    next();
},
[
(req,res,next)=>
    {
    console.log("3rd route Handler!");
    next();
},(req,res,next)=>
    {
    console.log("4th route Handler");
    res.send("Response from 4th route handler") ;
}]
)

app.listen(3000,()=>{
    console.log("Server started at port 3000");
})