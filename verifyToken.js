const jwt = require("jsonwebtoken")
const error =require("./error");
const verifyToken= (req,res,next)=>{
const getToken = req.cookies.access_token;
//  console.log(getToken)
if(!getToken) return next(error(401,"user not authenticated!"));
jwt.verify(getToken,process.env.ScrateKey,(err,user)=>{
    if(err) return next(error(403,"token not valid!"));
    res.user=user
    next()
})
}
module.exports= verifyToken





