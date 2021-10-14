import mongoose from "mongoose";
const videoschema =  new mongoose.Schema({
    title: {type:String, required:true, trim:true, maxlength:80},
    thumbUrl: { type: String, required: true },
    fileUrl: { type: String, required: true },
    description: {type:String, required:true, trim:true, minlength:2},
    createAt : {type:Date, required:true, default:Date.now},
    hashtags:[{type:String}],
    meta:{
        views:{type:Number, default:0},
        rating:{type:Number, default:0}
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});
function formatHashTags(word){
    word = Array.isArray(word) ? word.join() : word;
    return word.split(",").map((word)=> word.startsWith('#') ? word : `#${word}`)
}
videoschema.pre("save", async function(){
    this.hashtags = formatHashTags(this.hashtags);
});

videoschema.pre('findOneAndUpdate', async function() {
    this._update.hashtags = formatHashTags(this._update.hashtags);
});
videoschema.static("testF", function(){console.log("TEST??")});
const Video = mongoose.model("Video",videoschema);

export default Video;
