const express = require("express");
const connectDB = require("./config/database");



const app = express();


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