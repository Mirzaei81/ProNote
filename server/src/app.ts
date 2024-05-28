import {server} from "./server.js"
import  swaggerUi from "swagger-ui-express"
import fs from "fs"
import YAML from "yaml"
import { getIPAddress } from "./Utils/getNetworkadress.js"

const file =  fs.readFileSync("./src/swaggerDocs.yaml","utf-8")
const specs = YAML.parse(file)
const port = process.env.PORT||3000;
const address = getIPAddress()
server.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
server.listen(Number(port),address,()=>{
    console.log(`Main app listening on port ${address}:${port}`)
})