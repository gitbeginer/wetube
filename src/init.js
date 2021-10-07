import "dotenv/config"
import "./db"
// import "./models/Video"
// import "./models/User";
import app from "./server.js"
const port = 8088;


app.listen(port,()=>console.log(`Listening http://localhost:${port}`))
