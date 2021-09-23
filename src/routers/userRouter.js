import express from "express"
import { edit } from "../controllers/videoControl";
const userRouter = express.Router();
userRouter.get("/edit", edit)

export default userRouter;
