import mysql from "mysql2/promise"
try{
  const conn= await mysql.createConnection({
    host     : 'localhost',
    user     : 'Admin',
    password : '@M1r@rsh1@',
    database : "User"
  });
  const [results, fields] = await conn.query(
    'SELECT * FROM `users`'
  );
  console.log(results)
} catch(err){
  console.log(err)
}