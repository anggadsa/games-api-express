require('dotenv').config();
const express = require(`express`);
// const req = require('express/lib/request');
// const res = require('express/lib/response');
const morgan = require('morgan')
const games = require(`./data/games.json`);
const bodyParser= require('body-parser')
const fs = require('fs');
const router = require(`./router/games.route`)

const app = express();
const port = process.env.PORT;

//parsing json format
app.use(express.json())
app.use(express.urlencoded( { extended : true } ))

//Morgan for logging every request
app.use(morgan('dev'));

// middleware test
app.use(`/`, (req, res, next) => {
    console.log(`Masuk middleware test`)
    next();
});

//Router
app.use(router);

//create new games done

// update existing games done 

//delete existing games ?

app.listen(port, () => {
    console.log(`Halo, saya bernama server, saya mendengarkan di port ${port}`)
})