import { Pool } from "pg";
import "dotenv/config"


const db = new Pool ({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
});

export default db;