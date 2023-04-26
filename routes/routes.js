const express = require("express");
const verifyToken =require('../verifyToken')
const {signup,signin,googleauth}  = require("../controller/controller");
const {  addVedio,updateVedio ,deleteVedio,getVedio,trands,random,search, getByTags,addView,subs,searchByCategory}  = require("../controller/vedioController");
const {update,deleteUser,getUser,subscribe,unsubscribe,like,unlike}= require("../controller/userController");
const {addComment,deleteComment,getComment} = require("../controller/commentController")
const router = express.Router();

// user routes
router.post("/signup",signup); //
router.post("/signin",signin);  //
router.post("/googleAuth",googleauth) //
router.put("/:id",verifyToken,update);  //
router.delete("/:id",verifyToken,deleteUser); //x
router.get("/find/:id",getUser); //
router.put("/sub/:id",verifyToken,subscribe); //
router.put("/unsub/:id",verifyToken,unsubscribe); //

// vedio routes
router.put("/like/:videoId",verifyToken,like);//
router.put("/unlike/:videoId",verifyToken,unlike); //
router.post("/video",verifyToken,addVedio); //
router.put("/video/:id",verifyToken,updateVedio); //x
router.delete("/video/:id",verifyToken,deleteVedio); //x
router.get("/video/find/:id",getVedio); //
router.put("/video/view/:id",verifyToken,addView);
router.get("/video/trands",trands);  //
router.get("/video/random",random);   //
router.get("/video/subs",verifyToken,subs);  //
router.get("/tag",getByTags)
router.get("/search",search) //
router.get ("/searchcategory/:category" ,searchByCategory)
 //commment routes

 router.post("/addcomment",verifyToken,addComment)
 router.delete("/:id",verifyToken,deleteComment)
 router.get("/getcomment/:videoId",getComment)
module.exports= router;

