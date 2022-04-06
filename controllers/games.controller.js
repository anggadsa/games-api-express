let games = require('../data/games.json');
const fs = require('fs');
const db = require(`../database/connection`)
const dateString = require(`../database/date`)

//get all games
const getAllGames = async (req, res) => {
    try{
        // console.log(req.query.page)
        // return
        let { page, row } = req.query;
        page = ((req.query.page - 1))
        const viewAllGames = await db.query(`SELECT * FROM games LIMIT ${row} OFFSET ${page}`)
            console.log(`Masuk endpoint view all games`);

            res.status(200).json({
                status:`sucess`, 
                result :{
                    rows: viewAllGames.rowCount,
                    data: viewAllGames.rows
                }
            });
        //View all games.json
        // console.log(games)
    }
    catch (error) {
        console.log(error)
    }
}

// get specific game id
const getGameById = async (req, res) => {
    console.log(`Masuk endpoint getGameByid`)
    // Read from Database
    let id = req.params.id
    try{
        const viewById = await db.query(`SELECT * FROM games WHERE id = ${id}`);
        res.status(200).json({
            status: `Succes`,
            result: viewById.rows[0]
        });

    } catch (error) {
        console.log(error)
    }
    
    return // This used to break the code below
    // END read from database

    // Read From Games.json
    /**
    let foundGame;
    for(let i = 0; i < games.length; i++){
        if(games[i].id === +req.params.id){
            // console.log(games[i])
            foundGame = games[i]
            i = games.length - 1
        }
    
    }
    // Uncomment bellow if you want to try read from games.json

    if(!foundGame) throw new Error(`Game dengan id ${req.params.id} tidak ditemukan`)
    
    res.status(200).json({
        status: `Succes`,
        name: foundGame.name,
        price: foundGame.price,
        platform: foundGame.platform,
    });
    */
    // END read From Games.json


}

// create new games
const createGame = async (req, res) => {
    const { name, game_code, price, platform } = req.body;
    // CREATE new games entities to database
    try{
        const createGames = await db.query(`INSERT INTO
        games (name, game_code, price, platform, ts)
        VALUES
        ('${name}', '${game_code}', ${price}, '${platform}', '${dateString}')`);
     
        res.status(201).json({
            status: `Success create new games`,
            result: req.body
        })
    } catch (error){
        console.log(error)
    }
    return 
    // END CREATE new games entities to database

    // CREATE games entities to games.json
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
        res.status(201).json({
            status: `Sukses Masukin`,
            data: gameData
        })
    })
    // END create games entities to games.json

}

// update an existing games
const updateGameById = async (req, res) => {
    const { name, game_code, price, platform } = req.body;
    const id = req.params.id

    try {
        const updateGames = await db.query(`UPDATE games
        SET 
        name = '${name}',
        game_code = '${game_code}', 
        price = ${price},
        platform  = '${platform}',
        ts = '${dateString}'
        WHERE id = ${id};
        `)

        res.status(200).json({
            status: 'Success Update',
            result: req.body
        })
    } catch (error) {
        console.log(error)
    }
    return
    // UPDATE game from games.json
    let index;
    //get index of games
    for(let i = 0; i < games.length; i++){
        if(games[i].id === +req.params.id){
            index = i
            i = games.length -1
        }

    }
   
    // update games list on local variables
    games[index] = {
        id: +req.params.id,
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
            data: games[index]
        })
    })
    // END update game from games.json
    
    // console.log(games)
    // console.log(gameData)
    // console.log(index)
}

//delete games by id
const deleteGameById = async (req, res) => {
    const id = req.params.id
    // DELETE games data from database
    try {
        const deleteGames = await db.query(`DELETE FROM games
        WHERE id = ${id};`)
        res.status(200).json({
            status: `Success delete by id ${id}`,
        })
    } catch(error) {
        console.log(error.stack)
    }
    return
    // END delete data from db

    //DELETE data from games.json
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
            status: `Success delete by id ${index}`,
            data: games
        })
    })
    // END delete data from games.json
}

module.exports = {
    getAllGames,
    getGameById,
    createGame,
    updateGameById,
    deleteGameById,
};