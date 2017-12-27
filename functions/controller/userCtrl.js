const admin = require('firebase-admin');
const functions = require('firebase-functions');

const uuid = require('uuid-v4');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();
myUUID = uuid() // uuid untuk untuk membuat index

var userCol = db.collection('users')
var userRef = userCol.doc(myUUID); // path reference ke user

const addDataUser = (req, res) => {
  userRef.set({
    username: req.body.username,
    email: req.body.email
  })
  res.json({ msg: 'succes create one data' })
}

const getAllUsers = (req, res) => {
  userCol.get()
  .then(snap => {
    let arrUsers = []
    snap.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      // assign nilai yang di dapat ke dalam object baru
      // dan send sebagai aray of object
      let obj = {
        docId: doc.id,
        docData: doc.data()
      }
      arrUsers.push(obj)
    })
    res.json(arrUsers)
  })
}

const getUserByEmail = (req, res) => {
  userCol.where('email', '==', req.params.email).get()
  .then(snap => {
    let arrUser = []
    snap.forEach((doc) => {
      console.log(doc.id, '=>', doc.data())
      let obj = {
        docId: doc.id,
        docData: doc.data()
      }
      arrUser.push(obj)
    })
    res.json(arrUser)
  })
}

const deleteUser = (req, res) => {
  console.log(req.query.id)
  userCol.doc(req.query.id).delete()
  .then(snap => {
    res.json('delete one user with id')
  })
}




module.exports = {
  addDataUser,
  getAllUsers,
  getUserByEmail,
  deleteUser
}