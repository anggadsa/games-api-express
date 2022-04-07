require(`dotenv`)
const { user_game } = require('../models');

const passwordValidator = async (req, res, next) => {
    await console.log(`Ini password Validator`)
    const { oldPassword, newPassword } = req.body
    
    // password must be at least 5 chars long
    if(newPassword.length < 5 ) {
        res.send(`Password must be at least 5 chars long`)
    // the password is still the same as the old one   
    } else if (newPassword === oldPassword) {
        res.send(`The password is still the same as the old one`)
    }
    next()
};

module.exports = {
    passwordValidator,
}