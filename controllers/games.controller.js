let games = require('../data/games.json');
const fs = require('fs');

//get all games
const getAllGames = (req, res) => {
    console.log(`Masuk endpoint games`);
    res.status(200).json({
        status:`sucess`, 
        data: games,
    });
}
// get specific game id
const getGameById = (req, res) => {
    console.log(`Masuk endpoint getGameByid`)

    let foundGame;
    console.log(games.length)
    for(let i = 0; i < games.length; i++){
        if(games[i].id === +req.params.id){
            // console.log(games[i])
            foundGame = games[i]
            i = games.length - 1
        }
    }
    
    if(!foundGame) throw new Error(`Game dengan id ${req.params.id} tidak ditemukan`)
    
    res.status(200).json({
        status: `Succes`,
        name: foundGame.name,
        price: foundGame.price,
        platform: foundGame.platform,
    });
}
// create new games
const createGame = (req, res) => {
    const { name, game_code, price, platform } = req.body;

    const gameData = {
        id: games[games.length - 1].id + 1,
        name: name,
        game_code: game_code,
        price: price,
        platform: platform
    }

    //push games local variables with gameData
    games.push(gameData)
    console.log(games);

    //write the games local variables to games.json file
    fs.writeFile('./data/games.json', JSON.stringify(games), 'utf-8', (err, data) =>{
        if (err) throw new Error(err)
        res.status(200).json({
            status: `Sukses Masukin`,
            data: gameData
        })
    })
}
// update an existing games
const updateGameById = (req, res) => {
    const { name, game_code, price, platform } = req.body;
    let index;

    //get index of games
    for(let i = 0; i < games.length; i++){
        if(games[i].id === +req.params.id){
            index = games[i].id
            i = games.length -1
        }
    }
    //update games list on local variables
    games[index-1] = {
        id: index,
        name: name,
        game_code: game_code,
        price: price,
        platform: platform
    }

    if (!index) throw new Error(`Game dengan id ${req.params.id} tidak ditemukan`)
    // write into local files named games.json
    fs.writeFile('./data/games.json', JSON.stringify(games), 'utf-8', (err, data) => {
        // if (err) throw new Error(err);
        res.status(200).json({
            status: 'Success',
            data: games[index-1]
        })
    })

    // console.log(games)
    // console.log(gameData)
    // console.log(index)
}

const deleteGameById = (req, res) => {
    let index;

    //get index of games
    for(let i = 0; i < games.length; i++){
        if(games[i].id === +req.params.id){
            index = games[i].id
            i = games.length -1
        }
    }
    games = games.filter(function(item, i, arr) {
        return item.id !== index
    });

    console.log(games)
    if (!index) throw new Error(`Game dengan id ${req.params.id} tidak ditemukan`)
    // write into local files named games.json
    fs.writeFile('./data/games.json', JSON.stringify(games), 'utf-8', (err, data) => {
        // if (err) throw new Error(err);
        res.status(200).json({
            status: 'Success',
            data: games
        })
    })

}

module.exports = {
    getAllGames,
    getGameById,
    createGame,
    updateGameById,
    deleteGameById,
};