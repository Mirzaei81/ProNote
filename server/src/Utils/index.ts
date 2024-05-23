import mysql from "mysql2/promise"
// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // Limit the number of connections in the pool to 10
    host     : 'localhost',
    user     : 'Admin',
    password : '@M1r@rsh1@',
    database : "User"
});
export const getConnection = async()=>{
      // Use the connection pool to get a connection
      const connection = await pool.getConnection();
      return connection;
}