const mongoose = require('mongoose')
const Schema = mongoose.Schema
const findOrCreate = require('mongoose-findorcreate')


const houseSchema = new Schema({
  title: String,
  desc: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Userjualrumahku'
  },
  photoDenah: String,
  address: String,
  lat: Number,
  lng: Number,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
})



houseSchema.plugin(findOrCreate);

const House = mongoose.model('Housejualrumahku', houseSchema)

module.exports = House;
