const mongoose = require("mongoose");

const vedioSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    vedioUrl: {
        type: String,
        required: true
    },
    tag: {
        type: [String],
        default: []
    },
    like: {
        type: [String],
        default: []
    },
    category: {
        type:String
    },
    view: {
        type: Number,
        default: 0
    },
    dislike: {
        type: [String],
        default: []
    },
}, { timestamps: true })
module.exports = mongoose.model("Vedio", vedioSchema)

