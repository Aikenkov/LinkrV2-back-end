import connection from "../database/database.js";

export async function getLastsPosts() {
  return connection.query(
    `
    SELECT
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
    GROUP BY users.username, pictures.picture_uri, posts.text, posts.link, posts.created_at
    ORDER BY posts.created_at DESC
    LIMIT 20;
  `
  );
}

export async function getPostsByUserId(id){
  return connection.query(`
  SELECT
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
  WHERE users.id=$1
  GROUP BY users.username, pictures.picture_uri, posts.text, posts.link, posts.created_at
  ORDER BY posts.created_at DESC
  LIMIT 20;
  `,[id]);
}