import { Router,Request } from "express";
import { CountResult } from "src/types";
import { findNullKeysRecursive } from "src/Utils/checkForNull";

export const  NoteRoute = Router()
const myKey = process.env.PRIVATEKEY||"MySecret";
/** 
 * @swagger
*   put:
 *     summary: Updates a specific note by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       '200':
 *         description: The updated note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'*/
NoteRoute.put('/:id', async (req, res) => {
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
/** 
 * @swagger
*   delete:
 *     summary: Deletes a specific note by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully deleted note
 */
NoteRoute.delete('/:id', async (req, res) => {
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
/**  
 * @swagger
*   post:
*     summary: Creates a new note
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Note'
*     responses:
*       '200':
*         description: The newly created note
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Note'*/
NoteRoute.post('/', async (req, res) => {
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
/** 
 * @swagger
 * notes:
 *  get:
 *    summary: Returns a list of notes
 *    responses:
 *      '200':
 *        description: An array of notes
 *      '500':
 *          error in Database Creation
 *      '400':
 *          Token IsInvalid Should'nt even  calls
*/
NoteRoute.get('/', async (req, res) => {
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
/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Returns a specific note by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The requested note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'*/
NoteRoute.get('/note/:id', async (req:Request, res) => {
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