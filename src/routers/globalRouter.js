import express from "express"
import {home} from "../controllers/videoControl.js"
const globalRouter = express.Router();
globalRouter.get("/",home)

export default globalRouter;
