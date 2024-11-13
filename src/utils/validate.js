const validator = require("validator");
const bcrypt = require("bcrypt");

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

const validateChangePassword = async (req,user) =>{

    const { password:dbPassword } = user;
    const { oldPassword , newPassword , confirmPassword } = req.body;

    // validating the requested fields ...

    const allowedFields = ["oldPassword","newPassword","confirmPassword"];
    const isValidRequest = Object.keys(req.body).every(field=>allowedFields.includes(field));
    
    if(!isValidRequest){
        throw new Error ("Invalid Request!");
    }

    // comparing old password with db password
    const isOldPasswordValid = await bcrypt.compare(oldPassword,dbPassword);

    if(!isOldPasswordValid){
        throw new Error ("Incorrect Old Password !");
    }else if( !validator.isStrongPassword(newPassword)){
        throw new Error ("Please Enter Strong Password");
    }else if( newPassword !== confirmPassword ){
        throw new Error ("Passwords Should Match!");
    }

    const updatedPasswordHash = await bcrypt.hash(confirmPassword,10);
    return updatedPasswordHash;

}

module.exports = {
    validateSignup,
    validateProfileEditData,
    validateChangePassword
}