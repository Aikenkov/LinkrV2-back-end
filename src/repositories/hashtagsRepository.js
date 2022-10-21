import connection from "../database/database.js";

export async function getTrending(){
    return connection.query(`SELECT
     hashtags.tag, hashtags.id, COUNT(hashtags.id) AS visits
     FROM posts_hashtags 
     JOIN posts ON posts.id=posts_hashtags.post_id
     JOIN hashtags ON hashtags.id=posts_hashtags.hastag_id 
     GROUP BY hashtags.tag,hashtags.id
     ORDER BY visits DESC;`);
}