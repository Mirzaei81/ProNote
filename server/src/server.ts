import express,{Express,Request,Response} from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser,{BodyParser} from "body-parser"
import {getConnection} from "./Controller/index"
import crypto from "crypto"

dotenv.config()
export const app:Express = express();
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT||3000;
app.post('/register', async (req, res) => {
  const conn = await getConnection()
  try {
    const { username, email, password } = req.body;
    let passHashed =  crypto.createHash("sha256").update(password).digest('hex')
    const [data,fields] = await conn.execute(
      'INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?);'
      ,[username,email,passHashed]
    )
    conn.release()
    console.log(fields)
    res.json({ message: 'User registered', user: data.toString()});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const conn = await getConnection()
  try {
    const {username, password } = req.body;
    const [data, fields] = await conn.query(
      'select * from `users` where `username` = ? '
      ,[username]
    )
    console.log(fields)
    res.json({ message: 'Logged in', user: data });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Text endpoint (not implemented)
app.post('/text', async (req, res) => {
  const conn = await getConnection()
  try {
    const {tag,title,body,id} = req.body;
    const [data, fields] = await conn.query(
      'INSERT INTO text_table(`tags`, `title`, `body`,`user_id`) VALUES (?, ?, ?,?);'
      ,[tag,title,body,id]
    )
    console.log(fields)
    res.json({ message: 'Succesfull', user: data });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } finally{
    conn.release()
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

