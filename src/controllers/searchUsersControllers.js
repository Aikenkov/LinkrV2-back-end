
import { STATUS_CODE } from "../enums/statusCode.js";
import { getsearchUsers } from "../repositories/searchUsersRepository.js";

export async function getUsers(req,res){

    try {
        const usernameRegistered = req.query.name;

        if(usernameRegistered){

        const registeredUsers = await getsearchUsers(usernameRegistered)

        return res.status(STATUS_CODE.OK).send(registeredUsers.rows)
    }else{ 
        return res.status(STATUS_CODE.NOT_FOUND).send('usuário não encontrado')
    }

    } catch (error) {
        return res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}