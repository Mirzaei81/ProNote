import { Router } from "express";
import { Request,Response } from "express";
import { CountResult, LoginResault } from "src/types";
import jwt from "jsonwebtoken"
import {encryptPass,Matching} from "./../Utils/encryptPass.js"


export const UserRouter = Router()
const myKey = process.env.PRIVATEKEY||"MySecret";

UserRouter.post('/register', async (req:Request, res:Response) => {
  if(!req.conn){
      res.status(500).send({
        "error":"Couldn't create Database"
      })
      return;
  }
  try {
    const { username, email, password } = req.body;
    //checking the userName and Emaill Exist for duplicaiton
    const [count] = await req.conn.query<CountResult[]>(
      'SELECT COUNT(*) FROM user_table WHERE username = ? AND email= ?',
      [username, email],
    );
    if (count[0]["COUNT(*)"]>0){
      res.status(409).send(
      {
        error: {"username": "Username already exists."}
      })
      req.conn.release()
      return
    }
    const passHashed = await encryptPass(password)
    //register the user 
    const sql = 'INSERT INTO user_table (`username`, `email`, `password`) VALUES (?, ?, ?);'
    const values = [username,email,passHashed];
    
    const [resault,fields] = await req.conn.execute(sql,values)

    req.conn.release()
    //@ts-ignore
    const Token = jwt.sign({username:username,passHashed:passHashed,id:resault.insertId},myKey)
    res.json({ message: 'User registered',Token:Token});
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error',error:error });
  }
});

// Login endpoint
UserRouter.post('/login', async (req, res) => {
  if(!req.conn){
      res.status(500).send({
        error:"Couldn't create Database"
      })
      return;
  }
  try {
    const {username, password } = req.body;
    const [data, fields] = await req.conn.query<LoginResault[]>(
      'select * from `user_table` where `username` = ? limit 1'
      ,[username]
    )
    if (data.length === 0) {
      req.conn.release()
      return res.status(401).json({error: 'User Does not exist please Sign in ' });
    }
    const match = await Matching(password,data[0].password)
    if (match){
      const Token = jwt.sign({username:username,passHashed:password,id:data[0].id},myKey)
      res.status(200).json({ message: 'Logged in', Token:Token });
    }
    else{
      res.status(401).json({ error: 'Password is Incorrect' });
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error',error:error });
  }
  finally{
    req.conn.release()
  }
});