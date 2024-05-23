import {getConnection} from "./Utils/index"
import jwt from "jsonwebtoken"
import {encryptPass,Matching} from "./encryptPass"
import {findNullKeysRecursive} from "./checkForNull"
import { CountResult, LoginResault } from "./types";
import cors from "cors"
import express,{Express} from "express"
import bodyParser from "body-parser"
import { authenticateToken } from "./Utils/Verify";

const myKey = process.env.PRIVATEKEY||"MySecret"
const app:Express = express();
app.use(cors())
app.use(bodyParser.json())
app.use('/note/',authenticateToken)//securing note route and injecting user context to it 

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
      const Token = jwt.sign({username:username,passHashed:password,id:data[0].id},myKey)
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
//update
app.put('/note/:id', async (req, res) => {
  const conn = await getConnection()
  const {id} =  req.params;
  try {
    const {title,body} = req.body;
    const nullKeys:string[] =findNullKeysRecursive({title:title,body:body})
    if (nullKeys.length!==0){
      res.status(400).json({message:`${nullKeys} Can't be null`})
      conn.release()
      return;
    }
    const [data, fields] = await conn.execute(
      'UPDATE text_table SET body = ? , title = ? where id =? ;'
      ,[title,body,id]
    )
    console.log(data)
    res.json({ message: 'Succesfull' });
      conn.release()
    return;
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error',error:error });
  }
  finally{
    conn.release()
  }
});
//delete
app.delete('/note/:id', async (req, res) => {
  const conn = await getConnection()
  const {id} = req.params
  const userId = req.user.id;
  try {
    const [data, fields] = await conn.execute(
      'DELETE text_table where id = ? and `user_id` = ? ;'
      ,[id,userId]
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
// Text endpoint 
app.post('/note/', async (req, res) => {
  const conn = await getConnection()
  const id = req.user.id;
  try {
    const {tags,title,body} = req.body;

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
    res.status(400).json({ message: 'Title Should Be Uniqe' });
  } finally{
    conn.release()
  }
});
// get allendpoint 
app.get('/note/', async (req, res) => {
  const conn = await getConnection()
  try {
    const id = req.user;
    const nullKeys:string[] =findNullKeysRecursive({id:id})
    if (nullKeys.length!==0){
      res.status(400).json({message:`${nullKeys} Can't be null`})
      conn.release()
      return;
    }
    const [data, fields] = await conn.execute(
      'SELECT * FROM text_table WHERE `user_id` = ? ;'
      ,[id.id]
    )
    res.json({ message: 'Succesfull',data:data });
      conn.release()
    return;
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' });
  } finally{
    conn.release()
  }
});

app.get('/note/', async (req, res) => {
  const conn = await getConnection()
  try {
    const id = req.user;
    console.log(id)
    const nullKeys:string[] =findNullKeysRecursive({id:id})
    if (nullKeys.length!==0){
      res.status(400).json({message:`${nullKeys} Can't be null`})
      conn.release()
      return;
    }
    const [data, fields] = await conn.execute(
      'SLECT * FROM text_table WHERE `user_id` = ? ;'
      ,[id]
    )
    res.json({ message: 'Succesfull',data:data });
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
