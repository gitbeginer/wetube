import "regenerator-runtime"
import "dotenv/config"
import "./db"
// import "./models/Video"
// import "./models/User";
import app from "./server.js"
const port = process.env.PORT || 80;


app.listen(port,()=>console.log(`Listening http://localhost:${port}`))
