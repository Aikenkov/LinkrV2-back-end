import connection from "../database/database.js";

export async function getLikesByPostId(post_id) {
  return connection.query(
    `
        SELECT 
        likes.user_id,
        users.username
        FROM likes
        JOIN users ON likes.user_id = users.id
        WHERE likes.post_id = $1
    `,
    [post_id]
  );
}

export async function insertLikeByPostId(post_id, user_id) {
  await connection.query(
    `
        INSERT INTO likes (post_id, user_id) 
        VALUES ($1, $2)
    `,
    [post_id, user_id]
  );
}

export async function removeUserLike(post_id, user_id) {
  await connection.query(
    `
        DELETE FROM likes WHERE post_id = $1 AND user_id = $2
    `,
    [post_id, user_id]
  );
}
