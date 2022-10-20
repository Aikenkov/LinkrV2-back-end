import { STATUS_CODE } from "../enums/statusCode.js";
import { insertPost } from "../repositories/posts.repository.js";

export async function publishPost(req, res) {
    const { text, link } = req.body;

    const hesh = "Eu gosto de #bolo e #leite".split(" ");

    const tags = hesh.filter((word) => {
        return word[0] === "#";
    });

    console.log(tags);

    try {
        return res.status(STATUS_CODE.OK).send("ok");
    } catch (err) {
        console.error(err);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}
