const mongoose = require('mongoose');
const vedioModel = require('../model/vedioModel');
const userModel = require('../model/userModel');
const error = require("../error");
//add vedio routes controller
const addVedio =async(req,res,next)=>{
  console.log(req.body)
    const newVedio = await vedioModel.create({userId:res.user.id,...req.body})
    try {
     res.status(200).json(newVedio);
  } catch (err) { next(err)}
}


// update vedio routes controller
const updateVedio =async(req,res,next)=>{
   try {
    const vedio = await vedioModel.findById(`${req.params.id}`)
    if(!vedio) return next(error(404,"video not found!"))
     if(res.user.id===vedio.userId){
      const updatedVedio = await vedioModel.findByIdAndUpdate(`${req.params.id}`,{$set:req.body},{new:true})
        res.status(200).json(updatedVedio)
     }
     else{
        return next(error(403,"You con only update your vedio!"))
     }
   } catch (err) {next(err)}
  }

//   delete vedio routes controller
const deleteVedio =async(req,res,next)=>{
    try {
        const vedio = await vedioModel.findById(`${req.params.id}`)
        if(!vedio) return next(error(404,"video not found!"))
         if(res.user.id===vedio.userId){
           await vedioModel.findByIdAndDelete(`${req.params.id}`)
            res.status(200).json("video has been deleted")
         }
         else{
            return next(error("You con only update your vedio!"))
         }
    } catch (err) {
      next(err)
    }
  }

//   get vedio routes controller
const getVedio =async(req,res,next)=>{
    try {
      const vedio = await vedioModel.findById(`${req.params.id}`);
      if(vedio){
        return res.status(200).json(vedio)
      } 
      else{
        return  next(error(404,"video not found!"))
      }
    } catch (err) {next(err) }
  }


//   addview routes controller
const addView =async(req,res,next)=>{
    try {
      const vedio = await vedioModel.findByIdAndUpdate(`${req.params.id}`,{
        $inc:{view:1}
      });
       res.status(200).json("view has been increased.!")
    } catch (err) {next(err) }
  }

  
//   trands vedio routes controller
  const trands =async(req,res,next)=>{
    try {
      const vedios = await vedioModel.find().sort({view:-1});
       res.status(200).json(vedios)
    } catch (err) {next(err) }
  }

//   random vedio routes controller
  const random =async(req,res,next)=>{
    try {
      const vedios = await vedioModel.aggregate([{$sample:{size:40}}])
       res.status(200).json(vedios)
    } catch (err) {next(err) }
  }
  const subs =async(req,res,next)=>{
    try {
      
      const user = await userModel.findById(`${res.user.id}`);
   
      const subscribedChannel = user.subscribeuser;
      console.log(subscribedChannel)
        const list = await Promise.all(
            subscribedChannel.map((channelId)=>{
                return vedioModel.find({userId:channelId})
            }))
           
       res.status(200).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt))
    } catch (err) {next(err) }
  }
  const getByTags =async(req,res,next)=>{
    try {
      const vedios = await vedioModel.find({})
       res.status(200).json(vedios)
    } catch (err) {next(err) }
  }

  const search =async(req,res,next)=>{
    const query =req.query.q;
    try {
      const vedios = await vedioModel.find({title:{$regex:query,$option:"i"}});
       res.status(200).json(vedios)
    } catch (err) {next(err) }
  }


  const searchByCategory = async(req,res,next)=>{
     const category = req.params.category
     
     try {
      const data = await vedioModel.find({category:category});
       res.status(200).json(data)
       } catch (err) {
        next(err)
     }

  }
module.exports={
    addVedio,updateVedio
    ,deleteVedio,getVedio,trands,random,addView,subs,getByTags,search,searchByCategory
}
