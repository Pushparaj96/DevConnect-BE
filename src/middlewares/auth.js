const adminAuth = (req,res,next)=>{
    const token = "abc";
    const isAuthorized = (token === "abc");
    if(!isAuthorized){
        res.status(401).send("Un Authorized admin Request");
    }else{
        console.log("Authorized Admin!");
        next();
    }
};

const userAuth = (req,res,next)=>{
    const token = "xyz";
    const isAuthorized = (token === "xyz");
    if(!isAuthorized){
        res.status(401).send("UnAuthorized user Request ");
    }else{
        console.log("Authorized user!");
        next();  
    }
}


module.exports = {
    adminAuth,
    userAuth
}