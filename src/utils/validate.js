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

module.exports = {
    validateSignup,
    validateProfileEditData
}