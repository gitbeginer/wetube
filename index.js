import express from "express"
const app = express();
const port = 8088;
app.listen(port,()=>console.log(`Listening http://localhost:${port}`))

const middle = (rq,rs,next)=>{
    console.log("this is middle " + rq.url);
    next();
}
function endrs(rq,rs){
    return rs.send("HEY YOU");
}
app.use(middle);
app.get("/", endrs); 
