import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function getUsers(req,res){

    try {
        const usernameRegistered = req.query.name;

        if(usernameRegistered){

        const registeredUsers = await connection.query(`
            SELECT users.username, pictures.picture_uri FROM 
                users 
            JOIN 
                pictures
            ON 
                users.id = pictures.user_id
            WHERE 
                    lower(username)
            LIKE 
                lower($1);
        `,[`%${usernameRegistered}%`]
        );


        return res.status(STATUS_CODE.OK).send(registeredUsers.rows)
    }else{ 
        return res.status(STATUS_CODE.NOT_FOUND).send('usuário não encontrado')
    }

    } catch (error) {
        return res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}