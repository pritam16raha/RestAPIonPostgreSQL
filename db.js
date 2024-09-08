import { Pool } from 'pg';

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "pritamdb",
    password: "9749215498",
    port: 5434,
});

export default pool;