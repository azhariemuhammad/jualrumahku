const express = require('express')
const router = express.Router()
const { addDataUser, getAllUsers, getUserByEmail, deleteUser } = require('../controller/userCtrl')


router.post('/users', addDataUser)

router.get('/users', getAllUsers)

router.get('/users/:email', getUserByEmail)

router.delete('/users', deleteUser)

module.exports = router