import connection from "../database/database.js";

export async function getLastsPosts() {
  return connection.query(
    `
    SELECT
      posts.id,
      posts.user_id,
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
    GROUP BY posts.id, users.username, pictures.picture_uri, posts.text, posts.link, posts.created_at
    ORDER BY posts.id DESC
    LIMIT 20;
  `
  );
}

export async function insertPost(text, link, id) {
  return await connection.query(
    `
    INSERT INTO posts ("user_id", "text", "link") Values ($1, $2, $3)
    `,
    [id, text, link]
  );
}

export async function getPostsByUserId(id) {
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
  WHERE users.id=$1
  GROUP BY users.username, pictures.picture_uri, posts.text, posts.link, posts.created_at
  ORDER BY posts.created_at DESC
  LIMIT 20;
  `,
    [id]
  );
}

export async function getPostById(id) {
  return connection.query(`SELECT * FROM posts WHERE id=$1;`, [id]);
}

export async function deletePostById(id) {
  return connection.query(`DELETE FROM posts WHERE id=$1;`, [id]);
}

export async function deletePostHashtagById(id) {
  return connection.query(`DELETE FROM posts_hashtags WHERE post_id=$1;`, [id]);
}

export async function editPostById(text, id) {
  return connection.query(`UPDATE posts SET text=$1 WHERE id=$2;`, [text, id]);
}
