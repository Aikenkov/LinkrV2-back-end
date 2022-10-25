import connection from "../database/database.js";

export async function getCommentsByPostId(post_id) {
    return connection.query(
        `
        SELECT 
        comments.user_id,
        pictures.picture_uri,
        users.username,
        comments.text
        FROM comments
        JOIN users ON comments.user_id = users.id
        JOIN pictures ON comments.user_id = pictures.user_id
        WHERE comments.post_id = $1
        ORDER BY comments.id
    `,
        [post_id]
    );
}

export async function insertCommentByPostId(post_id, user_id, text) {
    return connection.query(
        `
        INSERT INTO comments (post_id, user_id, text)
        VALUES ( $1, $2, $3)
    `,
        [post_id, user_id, text]
    );
}
