const mongoose = require('mongoose');

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
        minLength:8,
        maxLength:15,
        required:true,
        trim:true,
        validate(value){
            const passwordRegEx = /^(?!.*\s)(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d\W]{8,15}$/ ;
            if(!passwordRegEx.test(value)){
                throw new Error("Weak Password - must include one [upper & lower & digit & special chars]");
            }
        }
    },
    age:{
        type:Number,
        min:18,
        max:80
    },
    gender:{
        type:String
    },
    bio:{
        type:String,
        maxLength:255,
        default:"Enter your Personal Details!"
    },
    photoUrl:{
        type:String,
        maxLength:255,
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema);

module.exports = User ;