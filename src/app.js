const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");
const userRouter = require("./routes/userRouter");

const app = express();

// express.json() middleware reads JSON and convert it into js Object on every Route
app.use(express.json()) ; 
// reads cookies 
app.use(cookieParser());

// Routers 
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter)


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