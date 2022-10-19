import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import {v4 as uuid} from "uuid";
import { STATUS_CODE } from '../enums/statusCode.js';

export async function postSignUp(req,res){
    try {
        const {email, password, username, url} = req.body
        const registerUser = await connection.query(`
            SELECT * FROM 
                users
            WHERE
                email=$1;

        `,[email])

        if(registerUser.rows.length != 0){
            return res.status(STATUS_CODE.CONFLICT).send('Este email já está sendo utilizado!')
        }

        const registerUsername = await connection.query(`
            SELECT * FROM 
                users
            WHERE
                username=$1;
        `,[username])

        if(registerUsername.rows.length != 0){
            return res.status(STATUS_CODE.CONFLICT).send('Este username já está sendo utilizado!')
        }

        const passwordHash = bcrypt.hashSync(password,10);
        console.log('entrando no insert')
        const newUserId = await connection.query(`
            INSERT INTO 
                users(username, email, password)
            VALUES
                ($1, $2, $3)
            RETURNING id    
            ;
        `,[username,email,passwordHash]
        );
        
            await connection.query(`
                INSERT INTO 
                    pictures(picture_uri, user_id)
                VALUES 
                    ($1, $2);
            `,[url, newUserId.rows[0].id]
            );


        return res.sendStatus(STATUS_CODE.CREATED);


    } catch (error) {
        
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function postSignIn (req,res){
    try {
        const { email, password} = req.body;
    const verifyUser = await connection .query(`
        SELECT * FROM
            users
        WHERE 
            email=$1;
    `,[email]);

    const validUser = verifyUser.rows[0];
    if(verifyUser.rows.length === 0){
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
    }

    const passwordValid = bcrypt.compareSync(password,validUser.password);

   
    if(verifyUser.rows.length !=0 && passwordValid){
        const token= uuid();
        await connection.query(`
            INSERT INTO 
                sessions(user_id, token)
            VALUES 
                ($1,$2);
        `,[validUser.id, token]
        );
        return res.status(STATUS_CODE.OK).send({token:token, 
                                                username:validUser.username}
                                            );
    }else {
        return res.status(STATUS_CODE.UNAUTHORIZED).send('email ou senha inválidos')
    }

    } catch (error) {
        return res.sendStatus(500)
    }
    

    
}