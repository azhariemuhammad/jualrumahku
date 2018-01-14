const House = require('../models/house-schema')

let message = ''

const createHouse = (req, res) => {
  House.create(req.body)
  .then(data => {
    data.populate('userId')
    .execPopulate()
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
}

const getAllHouses = (req, res) => {
  House.find()
    .populate('userId')
    .then(house => {
      res.status(200).send(house)
    })
    .catch(err => {
      console.log('err')
    })
}

const findByIdHouse = (req, res) => {
  House.find({ _id: req.params.id })
  .populate('userId')
  .then(house => {
    res.status(200).send(house)
  })
  .catch(err => {
    console.log(err)
  })
}

const findHouse = (req, res) => {
  House.find({userId: req.params.uid})
  .populate('userid')
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
    userId: req.body.userId,
    photoDenah: req.body.photoDenah,
    price: req.body.price,
    lat: req.body.lat,
    lng: req.body.lng,
    address: req.body.address

  }, {new: true})
  .then(data => {
    data.populate('userId')
    .execPopulate()
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
  findHouse,
  findByIdAndUpdate,
  findByIdAndRemoveHouse
}