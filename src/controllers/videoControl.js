import Video from "../models/Video";
export const home = async (req, res) =>{
    try{
        const videos = await Video.find({})
        res.render("home", { pageTitle: "Home" , videos});

    }catch(error){
        res.render("Server Error",{error})
    }
};
    
export const watch = (req, res) =>{
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("watch", { pageTitle: `Watching ${video.title}` , video });
};
export const getEdit = (req, res) =>{
    const { id } = req.params;
    const video = videos[id - 1];
 res.render("edit",  { pageTitle: `${video.title}` ,video });
};
export const postEdit = (req,res) => {
    videos[req.params.id-1].title = req.body.title;
    return res.redirect(`/videos/${req.params.id}`);
};
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.render("upload", {pageTitle: "Upload" });
export const deleteVideo = (req, res) => res.send("Delete Video");
export const postupload = async (req,res) =>{
    const {title, description, hashtags} = req.body;
    const video =  new Video({
        title,
        description,
        hashtags:hashtags.split(",").map((word)=>`#${word}`), 
    });
    try{
        const dbvideo =  await video.save();
        console.log(dbvideo);
        return res.redirect("/");
    }catch(error){
        console.log(error);
        return res.render("upload", {pageTitle:"upload video", errmsg:error._message});
    }
}