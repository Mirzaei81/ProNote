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
        await conn.query(`CREATE TABLE IF NOT EXISTS  text_table (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            body TEXT NOT NULL,
            user_id INT
          );`);
    } catch (e) {
        console.error(e);
        throw {
            "error": "Couldn't Connect Create text_table"
        };
    }
    try {
        await conn.query(`CREATE TABLE IF NOT EXISTS  user_table (
             id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(255)
          );`);
    } catch (err) {
        throw {
            "error": "Couldn't Connect Create user_table"
        };
    }
    try {
        const [res] = await conn.execute(`SELECT COUNT(*)
                FROM information_schema.TABLE_CONSTRAINTS
                WHERE CONSTRAINT_SCHEMA = DATABASE()
                AND CONSTRAINT_NAME = 'fk_user_id'
                AND CONSTRAINT_TYPE = 'FOREIGN KEY';`);
        //@ts-expect-error
        if (res[0]["COUNT(*)"] == 0) {
            await conn.execute(`
        ALTER TABLE text_table
        ADD CONSTRAINT  fk_user_id
        FOREIGN KEY (user_id)
        REFERENCES user_table(id);`);
        }
    } catch (e) {
        console.error(e);
        throw {
            "error": "couldn't Update Text_table"
        };
    }
};

//# sourceMappingURL=setupDatabase.js.map