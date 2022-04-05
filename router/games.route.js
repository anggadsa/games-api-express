const express = require(`express`);
const router = express.Router();
const { getAllGames, getGameById, createGame, updateGameById, deleteGameById } = require('../controllers/games.controller');

router.get('/', getAllGames);
router.get('/:id', getGameById);
router.post('/create', createGame);
router.put('/update/:id', updateGameById);
router.delete('/delete/:id', deleteGameById);

module.exports = router;