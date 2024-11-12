const express = require("express");
const { userAuth } = require("../middlewares/auth");



const requestRouter = express.Router();

requestRouter.post("/connectionRequest",userAuth,(req,res)=>{
    try {
        const user = req.user;
        res.send(user.firstName + " " + "Sent Friend Request!")
    } catch (error) {
        res.status(400).send("ERR-"+error.message);
    }
});



module.exports = requestRouter;