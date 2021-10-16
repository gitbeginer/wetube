import mongoose from "mongoose";
const commentSchma =  new mongoose.Schema({
    text: {type:String, required:true, trim:true, maxlength:255},
    createAt : {type:Date, required:true, default:Date.now},
    ownerID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    videoID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
});

const Comment = mongoose.model("Comment", commentSchma);
export default Comment;