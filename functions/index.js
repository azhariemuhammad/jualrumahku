const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express')
const cors = require("cors")
const app = express()




const api = require('./routes/api')
app.use('/api', api)


exports.app = functions.https.onRequest(app)


