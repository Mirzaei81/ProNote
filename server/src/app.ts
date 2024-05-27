import {server} from "./server.js"
import swaggerJsdoc from "swagger-jsdoc"
import  swaggerUi from "swagger-ui-express"
import { options } from "./Utils/swaggeroptions.js";

const port = process.env.PORT||3000;
const address = process.env.LOCALADDRESS||'0.0.0.0'
const specs = swaggerJsdoc(options);
server.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
server.listen(Number(port),address,()=>{
    console.log(`Main app listening on port ${address}:${port}`)
})