import dotenv from "dotenv"
import {server} from "./server.ts"

const port = process.env.PORT||3000;
dotenv.config()
server.listen(port,()=>{
    console.log(`Main app listening on port ${port}`)
})