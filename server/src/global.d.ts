import { JwtPayload } from "jsonwebtoken";
import {PoolConnection} from "mysql2/promise"

declare global {
    namespace Express {
        export interface Request{
            conn?: PoolConnection
            user?: CustomJwtPayLoad
        }
    }
    export interface CustomJwtPayLoad extends JwtPayload {
        username: string,
        passHashed: string,
        id: number,
    }
}