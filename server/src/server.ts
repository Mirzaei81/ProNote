import {getConnection} from "./Utils/CreatePools.js"
import jwt from "jsonwebtoken"
import {encryptPass,Matching} from "./Utils/encryptPass.js"
import {findNullKeysRecursive} from "./Utils/checkForNull.js"
import { CountResult, LoginResault } from "./types.js";
import cors from "cors"
import express,{Express,Request,Response} from "express"
import bodyParser from "body-parser"
import { VerifyJWT} from "./Utils/Verify.js";

const myKey = process.env.PRIVATEKEY||"MySecret";
const app: Express = express();

app.use(cors())
app.use(bodyParser.json())
app.use('/note/',VerifyJWT)//securing note route and injecting user context to it 
app.use(getConnection)//securing note route and injecting user context to it 

app.post('/register', async (req:Request, res:Response) => {
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
      'SELECT COUNT(*) FROM users WHERE username = ? AND email= ?',
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
    const sql = 'INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?);'
    const values = [username,email,passHashed];
    
    const [resault,fields] = await req.conn.execute(sql,values)

    req.conn.release()
    const Token = jwt.sign({username:username,passHashed:passHashed},myKey)
    res.json({ message: 'User registered',Token:Token});
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error',error:error });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  if(!req.conn){
      res.status(500).send({
        error:"Couldn't create Database"
      })
      return;
  }
  try {
    const {username, password } = req.body;
    const [data, fields] = await req.conn.query<LoginResault[]>(
      'select * from `users` where `username` = ? limit 1'
      ,[username]
    )
    if (data.length === 0) {
      req.conn.release()
      return res.status(401).json({error: 'User Does not exist' });
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
    console.log(error)
    res.status(500).json({ message: 'Internal server error',error:error });
  }
  finally{
    req.conn.release()
  }
});
//update
app.put('/note/:id', async (req, res) => {
  if(!req.conn){
      res.status(500).send({
        error:"Couldn't create Database"
      })
      return;
  }
  const {id} =  req.params;
  try {
    const {title,body} = req.body;
    const nullKeys:string[] =findNullKeysRecursive({title:title,body:body})
    if (nullKeys.length!==0){
      res.status(400).json({error:`${nullKeys} Can't be null`})
      req.conn.release()
      return;
    }
    const [data, fields] = await req.conn.execute(
      'UPDATE text_table SET body = ? , title = ? where id =? ;'
      ,[title,body,id]
    )
    res.json({ message: 'Succesfull' });
      req.conn.release()
    return;
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
  finally{
    req.conn.release()
  }
});
//delete
app.delete('/note/:id', async (req, res) => {
if(!req.conn){
      res.status(500).send({
        error:"Couldn't create Database"
      })
      return;
  }
  const {id} = req.params
  const userId = req.user!.id;
  try {
    const [data, fields] = await req.conn.execute(
      'DELETE from text_table where `title` = ? and `user_id` = ? ;'
      ,[id,userId]
    )
    res.json({ message: 'Succesfull' });
    req.conn.release()
    return;
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Internal server error' });
  } finally{
    req.conn.release()
  }
});
// Text endpoint 
app.post('/note/', async (req, res) => {
  if (!req.conn) {
    res.status(500).send({
      error: "Couldn't create Database"
    })
    return;
  }
  const id = req.user!.id;
  try {
    const {tags,title,body} = req.body;

    const nullKeys:string[] =findNullKeysRecursive({id:id,body:body,title:title,tags:tags})

    if (nullKeys.length!==0){
      res.status(400).json({error:`${nullKeys} Can't be null`})
      req.conn.release()
      return;
    }
    const [count] = await req.conn.execute<CountResult[]>(
      'select COUNT(*) from text_table where  `user_id` = ? and `title` = ?  ;'
      ,[id,title]
    )
    if (count[0]["COUNT(*)"]>0){
      res.status(409).send(
      {
        "status": "error",
        "code": 409,
        "message": "This username has Send the same Title.",
      })
      req.conn.release()
      return
    }
    const [data] = await req.conn.execute(
      'INSERT INTO text_table(`tags`, `title`, `body`,`user_id`) VALUES (?, ?, ?,?);'
      ,[tags,title,body,id]
    )
    res.json({ message: 'Succesfull' });
      req.conn.release()
    return;
  } catch (error) {
    console.error(error)
    res.status(400).json({error: 'internal Server error' });
  } finally{
    req.conn.release()
  }
});
// get allendpoint 
app.get('/note/', async (req, res) => {
  if (!req.conn) {
    res.status(500).send({
      error: "Couldn't create Database"
    })
    return;
  }
  try {
    const id = req.user;
    const nullKeys:string[] =findNullKeysRecursive({id:id})
    if (nullKeys.length!==0){
      res.status(400).json({error:`${nullKeys} Can't be null`})
      req.conn.release()
      return;
    }
    const [data, fields] = await req.conn.execute(
      'SELECT * FROM text_table WHERE `user_id` = ? ;'
      ,[id!.id]
    )
    res.json({ message: 'Succesfull',data:data });
      req.conn.release()
    return;
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Internal server error' });
  } finally{
    req.conn.release()
  }
});

app.get('/note/:id', async (req:Request, res) => {
  if (!req.conn) {
    res.status(500).send({
      error: "Couldn't create Database"
    })
    return;
  }
  const {id} = req.params
  const Userid = req.user;
  try {
    const nullKeys:string[] =findNullKeysRecursive({id:id})
    if (nullKeys.length!==0){
      res.status(400).json({message:`${nullKeys} Can't be null`})
      req.conn.release()
      return;
    }
    const [data, fields] = await req.conn.execute(
      'SELECT * FROM text_table WHERE `user_id` = ? and `title` = ? ;'
      ,[Userid!.id,id]
    )
    res.json({ message: 'Succesfull',data:data });
      req.conn.release()
    return;
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' });
  } finally{
    req.conn.release()
  }
});

export const  server =app
