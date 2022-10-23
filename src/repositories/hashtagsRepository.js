import connection from "../database/database.js";

export async function getTrending() {
    return connection.query(`SELECT
     hashtags.tag, hashtags.id, COUNT(hashtags.id) AS visits
     FROM posts_hashtags 
     JOIN posts ON posts.id=posts_hashtags.post_id
     JOIN hashtags ON hashtags.id=posts_hashtags.hashtag_id 
     GROUP BY hashtags.tag,hashtags.id
     ORDER BY visits DESC;`);
}

export async function insertHashtags(tag) {
    await connection.query(
        `
    INSERT INTO hashtags (tag) VALUES ($1)
    `,
        [tag]
    );
}

export async function getLastsHashtags() {
    return await connection.query(
        `
    SELECT * FROM hashtags ORDER BY id DESC LIMIT 10
    
    `
    );
}

export async function getHashtag(tag) {
    return await connection.query(
        `
    SELECT * FROM hashtags WHERE tag = $1
    
    `,
        [tag]
    );
}

export async function insertHashtagsPosts(hashtag_id, post_id) {
    await connection.query(
        `
    INSERT INTO posts_hashtags (post_id, hashtag_id) VALUES ($1, $2)
    `,
        [post_id, hashtag_id]
    );
}

export async function getPostsByTag(tag) {
    return connection.query(
        `
    SELECT posts.text, posts.id, posts.link, users.username, posts.user_id, pictures.picture_uri AS picture, posts.created_at AS time
    FROM posts 
    JOIN posts_hashtags ON posts_hashtags.post_id = posts.id 
    JOIN hashtags ON hashtags.id = posts_hashtags.hashtag_id
    JOIN users ON users.id = posts.user_id
    JOIN pictures ON pictures.user_id = users.id
    WHERE hashtags.tag = $1
    GROUP BY posts.id,users.id,pictures.picture_uri,posts.link, posts.created_at, posts.user_id`,
        [tag]
    );
}
