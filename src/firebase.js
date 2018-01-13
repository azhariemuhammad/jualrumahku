import firebase from 'firebase'

/* eslint-disable */
var config = {
  apiKey: "AIzaSyA6tkCsALPbiLlw038YHJ0izByVMcNgwU8",
  authDomain: "vue-project-1a9b9.firebaseapp.com",
  databaseURL: "https://vue-project-1a9b9.firebaseio.com",
  projectId: "vue-project-1a9b9",
  storageBucket: "vue-project-1a9b9.appspot.com",
  messagingSenderId: "889735417412"
}
firebase.initializeApp(config)
var firebaseApp = firebase.storage()

export default firebaseApp