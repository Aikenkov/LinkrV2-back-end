import connection from "../database/database.js";

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
