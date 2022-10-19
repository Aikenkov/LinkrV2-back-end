import connection from "../database/database";

async function getSessionByToken(token) {
  return connection.query(`SELECT * FROM sessions WHERE token=$1;`, [token])
    .rows[0];
}

export { getSessionByToken };
