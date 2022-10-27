
import { STATUS_CODE } from "../enums/statusCode.js";
import { deleteFollowUser, postFollowUsers,postValidateFollow,verifyfollow } from "../repositories/followRepository.js";

export async function postFollow(req,res){

    try {
        const idSeguido = req.body.id;

        const user = res.locals.user;

        if(idSeguido === user){
            return res.status(STATUS_CODE.UNAUTHORIZED).send('Impossível seguir a si mesmo')
        }
        const verifyUser = await postValidateFollow(idSeguido);
        
        if(verifyUser.rows.length === 0){
            return res.status(STATUS_CODE.NOT_FOUND).send('Usuário não existe')
        }

        const verifyUserfollow = await verifyfollow(idSeguido,user);
        if(verifyUserfollow.rows.length !== 0){
            return res.status(STATUS_CODE.UNAUTHORIZED).send('Já se seguem')
        }
         await postFollowUsers(idSeguido,user)
        return res.status(STATUS_CODE.OK).send({seguido: idSeguido, seguidor: user})

        
    } catch (error) {
        return res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}
export async function deleteFollow (req,res){

    const  idSeguido  = req.body.id;
    const user = res.locals.user;

    try {
       await deleteFollowUser(idSeguido,user)
      return res.status(STATUS_CODE.OK).send('Deixou de seguir')
    } catch (error) {
        return res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}
 export async function isFollowing(req,res){
try {
    const idSeguido = req.params.id;
    const user = res.locals.user;

    const verifyUserfollow = await verifyfollow(idSeguido,user)

    if(verifyUserfollow.rows.length !== 0){
        return res.status(STATUS_CODE.OK).send(verifyUserfollow.rows)
    }
} catch (error) {
    
    return res.sendStatus(STATUS_CODE.SERVER_ERROR)
}
 }