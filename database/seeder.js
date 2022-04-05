require(`dotenv`).config();

const { query } = require('express');
const { Pool } = require('pg');
const games = require(`../data/games.json`);

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

// Initate Timestamp
const currentDate = new Date();

const currentDayOfMonth = currentDate.getDate();
const currentMonth = currentDate.getMonth(); // January is 0, not 1
const currentYear = currentDate.getFullYear();
const currentHour = currentDate.getHours();
const currentMinute =  currentDate.getMinutes();
const currentSecond =  currentDate.getSeconds();

const dateString = currentYear + "-" + (currentMonth + 1) + "-" + currentDayOfMonth + " " + currentHour + ":" + currentMinute + ":" + currentSecond;
// "2022-4-4 19:29:37"
// console.log(dateString)

// INSERT/IMPORT data from games.json to database 
let queryValue = `INSERT INTO
games (name, game_code, price, platform, ts)
VALUES`

// INSERT DATA test
let queryTest = `INSERT INTO
games (name, game_code, price, platform, ts)
VALUES
('MOBILE LEGEND', 'MLBB', 0, 'MOBILE', '${dateString}')`

// INSERT VALUES into queryValue
games.forEach(function(currentValue, index, arr) {
    if(index !== games.length - 1){
        console.log(currentValue.id)
        queryValue += `('${currentValue.name}', '${currentValue.game_code}', ${currentValue.price}, '${currentValue.platform}', '${dateString}'),`
    }else {
        queryValue += `('${currentValue.name}', '${currentValue.game_code}', ${currentValue.price}, '${currentValue.platform}', '${dateString}');`
    }
})

// querying data into table
pool
    .query(queryValue)
    .then((res) =>{
        console.log(res)
        pool.end
    })
    .catch((err) =>{
        console.log(err)
    })
