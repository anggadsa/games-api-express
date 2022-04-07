let games = require('../data/games.json');
const fs = require('fs');
const { user_game } = require('../models');
const { user_game_biodata } = require(`../models/user_game_biodata`)
//get all username

const getAllUsers = async (req, res) => {
    try{
        console.log(`Masuk endpoint getAllUsers`)
        let { page, row } = req.query;
        page = ((req.query.page - 1))

        const options = {
            attributes: ['username'], //just viewing username
            offset: page,
            limit: row,
        }

        const allUsers = await user_game.findAll(options);
            res.status(200).json({
                status:`Success`, 
                result : allUsers
            });
    }
    catch (error) {
        console.log(error)
    }
}

// get specific user by id
const getUserByid = async (req, res) => {
    console.log(`Masuk endpoint getGameByid`)
    // Read from Database
    let id = req.params.id
    try{
        const findUserById = await user_game.findByPk(req.params.id);
        res.status(200).json({
            status: `Success`,
            result: {
                username: findUserById.username,
                account_created: findUserById.createdAt
            }
        });

    } catch (error) {
        console.log(error)
    }
}

// create new user
const createUser = async (req, res) => {
    console.log(`Masuk endpoint createUser`)
    const { username, password } = req.body;
    // CREATE new games entities to database
    try{
        const insertNewUser = await user_game.create({ 
            username: username, 
            password: password,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        res.status(201).json({
            status: `Success create new user`,
            result: insertNewUser
        })
    } catch (error){
        console.log(error)
        res.status(400).json({
            status:`Username already exists`,
            result: req.body.username
        })
    }
}

// update an existing user password
const updateUser = async (req, res) => {
    console.log(`Masuk endpoint updateUser`)
    const { oldPassword, newPassword } = req.body;
    const { username } = req.query
    try {
        const updatePassword = await user_game.update(
            { password: newPassword },
            {
              where: {
                password: oldPassword,
              },
            }
        );
        res.status(200).json({
            status: 'Success change password',
            result: {
                Username: username
            }
        })
    } catch (error) {
        console.log(error)
        
    }
}

//delete games by id
const deleteUser = async (req, res) => {
    const { deleteUser } = req.body
    // DELETE user data from database

    try {
        const deleteByUsername = await user_game.destroy({
            where: {
              username: deleteUser
            }
        });
        if(deleteByUsername < 1) res.status(400).send(`Username is not exist`)
        res.status(200).json({
            status: `Success delete ${deleteUser}`,
        })
    } catch(error) {
        console.log(error.stack)
    }
}

module.exports = {
    getAllUsers,
    getUserByid,
    createUser,
    updateUser,
    deleteUser,
};