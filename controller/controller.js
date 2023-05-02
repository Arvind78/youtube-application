const mongoose = require("mongoose")
const usermodel = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const error = require("../error")
 
// signup controller function 
const signup = async (req, res, next) => {
        console.log("backend",req.body)
    try {
        const checkUser = await usermodel.findOne({ email: req.body.email });
        if (checkUser) return next(error(403, "user already exists!"));
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = await usermodel.create({ ...req.body, password: hash });
        const token = jwt.sign({newUser:user._id},process.env.ScrateKey);
       res.status(200).json({token,massage:"user has been created!"});
    } catch (err) {
        next(err)
    }

}

// signin controller function 
const signin = async (req, res, next) => {
  console.log(req.body)
    try {
    const user = await usermodel.findOne({email:req.body.email});
    if(!user) return next(error(404,"user not found!"));
    const passwordCheck = await bcrypt.compare(req.body.password,user.password);
    if(!passwordCheck) return next(error(401,"email or password not exist!"));
    const token = jwt.sign({id:user._id},process.env.ScrateKey);
    const {password,...others} = user._doc
    res.cookie("access_token",token,{
        httpsOnly:true
    }).status(200).json(others);
   
    } catch (err) {
        next(err)
    }
}



const googleauth =async(req,res,next)=>{
   try {
     const user = await usermodel.findOne({email:req.body.email})
     if(user){
    const token = jwt.sign({id:user._id},process.env.ScrateKey);
      res.cookie("access_token",token,{
        httpsOnly:true
      }).status(200).json(user._doc);


     }else{
       const newUser = await usermodel.create({
            ...req.body,fromGoogle:true
        })
        console.log(newUser)
        const token = jwt.sign({id:newUser._id},process.env.ScrateKey);
        res.cookie("access_token",token,{
          httpsOnly:true
        }).status(200).json(newUser._doc);
       
     }

   } catch (err) {
      next(err)
   }
}



module.exports = {
    signup,signin,googleauth
}



















