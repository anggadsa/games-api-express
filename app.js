require('dotenv').config();
const express = require(`express`);
const morgan = require('morgan');
const games = require(`./data/games.json`);
const fs = require('fs');
const router = require(`./router/index.router`);

const app = express();
const port = process.env.PORT;

const gambar = fs.readFileSync(`./public/`, `utf-8`)
console.log(gambar);

app.use(`/static/cd-games/`, express.static(`public`))

//parsing json format
app.use(express.json())
app.use(express.urlencoded( { extended : true } ))

//Morgan for logging every request
app.use(morgan('dev'));

//Router
app.use(`${process.env.BASE_URL}`,router);

//create new games into postgresql done

//read games on postgresql done

//update existing into postgresql done

//delete existing games done done

app.listen(port, () => {
    console.log(`Halo, saya bernama server, saya mendengarkan di port ${port}`)
})