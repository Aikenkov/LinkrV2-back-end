import connection from "../database/database.js";

export async function getLastsPosts() {
  return connection.query(
    `
    SELECT
      posts.id,
      users.username,
      pictures.picture_uri AS picture,
      posts.text, 
      posts.link,
      posts.created_at AS time
    FROM posts 
    JOIN users 
      ON posts.user_id = users.id 
    JOIN pictures 
      ON pictures.user_id = users.id
    GROUP BY posts.id,users.username, pictures.picture_uri, posts.text, posts.link, posts.created_at
    ORDER BY posts.created_at DESC
    LIMIT 20;
  `
  );
}
