import express from "express"
import {trending} from "../controllers/videoControl.js"
const globalRouter = express.Router();
globalRouter.get("/",trending)

export default globalRouter;
