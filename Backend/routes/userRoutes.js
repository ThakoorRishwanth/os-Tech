const express = require('express')

const {getUser, addUser, deleteUser} = require('../controllers/userController')

const router = express.Router();

router.get('/users', getUser);
router.post('/users', addUser);
router.delete('/user/:id', deleteUser)

module.exports = router