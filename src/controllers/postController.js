import { STATUS_CODE } from "../enums/statusCode.js";
import {
    getHashtag,
    getLastsHashtags,
    insertHashtags,
    insertHashtagsPosts,
} from "../repositories/hashtagsRepository.js";
import { getLastsPosts, getPostById, getSharedPostByPostAndUserId, getSharesByPost, insertPost, shareUserPost } from "../repositories/postsRepository.js";

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

export async function sharePost(req, res){
    try{
        const {post_id} = req.params;
        const post = await getPostById(post_id);
        console.log(post_id,res.locals.user);
        if(post.rows.length === 0){
            return res.sendStatus(404);
        }
        const verifyRepost = await getSharedPostByPostAndUserId(post_id,res.locals.user);
        console.log(verifyRepost.rows);
        if(verifyRepost.rows.length !== 0){
            return res.sendStatus(422);
        }
        await shareUserPost(post_id,res.locals.user);
        return res.sendStatus(200);
    } catch (err){
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function getSharesNumber(req,res){
    try{
        const {post_id} = req.params;
        const shares = await getSharesByPost(post_id);
        if(shares.rows.length === 0){
            return res.status(200).send({post_id, shares:0});
        }
        res.status(200).send(shares.rows[0]);
    }catch (err){
        console.log(err);
        return res.sendStatus(500);
    }
}