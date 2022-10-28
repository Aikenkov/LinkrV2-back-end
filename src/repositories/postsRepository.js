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
  posts.id,
  pictures.picture_uri AS picture,
  posts.text,
  posts.user_id, 
  posts.link,
  posts.created_at AS time
  FROM posts 
  JOIN users 
    ON posts.user_id = users.id 
  JOIN pictures 
    ON pictures.user_id = users.id
  WHERE users.id=$1
  GROUP BY users.username, pictures.picture_uri, posts.id, posts.text, posts.link, posts.created_at, posts.user_id
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

export async function deleteLikesByPostId(id) {
  return connection.query(`DELETE FROM likes WHERE post_id=$1;`, [id]);
}

export async function getSharedPosts(){
  return connection.query(`
  SELECT
    posts.id,
    posts.user_id,
    "u1".username,
    pictures.picture_uri AS picture,
    posts.text, 
    posts.link,
    shares.created_at AS time,
    "u2".username AS sharer
  FROM posts 
  JOIN users "u1"
    ON posts.user_id = "u1".id
  JOIN shares 
    ON shares.post_id = posts.id
  JOIN users "u2"
    ON shares.user_id = "u2".id
  JOIN pictures 
    ON pictures.user_id = u1.id
  GROUP BY posts.id, "u1".username, pictures.picture_uri, posts.text, posts.link, shares.created_at, "u2".username
  ORDER BY posts.id DESC
  LIMIT 20;
`)
}

export async function shareUserPost(post_id, user_id){
  return connection.query(`INSERT INTO shares (post_id, user_id) VALUES ($1,$2)`, [post_id,user_id]);
}

export async function getSharesByPost(post_id){
  return connection.query(`
  SELECT post_id, COUNT(post_id) AS shares
  FROM shares
  WHERE post_id=$1
  GROUP BY post_id;
`,[post_id]);
}

export async function deleteShareById(post_id){
  return connection.query(`DELETE FROM shares WHERE post_id=$1`, [post_id])
}