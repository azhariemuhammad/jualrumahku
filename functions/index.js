const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')



mongoose.Promise = global.Promise
mongoose.connect('mongodb://wisnu:123@ds159845.mlab.com:59845/mydb_hacktiv8')
  .then(() => console.log('db connection succesfull to jualrumahku'))
  .catch((err) => console.log(err))

const api = require('./routes/api')
app.use(cors())
app.use('/api', api)


exports.app = functions.https.onRequest(app)


