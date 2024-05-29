import mysql from "mysql2/promise"
import { Request,Response,NextFunction } from "express";
import dotenv  from "dotenv"
import { setupDatabase } from "src/setupDatabase";
import  ReadLine  from "readline";
import { Writable } from "stream";
// Create a connection pool

var rl = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.stdoutMuted = true;

rl.query = "Password : ";
rl.question(rl.query, function(password) {
  console.log('\nPassword is ' + password);
  rl.close();
});

rl._writeToOutput = function _writeToOutput(stringToWrite:string) {
  if (rl.stdoutMuted)
    rl.output.write("\x1B[2K\x1B[200D"+rl.query+"["+((rl.line.length%2==1)?"=-":"-=")+"]");
  else
    rl.output.write(stringToWrite);
};
dotenv.config()
const HOST = process.env.HOST 
const USER = process.env.USER
const PASS = process.env.PASS
if(HOST===undefined||USER===undefined||PASS===undefined){

}
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