import { STATUS_CODE } from "../enums/statusCode.js";
import { getLastsPosts } from "../repositories/postsRepository.js";
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
