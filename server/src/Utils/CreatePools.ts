import mysql from "mysql2/promise"
import { Request,Response,NextFunction } from "express";
import dotenv  from "dotenv"
import { setupDatabase } from "src/DBSetup";
// Create a connection pool
dotenv.config()
const HOST = process.env.HOST 
const USER = process.env.USER
const PASS = process.env.PASS
let conn;
try{
  conn = mysql.createPool({
    connectionLimit: 10,
    host: HOST,
    user: USER,
    password: PASS,
  });
  await setupDatabase(await conn.getConnection())
}
catch(e){
  throw e
}
export const getConnection = async(req:Request, res:Response, next:NextFunction)=>{
      // Use the connection pool to get a connection
      try{
        const connection =await conn.getConnection();
        req.conn= connection
        next()
      }
      catch{
        throw {"err":"Could not create the connection"}
      }
}