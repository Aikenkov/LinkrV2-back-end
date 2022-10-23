import connection from "../database/database.js";

export async function insertUser(email) {
    return await connection.query(
        `
            SELECT * FROM 
                users
            WHERE
                email=$1;

        `,
        [email]
    );
}

export async function insertUsername(username) {
    return await connection.query(
        `
            SELECT * FROM 
                users
            WHERE
                username=$1;
        `,
        [username]
    );
}

export async function insertUserId(username, email, passwordHash) {
    return await connection.query(
        `
            INSERT INTO 
                users(username, email, password)
            VALUES
                ($1, $2, $3)
            RETURNING id    
            ;
        `,
        [username, email, passwordHash]
    );
}

export async function insertUserImage(url, newUserId) {
    await connection.query(
        `
                INSERT INTO 
                    pictures(picture_uri, user_id)
                VALUES 
                    ($1, $2);
            `,
        [url, newUserId]
    );
}

export async function insertUserSession(validUser_id, token) {
    await connection.query(
        `
            INSERT INTO 
                sessions(user_id, token)
            VALUES 
                ($1,$2);
        `,
        [validUser_id, token]
    );
}

export async function getUserByEmail(email) {
    return await connection.query(
        `
        SELECT * FROM
            users
        WHERE 
            email=$1;
    `,
        [email]
    );
}

export async function getUserImageById(validUser_id) {
    return await connection.query(
        `
        SELECT picture_uri FROM
            pictures
        WHERE 
            user_id = $1;
    `,
        [validUser_id]
    );
}
