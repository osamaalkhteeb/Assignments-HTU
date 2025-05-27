import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: true }
      : false,
});

//just to check the connection
pool.connect().then(() => {
  console.log("Database is connected");
});

// the ' => ' is like makin a function called ' query '
export const query = (text, params) => pool.query(text, params);
export default pool;
