import { STATUS_CODE } from "../enums/statusCode.js";
import {
  getLastsPosts,
  getPostsByUserId,
  deletePostById,
  getPostById,
  editPostById,
  deletePostHashtagById,
  deleteLikesByPostId,
} from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";

export async function getMetadata(req, res) {
  const { url } = req.body;

  let urlInfos;

  try {
    await urlMetadata(url).then(
      function (metadata) {
        urlInfos = {
          title: metadata.title,
          description: metadata.description,
          link: metadata.url,
          image: metadata.image,
        };
      },
      function (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
      }
    );

    return res.status(STATUS_CODE.CREATED).send(urlInfos);
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export async function getTimeline(req, res) {
  try {
    const timeline = await getLastsPosts();

    const posts = timeline.rows;

    return res.status(STATUS_CODE.OK).send(posts);
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export async function getUserPosts(req, res) {
  try {
    const { id } = req.params;
    const users = await getPostsByUserId(id);
    return res.status(STATUS_CODE.OK).send(users.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
  try {
    const { id } = req.params;
    const users = await getPostsByUserId(id);
    return res.status(STATUS_CODE.OK).send(users.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const post = (await getPostById(id)).rows[0];

    if (!post) {
      return res.sendStatus(STATUS_CODE.NOT_FOUND);
    }

    if (post.user_id !== user) {
      return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    await deletePostHashtagById(id);
    await deleteLikesByPostId(id);
    await deletePostById(id);

    return res.sendStatus(STATUS_CODE.NO_CONTENT);
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export async function editPost(req, res) {
  const { id } = req.params;
  const { text } = req.body;
  const { user } = res.locals;
  console.log(id);

  try {
    const post = (await getPostById(id)).rows[0];
    
    if (!post) {
      return res.sendStatus(STATUS_CODE.NOT_FOUND);
    }

    if (post.user_id !== user) {
      return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    await editPostById(text, id);

    return res.sendStatus(STATUS_CODE.CREATED);
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}
