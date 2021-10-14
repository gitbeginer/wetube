
import express from "express"
import logger from "morgan"
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import { localMiddleware } from "./middlewares";

const app = express();

app.set("view engine", "pug")
app.set("views",process.cwd()+"/src/views");
app.use(logger("common"));
app.use(express.urlencoded({extended: true}));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);

app.use(localMiddleware);
app.get("/add-one", (req, res, next) => {
req.session.potato += 1;
return res.send(`${req.session.id} ${req.session.potato}`);
});
app.use("/static", express.static("assets"));
app.use("/uploads", express.static("uploads"));

app.use("/node_modules",express.static("node_modules"));

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);


// function endrs(rq,rs,next){
//     return rs.send("404");
// }
// app.get("*", endrs); 

export default app;
