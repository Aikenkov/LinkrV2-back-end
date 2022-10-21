import { STATUS_CODE } from "../enums/statusCode.js";
import {
    getLikesByPostId,
    insertLikeByPostId,
    removeUserLike,
} from "../repositories/likesRepository.js";

export async function getPostLikes(req, res) {
    const { post_id } = req.params;

    if (!post_id) {
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
    }

    try {
        const likes = await getLikesByPostId(post_id);
        return res.status(STATUS_CODE.OK).send(likes.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function insertLike(req, res) {
    const user_id = res.locals.user;
    const { post_id } = req.params;

    if (!post_id) {
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
    }

    try {
        await insertLikeByPostId(post_id, user_id);
        return res.status(STATUS_CODE.CREATED).send("ok");
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function removeLike(req, res) {
    const user_id = res.locals.user;
    const { post_id } = req.params;

    if (!post_id) {
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
    }

    try {
        await removeUserLike(post_id, user_id);
        return res.status(STATUS_CODE.OK).send("unliked");
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}
