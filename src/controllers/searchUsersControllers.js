import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function getUsers(req,res){

    try {
            console.log('entrei no serach')
        const usernameRegistered = req.query.name;
        console.log(usernameRegistered, '****');
        if(usernameRegistered){
            console.log('entrei no if')
        const registeredUsers = await connection.query(`
            SELECT username FROM 
                users 
            WHERE 
                    lower(username)
            LIKE 
                lower($1);
        `,[`%${usernameRegistered}%`]
        );
        console.log(registeredUsers, '6465465')
        return res.status(STATUS_CODE.OK).send(registeredUsers.rows)
    }else{ 
        return res.status(STATUS_CODE.NOT_FOUND).send('usuário não encontrado')
    }

    } catch (error) {
        return res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}