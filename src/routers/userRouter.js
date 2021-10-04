import express from "express"
import { getEdit } from "../controllers/videoControl";
const userRouter = express.Router();
userRouter.get("/edit", getEdit)

export default userRouter;
