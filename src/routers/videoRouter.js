import express from "express"
import {watch,getEdit,postEdit,upload, postUpload, deleteVideo} from "../controllers/videoControl.js"
import { protectorMiddleware, videoUpload } from "../middlewares";
const videoRouter = express.Router();
videoRouter.get("/:id([0-9a-f]{24})", watch);



videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deleteVideo);    
videoRouter 
  .route("/upload") 
  .all(protectorMiddleware)
  .get(upload)
  .post(videoUpload.fields([{ name: "video" }, { name: "thumb" }]), postUpload);

export default videoRouter;
