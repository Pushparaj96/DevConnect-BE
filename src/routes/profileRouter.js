const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData , validateChangePassword } = require("../utils/validate");
const bcrypt = require("bcrypt");



const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth , async(req,res)=>{
    try {
        const user = req.user;
        res.send(user);
        
    } catch (error) {
        res.status(400).send("ERR -"+error.message);
    }
});

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try {
        // validate - only allowed to edit certain fields
        const isValidEditRequest = validateProfileEditData(req);
        if(!isValidEditRequest){
            throw new Error ("Invalid Edit Request !")
        }

        const user = req.user;
        const requestedEditFields = Object.keys(req.body);
        requestedEditFields.map(field=>(
            user[field] = req.body[field]
        ));

        await user.save();

        res.json({message:`${user.firstName} , your profile updated Successfully`,data:user});

    } catch (error) {
        res.status(400).send("ERR - "+error.message);
    }
});

profileRouter.patch("/profile/forgot",userAuth,async(req,res)=>{
    try {
        const user = req.user;
        const isvalidRequest = validateChangePassword(req);
        if(isvalidRequest){
            const {confirmPassword:changedPassword} = req.body;
            const changedPasswordHash = await bcrypt.hash(changedPassword,10);
            user.password = changedPasswordHash;
            await user.save();
            res.json({message:`${user.firstName} , your password changed Successfully!`,data:user})
        }
    } catch (error) {
        res.status(400).send("ERR - " + error.message);
    }
})


module.exports = profileRouter;