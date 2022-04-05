// middleware test
const authenticate = (req, res, next) => {
    console.log(`Masuk middleware test`)
    next();
};

module.exports = {
    authenticate
}