import connection from "../database/database.js";

async function getSessionByToken(token) {
  return connection.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);
}

export { getSessionByToken };
