import psql from "../database/database.js";

const connection = psql();

const getPostsByUserId = async (req,res) => {
    try{
        const { id } = req.params;
        const users = await connection.query(`SELECT pictures.picture_uri, posts.id, users.username, posts.text, posts.link, users.username 
        FROM posts JOIN users ON posts.user_id=users.id 
        JOIN pictures ON pictures.user_id = users.id
        WHERE users.id = $1;`, [id]);
        console.log(id);
        res.status(200).send(users.rows);
    }catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}

export { getPostsByUserId };