import { STATUS_CODE } from "../enums/statusCode.js";
import {
    getHashtag,
    getLastsHashtags,
    insertHashtags,
    insertHashtagsPosts,
} from "../repositories/hashtagsRepository.js";
import { getLastsPosts, insertPost } from "../repositories/postsRepository.js";

export async function publishPost(req, res) {
    const { text, link } = req.body;
    const id = res.locals.user;

    const tagsArr = text.split(" ");

    const tags = tagsArr.filter((word) => {
        return word[0] === "#";
    });

    try {
        await insertPost(text, link, id);
        const lastpost = (await getLastsPosts()).rows[0];

        await tags.forEach(async (tag) => {
            const tagid = await getHashtag(tag.replace("#", ""));

            console.log(tag.replace("#", ""));

            if (tagid.rowCount > 0) {
                insertHashtagsPosts(tagid.rows[0].id, lastpost.id);
            } else {
                insertHashtags(tag.replace("#", ""));
                const lasttag = (await getLastsHashtags()).rows[0];
                insertHashtagsPosts(lasttag.id, lastpost.id);
            }
        });

        return res.status(STATUS_CODE.CREATED).send("created");
    } catch (err) {
        console.error(err);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}
