import connection from "../database/database.js";

async function getUser(id){
    return connection.query(`SELECT
     users.id, users.username, pictures.picture_uri AS picture, users.email 
     FROM users
     LEFT JOIN pictures ON users.id = pictures.user_id 
     WHERE users.id=$1`,[id]);
}

export {getUser}