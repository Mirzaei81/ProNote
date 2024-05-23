import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        export interface Request {
            user?: CustomJwtPayLoad
        }
    }
    export interface CustomJwtPayLoad extends JwtPayload {
        username: string,
        passHashed: string,
        id: number,
    }
}