import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { setupDatabase } from "../setupDatabase.js";
import ReadLine from "readline";
import fs from "fs";
// Create a connection pool
const rl = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout
});
const envData = {};
function writeEnvFile() {
    const envContent = `HOST=${envData.host}\nUSER=${envData.user}\nPASSWORD=${envData.password}`;
    fs.writeFile('.env', envContent, (err)=>{
        if (err) {
            console.error('Error writing to .env file:', err);
            process.exit(1);
        } else {
            console.log(`Successfully wrote ${envData.host}, ${envData.user}, and ${envData.password} to .env file.`);
            process.exit(0);
        }
    });
}
dotenv.config();
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASS = process.env.PASS;
if (HOST === undefined || USER === undefined || PASS === undefined) {
    rl.question('Enter the host: ', (host)=>{
        envData.host = host;
        rl.question('Enter the username: ', (user)=>{
            envData.user = user;
            rl.question('Enter the password: ', (password)=>{
                envData.password = password;
                rl.close();
                writeEnvFile();
            });
        });
    });
}
let conn;
try {
    conn = mysql.createPool({
        connectionLimit: 10,
        host: HOST,
        user: USER,
        password: PASS
    });
    await setupDatabase(await conn.getConnection());
} catch (e) {
    throw {
        error: "Failed To create Pool to DB Please Check you're username and password"
    };
}
export const getConnection = async (req, res, next)=>{
    // Use the connection pool to get a connection
    try {
        const connection = await conn.getConnection();
        req.conn = connection;
        next();
    } catch  {
        throw {
            "err": "Could not create the connection"
        };
    }
};

//# sourceMappingURL=CreatePools.js.map