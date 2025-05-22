import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config() //loads the .env file


const {Pool} = pg;

const pool = new Pool({
connectionString:process.env.DATABASE_URL
});


export default pool;