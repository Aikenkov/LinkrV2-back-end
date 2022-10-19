import { STATUS_CODE } from "../enums/statusCode";

export async function getTimeline(req, res) {
  try {
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}
