const express = require(`express`);
const router = express.Router();
const { getAllGames, getGameById, createGame, updateGameById, deleteGameById } = require('../controllers/games.controller');

router.get('/games', getAllGames);
router.get('/games/:id', getGameById);
router.post('/games/create', createGame);
router.put('/games/update/:id', updateGameById);
router.put('/games/delete/:id', deleteGameById);

module.exports = router;