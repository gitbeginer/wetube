const fakeUser = {
    username: "Nicolas",
    loggedIn: true,
  };
const videos = [
{
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 1,
},
{
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
},
{
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
},
];
export const trending = (req, res) => res.render("home", { pageTitle: "Home" , videos});
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