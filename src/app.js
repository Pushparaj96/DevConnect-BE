const express = require("express");

const app = express();

app.use("/admin",(req,res,next)=>{
    const token = "abc";
    const isAuthorized = (token === "abc");
    if(!isAuthorized){
        res.status(401).send("Unauthorized Request");
    }else{
        console.log("Authorized Admin!");
        next();
    }
});

app.post("/user/login",(req,res)=>{
    res.send("No auth needed");
})

app.use("/user",(req,res,next)=>{
    const token = "xyz";
    const isAuthorized = (token === "xyz");
    if(!isAuthorized){
        res.status(401).send("Unauthorized request by You !");
    }else{
        console.log("Authorized user !");
        next();
    }
})



app.get("/user/dashboard",(req,res)=>{
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