import { getSessionByToken } from "../repositories/sessions.repository";
import { STATUS_CODE } from "../enums/statusCode";

export async function validateToken(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  let session;

  try {
    if (token) {
      session = await getSessionByToken(token);
    }

    if (!token || !session) {
      return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    res.locals.user = session.user_id;

    return next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}
