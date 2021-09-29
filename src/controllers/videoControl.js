import Video from "../models/Video";
export const home = (req, res) =>{
    Video.find({}, (error,videos)=>{
        console.log(error, videos);
    });
    res.render("home", { pageTitle: "Home" , videos: []});
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
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");