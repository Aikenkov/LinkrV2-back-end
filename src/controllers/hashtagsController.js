import { STATUS_CODE } from "../enums/statusCode.js";
import { getTrending } from "../repositories/hashtagsRepository.js";

export async function getHashtagsTrending(req, res){
    try{
        const trending = await getTrending();
        return res.status(STATUS_CODE.OK).send(trending.rows);
    } catch(err){
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}