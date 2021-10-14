import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({})
            .sort({ createdAt: "desc" })
            .populate("owner");

        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        res.render("Server Error", { error })
    }
};

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id).populate("owner");

    if (!video) return res.render("404", { pageTitle: "Video not Found" });
    return res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) return res.status(404).render("404", { pageTitle: "Video not Found" });
    return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.exists({ _id: id });
    if (!video) return res.status(404).render("404", { pageTitle: "Video not Found" });

    await Video.findByIdAndUpdate(id, req.body);
    return res.redirect(`/videos/${req.params.id}`);
};
export const search = async (req, res) => {
    const { keyword } = req.query
    let videos = []
    if (keyword) {
        videos = await Video.find({ title: { $regex: new RegExp(keyword, "i") } }).populate("owner");;
    }
    res.render("Search", { pageTitle: "Search", videos });
}
export const upload = (req, res) =>{
     res.header("Cross-Origin-Embedder-Policy", "require-corp");
     res.header("Cross-Origin-Opener-Policy", "same-origin");
     res.render("upload", { pageTitle: "Upload" })
};
export const deleteVideo = async (req, res) => {
    await Video.findByIdAndDelete(req.params.id);
    return res.redirect("/");
}
export const postupload = async (req, res) => {
    const {
        user: { _id },
    } = req.session;

    const { path: fileUrl } = req.file;
    req.body.fileUrl = "/" + fileUrl;
    req.body.owner = _id;
    const video = new Video(req.body);
    try {
        const dbvideo = await video.save();
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.render("upload", { pageTitle: "upload video", errmsg: error._message });
    }
}
export const registerView = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
};