const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequests = require("../models/connectionRequest");


const userRouter = express.Router();
const SAFE_TO_GET_USER_DATA = "firstName lastName age gender bio photoUrl skills";

userRouter.get("/user/requests/received",userAuth, async (req,res)=>{
    try {
        const loggendInUser = req.user;
        const receivedRequests = await ConnectionRequests.find({receiverId:loggendInUser._id,status:"interested"}).populate("senderId",SAFE_TO_GET_USER_DATA);
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
        }).populate("senderId",SAFE_TO_GET_USER_DATA).populate("receiverId",SAFE_TO_GET_USER_DATA); // populating data using ref to another collection

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
})

module.exports = userRouter;