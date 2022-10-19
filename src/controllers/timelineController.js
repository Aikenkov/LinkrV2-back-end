import { STATUS_CODE } from "../enums/statusCode.js";
import { getLastsPosts, getPostsByUserId } from "../repositories/posts.repository.js";

export async function getTimeline(req, res) {
  try {
    const timeline = await getLastsPosts();

    const posts = {
      posts: [timeline.rows],
    };

    return res.status(STATUS_CODE.OK).send(posts);
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export async function getUserPosts(req,res) {
  try{
      const { id } = req.params;
      const users = await getPostsByUserId(id);
      return res.status(STATUS_CODE.OK).send(users.rows);
  }catch (err){
      console.log(err);
      res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}
