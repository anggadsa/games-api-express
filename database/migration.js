require(`dotenv`).config();

const { Pool } = require('pg');

let pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

// SET TIMEZONE='Asia/Bangkok';
;(async () => {
    const queryDb = await pool.query(`CREATE DATABASE ${process.env.PG_DATABASE}`)
    try {
    pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
    })
    const res = await pool.query(`CREATE TABLE games (
        id serial PRIMARY KEY,
        name VARCHAR ( 255 ) NOT NULL,
        game_code VARCHAR ( 50 ) UNIQUE NOT NULL,
        price integer NOT NULL,
        platform VARCHAR ( 100 ),
        ts TIMESTAMP NOT NULL
    );`)
      console.log(res)
    } finally {
      // Make sure to release the client before any error handling,
      // just in case the error handling itself throws an error.
      pool.end()
    }
})().catch(err => console.log(err.stack))

