import { STATUS_CODE } from "../enums/statusCode.js";
import { getTrending } from "../repositories/hashtagsRepository.js";
import { getPostsByTag } from "../repositories/hashtagsRepository.js";

export async function getHashtagsTrending(req, res) {
    try {
        const trending = await getTrending();
        return res.status(STATUS_CODE.OK).send(trending.rows);
    } catch (err) {
        console.log(err);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function getPostsByHashtag(req, res) {
    try {
        const { hashtag } = req.params;
        console.log(hashtag);
        const posts = await getPostsByTag(hashtag);
        return res.status(200).send(posts.rows);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
