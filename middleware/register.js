const {validateEmail,validatePassword}= require('../utils/validations');
// LEVEL 1
// email validate - .com ,.co
// pwd validation 
// passwor==con pwd

const registerInitialChecks=(req,res,next)=>{
    console.log("IN Register Checks");
    const{email,password}=req.body;
    console.log(email,password);
    if(
    email.length>0 &&
    password.length>=8 &&
    validateEmail(email) &&
    validatePassword(password)
    ){
        next();
    }
    else{
        res.status(401).send("INITAIAL CHECKS FAILED");
    }
};
module.exports = registerInitialChecks;