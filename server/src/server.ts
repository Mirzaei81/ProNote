import express,{Express} from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import {getConnection} from "./Controller/index"
import jwt from "jsonwebtoken"
import encryptPass from "./encryptPass"
import { RowDataPacket } from "mysql2"
import {findNullKeysRecursive} from "./checkForNull"


dotenv.config()
const myKey = process.env.PRIVATE_KEY||"MYPRIVATEKEY" // Change in prod

export const app:Express = express();

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT||3000;

type CountResult = RowDataPacket & {
  'COUNT(*)': number;
};
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
      return
    }
    const passHashed = encryptPass(password)
    //register the user 
    const [data,fields] = await conn.execute(
      'INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?);'
      ,[username,email,passHashed]
    )
    console.log(data)

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
    const passHashed = await encryptPass(password)
    console.log(passHashed)
    const [data, fields] = await conn.query(
      'select * from `users` where `username` = ? and `password` = ?  limit 1'
      ,[username,passHashed]
    )
    console.log(data)
    if (data.length === 0) {
      return res.status(401).json({ message: 'User Does not exist' });
    }
    console.log(Object.getPrototypeOf(data))

    const Token = jwt.sign({username:username,passHashed:passHashed},myKey)
    res.status(200).json({ message: 'Logged in', user: data });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error',error:error });
  }
});

// Text endpoint (not implemented)
app.post('/text', async (req, res) => {
  const conn = await getConnection()
  try {
    const {tags,title,body,id} = req.body;
    const nullKeys:string[] =findNullKeysRecursive({id:id,body:body,title:title,tags:tags})
    console.log(nullKeys)
    if (nullKeys.length!==0){
      res.status(400).json({message:`${nullKeys} Can't be null`})
      return;
    }
    const [data, fields] = await conn.execute(
      'INSERT INTO text_table(`tags`, `title`, `body`,`user_id`) VALUES (?, ?, ?,?);'
      ,[tags,title,body,id]
    )
    res.json({ message: 'Succesfull' });
    return;
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' });
    return;
  } finally{
    conn.release()
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

