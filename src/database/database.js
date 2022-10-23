import dotenv from "dotenv";
import pg from "pg";

const { Pool } = pg;

dotenv.config();

// const databaseConfig = {
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false,
//     },
// };

// const connection = new Pool(databaseConfig);

const connection = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: process.env.PASSWORD,
  database: "testlinkr",
});

export default connection;
