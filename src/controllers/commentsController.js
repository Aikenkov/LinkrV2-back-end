import { STATUS_CODE } from "../enums/statusCode.js";
import {
    getCommentsByPostId,
    insertCommentByPostId,
} from "../repositories/commentsRespository.js";

export async function getPostComments(req, res) {
    const { post_id } = req.params;

    if (!post_id) {
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
    }

    try {
        const comments = await getCommentsByPostId(post_id);
        return res.status(STATUS_CODE.OK).send(comments.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function insertComment(req, res) {
    const { post_id } = req.params;
    const user_id = res.locals.user;
    const { text } = req.body;

    if (!post_id) {
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
    }

    try {
        await insertCommentByPostId(post_id, user_id, text);
        return res.status(STATUS_CODE.OK).send(comments.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}
