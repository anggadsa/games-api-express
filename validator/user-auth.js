require('dotenv').config();
const { user_game } = require('../models');

const userAuth = async (req, res, next) => {
    const { username, password } = req.query

    if (!username || !password) {
        console.log('Request missing username or password param')
        return res.status(400).send(
          `Request missing username or password param`
        );
    }
    try {
        const userLogin = await user_game.findOne({ where: { username: username, password: password} });
        if(userLogin === null) res.status(400).send(`Wrong username or password`);
        console.log(userLogin.dataValues) //check input values
        next();
    } catch (error) {
        console.log(error)
    }
};

const adminAuth = async (req, res, next) => {
    const { username, body } = req.query;
    if(username !== process.env.SUPER_USER) res.status(403).send(`You don't have access`)
    console.log(`Admin masuk`)
    next();
}


module.exports = {
    userAuth,
    adminAuth
}