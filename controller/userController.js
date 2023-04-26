const error = require("../error")
const mongoose = require('mongoose')
const userModel = require('../model/userModel')
const bcrypt = require("bcrypt")
const vedioModel = require("../model/vedioModel")
// update user routes controller
const update =async(req,res,next)=>{
     console.log(res.user.id)
     if(req.params.id==res.user.id){
       try {
      const updatUser = await userModel.findByIdAndUpdate(`${req.params.id}`
      ,{$set:req.body}
      ,{new:true})
      res.status(200).json(updatUser)

     } catch (err) {
        next(err)
     }
  }
  else{
         return next(error(403,"You can only update your account!"));
  }
}

// delete user routes controller
const deleteUser =async(req,res,next)=>{
   if(req.params.id==res.user.id){
      try {
        await userModel.findByIdAndDelete(`${req.params.id}`)
        res.status(200).json("user has been deleted!")
       } catch (err) {
         next(err)
      }
   }
   else{
          return next(error(403,"You can only delete your account!"));
   }
}

// get user routes controller
const getUser =async(req,res,next)=>{
   // if(req.params.id==res.user.id){

      try {
   const user = await userModel.findById(`${req.params.id}`)
        res.status(200).json(user)
       } catch (err) {
         next(err)
      }
   // }
   // else{
   //        return next(error(403,"You can not valid user!"));
   // }
}


//subcribe channel routes controller
const subscribe =async(req,res,next)=>{
   console.log(res.user.id)
  try {
   await userModel.findByIdAndUpdate(`${res.user.id}`,{
   $push:{subscribeuser:req.params.id}
   })
    await userModel.findByIdAndUpdate(`${req.params.id}`,{
      $inc:{subcribers:1}
    })
    res.status(200).json("subscription sucessfull")
  } catch (err) {
       next(err)
  }
}

// unsunscribe channel routes controller
const unsubscribe =async(req,res,next)=>{
   try {
      await userModel.findByIdAndUpdate(`${res.user.id}`,{
      $pull:{subscribeuser:req.params.id}
      })
       await userModel.findByIdAndUpdate(`${req.params.id}`,{
         $inc:{subcribers:-1}
       })
       res.status(200).json("Unsubscription sucessfull")
     } catch (err) {
          next(err)
     }
}

// like vedio  routes controller
const like =async(req,res,next)=>{
   const id = res.user.id;
   const videoId =req.params.videoId
   console.log(id,videoId)
   try {
   let likes =   await vedioModel.findByIdAndUpdate(videoId,{
         $addToSet:{like:id},
         $pull:{dislike:id}
      })
      console.log(likes)
      res.status(200).json("The vedio has been liked")
   } catch (err) {
      next(err)
   }

}

// unlike vedio routes controller
const unlike =async(req,res,next)=>{
   const id = res.user.id;
   const videoId =req.params.videoId
   try {
      await vedioModel.findByIdAndUpdate(videoId,{
         $addToSet:{dislike:id},
         $pull:{like:id}
      })
      res.status(200).json("The unliked vedio has been liked")
   } catch (err) {
      next(err)
   }
}


module.exports = {
    update,deleteUser,getUser,subscribe,unsubscribe,like,unlike,
}


