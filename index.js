import express from "express"
const app = express();
const port = 8088;
app.listen(port,()=>console.log(`Listening http://localhost:${port}`))
app.get("/",(rq,rp)=>{
    console.log(rq)
})