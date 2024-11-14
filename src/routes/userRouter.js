const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequests = require("../models/connectionRequest");
const User = require("../models/user");


const userRouter = express.Router();
const SAFE_TO_SHOW_USER_DATA = "firstName lastName age gender bio photoUrl skills";

userRouter.get("/user/requests/received",userAuth, async (req,res)=>{
    try {
        const loggendInUser = req.user;
        const receivedRequests = await ConnectionRequests.find(
            {receiverId:loggendInUser._id,status:"interested"}).populate("senderId",SAFE_TO_SHOW_USER_DATA);
        res.json({message:`${loggendInUser.firstName} , People Intrested in You!`,data:receivedRequests});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});

userRouter.get("/user/connections",userAuth, async (req,res)=>{
    try {
        const loggendInUser = req.user;
        const connectedPeople = await ConnectionRequests.find({$or:
            [{senderId:loggendInUser._id,status:"accepted"},{receiverId:loggendInUser._id,status:"accepted"}]
        }).populate("senderId",SAFE_TO_SHOW_USER_DATA).populate("receiverId",SAFE_TO_SHOW_USER_DATA); // populating data using ref to another collection

        const connectedPeopleInfo = connectedPeople.map(people=>{
            if(people?.senderId?._id.toString() === loggendInUser._id.toString()){
                return people?.receiverId;
            }else{
                return people?.senderId;
            }
        })

        res.json({message:`${loggendInUser.firstName} , People connected with you!`,data:connectedPeopleInfo});
    } catch (error) {
        res.status(400).json({messgae:error.message})
    }
});

userRouter.get("/user/feed",userAuth,async (req,res)=>{
    try {
        const loggendInUser = req.user;
        const oldConnections = await ConnectionRequests.find(
            {$or:[{senderId:loggendInUser._id},{receiverId:loggendInUser._id}]}).select("senderId receiverId");

        const alreadyConnectedUsers = new Set();

        oldConnections.map(connection=>{
            const { senderId , receiverId } = connection;
            alreadyConnectedUsers.add(senderId.toString());
            alreadyConnectedUsers.add(receiverId.toString());
        })

        const hideFromFeed = Array.from(alreadyConnectedUsers);

        const showInFeed = await User.find({$and:[{_id:{$nin:hideFromFeed}},{_id:{$ne:loggendInUser._id}}]}).select(SAFE_TO_SHOW_USER_DATA);

        res.json({message:`${loggendInUser.firstName} - Feed`,data:showInFeed});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});

module.exports = userRouter;