const validator = require("validator");

const validateSignup = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error ("Please Fill the Fields !!!");
    }else if(!validator.isEmail(emailId)){
        throw new Error ("Enter Valid Email!");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Enter Strong Password");
    }
}

const validateProfileEditData = (req)=>{

    const allowedEditFields = ["firstName","lastName","age","gender","bio","photoUrl","skills"];
    const isValidEditRequest = Object.keys(req.body).every(field=>allowedEditFields.includes(field));
 
    return isValidEditRequest;
}

const validateChangePassword = (req) =>{

    const allowedFields = ["password","confirmPassword"];
    const isValidRequest = Object.keys(req.body).every(field=>allowedFields.includes(field));

    if(!isValidRequest){
        throw new Error ("Invalid Request!");
    }

    const { password , confirmPassword } = req.body;

    if( !validator.isStrongPassword(password)){
        throw new Error ("Please Enter Strong Password");
    }

    if( password !== confirmPassword ){
        throw new Error ("Passwords Should Match!");
    }

    return true;

}

module.exports = {
    validateSignup,
    validateProfileEditData,
    validateChangePassword
}