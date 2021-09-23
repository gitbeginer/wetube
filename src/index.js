import express from "express"
import logger from "morgan"
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/videoRouter";


const app = express();
const port = 8088;

app.set("view engine", "pug")
app.set("views",process.cwd()+"/src/views");
app.use(logger("common"));

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


function endrs(rq,rs,next){
    return rs.send("404");
}
app.get("*", endrs); 



app.listen(port,()=>console.log(`Listening http://localhost:${port}`))
