import { STATUS_CODE } from "../enums/statusCode.js";
import { getUser } from "../repositories/usersRepository.js";

const getUserById = async (req,res) => {
    try{
        const { id } = req.params;
        const user = await getUser(id);
        if(user.rows.length === 0){
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }
        return res.status(STATUS_CODE.OK).send(user.rows[0]);
    }catch (err){
        console.log(err);
        return res.sendStatus(500);
    }
}

export { getUserById };