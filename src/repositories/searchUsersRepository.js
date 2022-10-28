import connection from "../database/database.js";

export async function getsearchUsers(name){

    return await connection.query(`
    SELECT users.username, pictures.picture_uri, users.id FROM 
        users 
    JOIN 
        pictures
    ON 
        users.id = pictures.user_id
    WHERE 
            lower(username)
    LIKE 
        lower($1);
`,[`%${name}%`]
);
}

export async function getSearchFollowed(user){
    console.log('********', user)
    return await connection.query(`
    SELECT followed FROM
        follows
    WHERE
        follows.follower = ($1)
`,[user])
}