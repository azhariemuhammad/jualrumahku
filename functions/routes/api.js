const express = require('express')
const router = express.Router()
const { createUser,
  getAllUsers,
  findByIdUser,
  findByIdAndRemove } = require('../controller/userCtrl')
const { createHouse,
  getAllHouses,
  findByIdHouse,
  findByIdAndRemoveHouse,
  findHouse,
  findByIdAndUpdate } = require('../controller/houseCtrl')


router.post('/users', createUser)

router.get('/users', getAllUsers)

router.get('/users/:id', findByIdUser)

router.delete('/users', findByIdAndRemove)

router.post('/houses', createHouse)

router.get('/houses', getAllHouses)

router.get('/houses/:id', findByIdHouse)

router.get('/houses/user/:uid', findHouse)

router.put('/houses/:id', findByIdAndUpdate)

router.delete('/house/:id', findByIdAndRemoveHouse)



module.exports = router