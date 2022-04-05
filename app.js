require('dotenv').config();
const express = require(`express`);
const morgan = require('morgan');
const games = require(`./data/games.json`);
const fs = require('fs');
const router = require(`./router/index.router`);

const app = express();
const port = process.env.PORT;

//parsing json format
app.use(express.json())
app.use(express.urlencoded( { extended : true } ))

//Morgan for logging every request
app.use(morgan('dev'));

// middleware test
// app.use(`/`, (req, res, next) => {
//     console.log(`Masuk middleware test`)
//     next();
// });

//Router
app.use(`${process.env.BASE_URL}`,router);

//create new games into postgresql ?

//read games on postgresql ?

//update existing into postgresql ? 

//delete existing games done ?

app.listen(port, () => {
    console.log(`Halo, saya bernama server, saya mendengarkan di port ${port}`)
})