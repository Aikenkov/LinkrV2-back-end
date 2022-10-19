import { STATUS_CODE } from "../enums/statusCode.js";
import { getLastsPosts } from "../repositories/posts.repository.js";

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
