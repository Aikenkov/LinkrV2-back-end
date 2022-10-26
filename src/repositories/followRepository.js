import connection from "../database/database.js";

export async function postValidateFollow(id,){ 
    return await connection.query(`
    SELECT * FROM 
        users
    WHERE users.id = ($1)
    `,[id]
    );
}

export async function postFollowUsers(id,user){

    return  await connection.query(`
    INSERT INTO 
        follows(followed,follower)
    VALUES ($1,$2)
`,[id, user]
);
}

export async function deleteFollowUser(id,user){

    return  await connection.query(`
    DELETE FROM
        follows 
    WHERE  followed = $1 AND follower = $2
  `,[id, user]) 
}

export async function verifyfollow(id,user){

    return await connection.query(`
        SELECT * FROM 
            follows
        WHERE followed = $1 AND follower = $2
    `,[id,user])
}