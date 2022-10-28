import { STATUS_CODE } from "../enums/statusCode.js";
import {
  getLastsPosts,
  getPostsByUserId,
  deletePostById,
  getPostById,
  editPostById,
  deletePostHashtagById,
  deleteLikesByPostId,
  getSharedPosts,
  deleteShareById,
  getSharedPostsByUserId,
} from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";
import orderArray from "../helpers/orderHelper.js";
import { getFollowedUsers } from "../repositories/followRepository.js";
import arrayFilter from "../helpers/filterHelper.js";

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
    const sharedPosts = await getSharedPosts();
    const following = await getFollowedUsers(res.locals.user);
    console.log(res.locals.user);
    const orderedArray = orderArray([...timeline.rows, ...sharedPosts.rows]);
    const filteredArray = arrayFilter(orderedArray, following.rows, res.locals.user);
    return res.status(STATUS_CODE.OK).send(filteredArray);
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export async function getUserPosts(req, res) {
  try {
    const { id } = req.params;
    const users = await getPostsByUserId(id);
    const sharedUserPosts = await getSharedPostsByUserId(id);
    return res.status(STATUS_CODE.OK).send(orderArray([...users.rows, ...sharedUserPosts.rows]));
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

    await deleteShareById(id);
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
