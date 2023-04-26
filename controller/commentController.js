const mongoose = require("mongoose");
const commentModel = require('../model/comment');
const error = require("../error");
const vedioModel = require("../model/vedioModel");

const addComment =async(req,res,next)=>{
    console.log(req.body)
    const newComment = await commentModel.create({...req.body,userId:res.user.id})

try {
    res.status(200).json(newComment)
} catch (err) {
    next(err)
}
}

const deleteComment =async(req,res,next)=>{
    try {
        const comment = await commentModel.findById(req.params.id)
        const vedio = await vedioModel.findById(req.params.id)
        if(res.user.id===comment.userId ||res.user.id===vedio.userId ){
            await commentModel.findByIdAndDelete(req.params.id)
          res.status(200).json("your comment has been deleted!")
        }else{
            next(error(403,"you con deleted your comment only!"))
        }
    } catch (err) {
        next(err)
    }
}

const getComment =async(req,res,next)=>{
     console.log(req.params.videoId)
    try {
        const comment = await commentModel.find({vedioId:req.params.videoId})
        res.status(200).json(comment)
    } catch (err) {
        next(err)
    }
}

module.exports ={
    addComment,deleteComment,getComment
}









