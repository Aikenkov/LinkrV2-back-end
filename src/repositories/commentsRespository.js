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
    `,
        [post_id]
    );
}
