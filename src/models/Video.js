import mongoose from "mongoose";
const videoschema =  new mongoose.Schema({
    title: String,
    descripton: String,
    createAt : Date,
    hashtag:[{type:String}],
    meta:{
        views:Number,
        rating:Number,
    },
})

const Video = mongoose.model("Video",videoschema);
export default Video;
