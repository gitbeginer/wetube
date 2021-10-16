import express from "express";
import { addnew } from "../controllers/commentcControl";
import { registerView } from "../controllers/videoControl";

const apiRouter = express.Router();
apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/:id([0-9a-f]{24})/comment", addnew);

export default apiRouter;