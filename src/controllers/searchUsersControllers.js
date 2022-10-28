
import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { getSearchFollowed, getsearchUsers } from "../repositories/searchUsersRepository.js";

export async function getUsers(req,res){

    try {
        const usernameRegistered = req.query.name;
        const user = res.locals.user;

        if(usernameRegistered){

            const allUsersFound = await getsearchUsers(usernameRegistered);

            const followedUsers = await getSearchFollowed(user);
            
            let followedUsersId = [];

            followedUsers.rows.forEach((user) => {
                followedUsersId.push(user.followed);
            });

            let usersIFollow = [];
            let usersIDontFollow = [];

            allUsersFound.rows.forEach((userFound) => {
                if(followedUsersId.includes(userFound.id)){
                    userFound.type=' • following';
                    usersIFollow.push(userFound);
                }
                else{
                    usersIDontFollow.push(userFound);
                }
            });

            let joinedUsers = [...usersIFollow, ...usersIDontFollow];

            return res.status(STATUS_CODE.OK).send(joinedUsers);
        }

        else { 
            return res.status(STATUS_CODE.NOT_FOUND).send('usuário não encontrado')
        }

    } catch (error) {
        return res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

export async function getUsersFollow(req,res){

    try {
        const user = res.locals.user
        const idFollowed = await  getSearchFollowed(user)
        return res.status(STATUS_CODE.OK).send(idFollowed.rows)
        
    } catch (error) {
        return res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}