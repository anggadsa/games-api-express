const express = require(`express`);
const router = express.Router();
const { getAllUsers, getUserByid, createUser, updateUser, deleteUser } = require('../controllers/games.controller');
const { passwordValidator } = require('../validator/password.validator'); //validate password
const { userAuth, adminAuth } = require('../validator/user-auth'); //auth for user and admin

router.get('/', getAllUsers);userAuth
router.get('/:id', getUserByid);
router.post('/create', createUser);
router.put('/update/', userAuth, passwordValidator, updateUser);
router.delete('/delete/', adminAuth, deleteUser);

module.exports = router;