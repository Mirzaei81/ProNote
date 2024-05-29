import { getConnection } from "./Utils/CreatePools.js";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { VerifyJWT } from "./Utils/Verify.js";
import { NoteRoute } from "./routes/notesRoutes.js";
import { UserRouter } from "./routes/userRoutes.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/note/', VerifyJWT) //securing note route and injecting user context to it 
;
app.use(getConnection) //securing note route and injecting user context to it 
;
app.use("/user", UserRouter);
app.use("/note", NoteRoute);
export const server = app;

//# sourceMappingURL=server.js.map