const mongoose = require('mongoose');
const validator = require('validator');

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
        validate(value){
            const allowedGender = ["male","female","others"];
            if(!allowedGender.includes(value)){
                throw new Error ("Please Enter valid Gender");
            }
        }
    },
    bio:{
        type:String,
        maxLength:255,
        default:"Enter your Personal Details!"
    },
    photoUrl:{
        type:String,
        maxLength:255,
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

const User = mongoose.model("User",userSchema);

module.exports = User ;