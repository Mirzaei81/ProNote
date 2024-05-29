export const setupDatabase = async (conn)=>{
    try {
        await conn.query('CREATE DATABASE IF NOT EXISTS UserDB;');
        conn.changeUser({
            database: 'UserDB'
        }).catch((err)=>{
            if (err) throw err;
        });
    } catch (e) {
        throw {
            "error": "Couldn't Connect Create The inital Database"
        };
    }
    try {
        await conn.query('DROP TABLE IF EXISTS user_table;');
        await conn.query(`CREATE TABLE  user_table (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(255)
          );`);
    } catch (err) {
        console.error(err);
        throw {
            "error": "Couldn't Connect Create user_table"
        };
    }
    try {
        await conn.query('DROP TABLE IF EXISTS text_table;');
        await conn.query(`CREATE TABLE text_table (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            tags VARCHAR(255),
            title VARCHAR(255) NOT NULL,
            body TEXT NOT NULL,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id)
          );`);
    } catch  {
        throw {
            "error": "Couldn't Connect Create text_table"
        };
    }
};

//# sourceMappingURL=DBSetup.js.map