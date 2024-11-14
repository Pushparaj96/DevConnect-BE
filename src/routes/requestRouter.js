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

        const isExistingRequest = await ConnectionRequest.findOne({$or:[{senderId,receiverId,status:"interested"},{senderId,receiverId,status:"ignored"},{senderId:receiverId,receiverId:senderId,status:"interested"},{senderId,receiverId,status:"accepted"},{senderId:receiverId,receiverId:senderId,status:"accepted"}]});

        if(isExistingRequest){
            return res.status(400).json({message:`Can't send Request , check Your pending Requests or Connections...`});
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

requestRouter.post("/request/review/:status/:connectionId",userAuth,async(req,res)=>{
    try {
        const { status , connectionId } = req.params;
        const allowedStatus = ["accepted","rejected"];
        const loggedInUser = req.user;

        if(!allowedStatus.includes(status)){
            throw new Error ("Invalid Request Status!");
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id:connectionId,
            receiverId:loggedInUser._id,
            status:"interested"
        });

        if(!connectionRequest){
            throw new Error ("Sorry , Request Not Found !");
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        const { senderId } = data;
        const senderObj = await User.findById(senderId);
        const { firstName:senderName } = senderObj;

        res.json({message:`${loggedInUser.firstName} ${status} ${senderName} request!`,data});
    } catch (error) {
        res.status(400).send("Err - "+ error.message);
    }
})



module.exports = requestRouter;