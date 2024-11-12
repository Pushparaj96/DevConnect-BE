const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validate");



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
})


module.exports = profileRouter;