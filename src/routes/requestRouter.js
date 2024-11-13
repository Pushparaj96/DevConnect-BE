const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");



const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId",userAuth, async (req,res)=>{
    try {
        const user = req.user;
        const senderId = user._id;
        const receiverId = req.params.userId;
        const status = req.params.status;
        const connections = new ConnectionRequest({
            senderId,
            receiverId,
            status
        })

        const data = await connections.save();

        res.json({message:`${user.firstName} sent Friend Request!`,data});
    } catch (error) {
        res.status(400).send("ERR-"+error.message);
    }
});



module.exports = requestRouter;