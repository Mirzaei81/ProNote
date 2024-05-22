import {getConnection} from "./Controller/index"
import jwt from "jsonwebtoken"
import {encryptPass,Matching} from "./encryptPass"
import {findNullKeysRecursive} from "./checkForNull"
import { CountResult, LoginResault } from "./types";
import cors from "cors"
import express,{Express} from "express"
import bodyParser from "body-parser"

const myKey = process.env.PRIVATEKEY||"MySecret"
const app:Express = express();
app.use(cors())
app.use(bodyParser.json())

app.post('/register', async (req, res) => {
  const conn = await getConnection()
  try {
    const { username, email, password } = req.body;
    //checking the userName and Emaill Exist for duplicaiton
    const [count] = await conn.execute<CountResult[]>(
      'SELECT COUNT(*) FROM users WHERE username = ? AND email= ?',
      [username, email],
    );
    if (count[0]["COUNT(*)"]>0){
      res.status(409).send(
      {
        "status": "error",
        "code": 409,
        "message": "The username or email address is already in use. Please choose a different username or email.",
        "errors": {
          "username": "Username already exists.",
          "email": "Email address is already registered."
        }
      })

      conn.release()
      return
    }
    const passHashed = encryptPass(password)
    //register the user 
    const [data,fields] = await conn.execute(
      'INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?);'
      ,[username,email,passHashed]
    )

    conn.release()
    const Token = jwt.sign({username:username,passHashed:passHashed},myKey)
    res.json({ message: 'User registered', user: data.toString(),Token:Token});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const conn = await getConnection()
  try {
    const {username, password } = req.body;
    const [data, fields] = await conn.query<LoginResault[]>(
      'select * from `users` where `username` = ? limit 1'
      ,[username]
    )
    if (data.length === 0) {
      conn.release()
      return res.status(401).json({ message: 'User Does not exist' });
    }
    const match = await Matching(password,data[0].password)
    if (match){
      const Token = jwt.sign({username:username,passHashed:password},myKey)
      res.status(200).json({ message: 'Logged in', user: data,Token:Token });
    }
    else{
      res.status(401).json({ message: 'Password is Incorrect', user: data });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error',error:error });
  }
  finally{
    conn.release()
  }
});

// Text endpoint (not implemented)
app.post('/text', async (req, res) => {
  const conn = await getConnection()
  try {
    const {tags,title,body,id} = req.body;
    const nullKeys:string[] =findNullKeysRecursive({id:id,body:body,title:title,tags:tags})
    if (nullKeys.length!==0){
      res.status(400).json({message:`${nullKeys} Can't be null`})
      conn.release()
      return;
    }
    const [data, fields] = await conn.execute(
      'INSERT INTO text_table(`tags`, `title`, `body`,`user_id`) VALUES (?, ?, ?,?);'
      ,[tags,title,body,id]
    )
    res.json({ message: 'Succesfull' });
      conn.release()
    return;
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' });
  } finally{
    conn.release()
  }
});



export const  server =app
