const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express')
const cors = require("cors")
const app = express()




const api = require('./routes/api')
app.use('/api', api)

// app.listen(process.env.PORT || '8000')


exports.app = functions.https.onRequest(app)


// admin.initializeApp(functions.config().firebase);

// var db = admin.firestore();
// myUUID = uuid()

// var userCol = db.collection('users')
// var userRef = userCol.doc(myUUID);




// exports.addData = functions.https.onRequest((req, res) => {
//   userRef.set({
//     username: req.body.username,
//     email: req.body.email
//   })
//   res.json({msg: 'succes create one data'})
// })

// exports.getData = functions.https.onRequest((req, res) => {
//   userCol.get()
//   .then(snap => {
//     let arrUsers = []
//     snap.forEach((doc) => {
//       console.log(doc.id, '=>', doc.data());
//       let obj = {
//         docId: doc.id,
//         docData: doc.data()
//       }
//       arrUsers.push(obj)
//     })
//     res.json(arrUsers)
//   })
// })




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
