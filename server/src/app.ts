import dotenv from "dotenv"
import {server} from "./server.js"
dotenv.config()
const port = process.env.PORT||3000;
const address = process.env.LOCALADDRESS||'0.0.0.0'
server.listen(Number(port),address,()=>{
    console.log(`Main app listening on port ${address}:${port}`)
})