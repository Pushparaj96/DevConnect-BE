const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");



const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:receiverId",userAuth, async (req,res)=>{
    try {
        const {_id,firstName} = req.user;
        const senderId = _id;
        const { receiverId , status } = req.params;
        const connections = new ConnectionRequest({
            senderId,
            receiverId,
            status
        })

        const data = await connections.save();

        res.json({message:`${firstName} sent Friend Request!`,data});
    } catch (error) {
        res.status(400).send("ERR-"+error.message);
    }
});



module.exports = requestRouter;