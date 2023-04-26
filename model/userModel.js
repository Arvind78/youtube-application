const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
         required:true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
     
    },
    img: {
        type: String
    },
    subcribers:{
        type:Number,
        default:0
    },
    fromGoogle:{
        type:Boolean,
         default:false
    },
    subscribeuser:{
        type:[String]
    }
   
},{timestamps:true})
module.exports = mongoose.model("User", userSchema)
