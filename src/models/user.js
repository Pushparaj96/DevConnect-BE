const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        minLength:2,
        maxLength:50,
        required:true
    },
    lastName:{
        type:String,
        minLength:1,
        maxLength:50
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        maxLength:40,
        validate(value){
            const emailRegEx = /^[a-zA-Z0-9.-]+@[a-zA-Z-.]+\.[a-zA-Z]{2,4}$/;
            if(!emailRegEx.test(value)){
                throw new Error ("Invalid Email id");
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
        max:80
    },
    gender:{
        type:String,
        lowercase:true,
        maxLength:10,
        enum:{
            values:["male","female","others"],
            message:`{VALUE} is invalid`
        }
        // validate(value){
        //     const allowedGender = ["male","female","others"];
        //     if(!allowedGender.includes(value)){
        //         throw new Error ("Please Enter valid Gender");
        //     }
        // }
    },
    bio:{
        type:String,
        maxLength:255,
        default:"Enter your Personal Details!"
    },
    photoUrl:{
        type:String,
        maxLength:255,
        default:"https://media.istockphoto.com/id/1399249601/vector/black-line-icon-man-default-profile-avatar-businessman-silhouette-male-mark-trendy-flat.jpg?s=612x612&w=0&k=20&c=ExYCFwu1Qe7vE915rX6VNiONRPo5Qo99fJULa8A1egc=",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error ("invalid URL");
            }
        }
    },
    skills:{
        type:[String],
        validate(value){
            if(value.length > 25){
                throw new Error ("enter valid skills , can't be more than 25 skills");
            }
        }
    }
},{timestamps:true});

userSchema.methods.createJwtToken = function (){
    const user = this;
    const token = jwt.sign({_id:user._id},"DevConnect#69",{expiresIn:"4d"});

    return token;
}

userSchema.methods.comparePassword = async function (loginPassword){
    const user = this;
    const {password:hashedDbPassword} = user;
    const isValidPassword = await bcrypt.compare(loginPassword,hashedDbPassword);
    return isValidPassword;
}

const User = mongoose.model("User",userSchema);

module.exports = User ;