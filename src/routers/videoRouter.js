import express from "express"
import {watch,getEdit,postEdit,upload, deleteVideo} from "../controllers/videoControl.js"
const videoRouter = express.Router();
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", getEdit);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit)
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", upload);

export default videoRouter;