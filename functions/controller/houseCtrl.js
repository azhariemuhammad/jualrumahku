const House = require('../models/house-schema')

let message = ''

const createHouse = (req, res) => {
  House.create(req.body)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
}

const getAllHouses = (req, res) => {
  House.find()
    .then(house => {
      res.status(200).send(house)
    })
    .catch(err => {
      console.log('err')
    })
}

const findByIdHouse = (req, res) => {
  House.find({ _id: req.params.id })
  .then(house => {
    res.status(200).send(house)
  })
  .catch(err => {
    console.log(err)
  })
}

const findByIdAndUpdate = (req, res) => {
  House.findByIdAndUpdate({_id: req.params.id},{
    title: req.body.title,
    desc: req.body.desc,
    photoDenah: req.body.photoDenah,
    price: req.body.price,
    lat: req.body.lat,
    lng: req.body.lng,
    address: req.body.address

  }, {new: true})
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
}


const findByIdAndRemoveHouse = (req, res) => {
  House.findByIdAndRemove({ _id: req.params.id })
    .then(house => {
      res.status(200).send(house)
    })
    .catch(err => {
      console.log(err)
    })
}



module.exports = {
  createHouse,
  getAllHouses,
  findByIdHouse,
  findByIdAndUpdate,
  findByIdAndRemoveHouse
}