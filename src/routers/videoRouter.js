import express from "express"
import {watch,getEdit,postEdit,upload, postupload, deleteVideo} from "../controllers/videoControl.js"
const videoRouter = express.Router();
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit)
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);
videoRouter.route("/upload").get(upload).post(postupload);

export default videoRouter;
