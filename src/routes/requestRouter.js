const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");



const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:receiverId",userAuth, async (req,res)=>{
    try {
        const {_id,firstName} = req.user;
        const senderId = _id;
        const { receiverId , status } = req.params;
        const allowedStatus = ["interested","ignored"];

        if(!allowedStatus.includes(status)){
            throw new Error ("Invalid Status Request!");
        }

        const receiverUser = await User.findById(receiverId);

        if(!receiverUser){
            return res.status(404).json({message:`User Not Found - can't Send Request!`})
        }

        const isExistingRequest = await ConnectionRequest.findOne({$or:[{senderId,receiverId,status:"interested"},{senderId:receiverId,receiverId:senderId,status:"interested"}]});

        if(isExistingRequest){
            return res.status(400).json({message:`This Request is Already There ! check Your pending Requests...`});
        }

        const connections = new ConnectionRequest({
            senderId,
            receiverId,
            status
        })

        const data = await connections.save();

        const responseMsg = (status === "ignored")?"Ignored":"Sent Friend Request to";
        res.json({message:`${firstName} ${responseMsg} ${receiverUser.firstName}`,data});
    } catch (error) {
        res.status(400).send("ERR-"+error.message);
    }
});



module.exports = requestRouter;