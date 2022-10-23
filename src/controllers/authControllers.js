import bcrypt from "bcrypt";
import connection from "../database/database.js";
import { v4 as uuid } from "uuid";
import { STATUS_CODE } from "../enums/statusCode.js";
import {
    getUserByEmail,
    getUserImageById,
    insertUser,
    insertUserId,
    insertUserImage,
    insertUsername,
    insertUserSession,
} from "../repositories/authRepository.js";

export async function postSignUp(req, res) {
    try {
        const { email, password, username, url } = req.body;
        const registerUser = await insertUser(email);

        if (registerUser.rows.length != 0) {
            return res
                .status(STATUS_CODE.CONFLICT)
                .send("Este email já está sendo utilizado!");
        }

        const registerUsername = await insertUsername(username);

        if (registerUsername.rows.length != 0) {
            return res
                .status(STATUS_CODE.CONFLICT)
                .send("Este username já está sendo utilizado!");
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        console.log("entrando no insert");
        const newUserId = await insertUserId(username, email, passwordHash);

        await insertUserImage(url, newUserId.rows[0].id);

        return res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function postSignIn(req, res) {
    try {
        const { email, password } = req.body;
        const verifyUser = await getUserByEmail(email);

        const validUser = verifyUser.rows[0];
        if (verifyUser.rows.length === 0) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }
        const userImage = await getUserImageById(validUser.id);

        const passwordValid = bcrypt.compareSync(password, validUser.password);

        if (verifyUser.rows.length != 0 && passwordValid) {
            const token = uuid();
            await insertUserSession(validUser.id, token);

            return res.status(STATUS_CODE.OK).send({
                token: token,
                username: validUser.username,
                url: userImage.rows[0].picture_uri,
            });
        } else {
            return res
                .status(STATUS_CODE.UNAUTHORIZED)
                .send("email ou senha inválidos");
        }
    } catch (error) {
        return res.sendStatus(500);
    }
}
