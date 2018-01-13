<template>
  <div>
    <h1>Post</h1>
      <form action="#" @submit.prevent="upload">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" v-model="post.title" id="sample3">
        <label class="mdl-textfield__label" for="sample3">Title</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" v-model="post.price" type="text" id="sample2">
        <label class="mdl-textfield__label" for="sample2">Price</label>
      </div>
      <input type="file" @change="onfileChange">
        <label class="mdl-textfield__label" for="sample2">Description</label>
        <vue-editor v-model="post.desc"></vue-editor>
      <input type="submit">
    </form>
  </div>

</template>

<script>
import firebaseStorage from '../firebase.js'
import firebase from 'firebase'
import { mapActions } from 'vuex'
import { VueEditor } from 'vue2-editor'
import randomWord from 'get-unique-name'
export default {
  components: { VueEditor },
  name: 'Admin',
  data () {
    return {
      post: {
        title: '',
        price: '',
        desc: '',
        image: '',
        downloadURL: ''
      },
      htmlForEditor: null
    }
  },
  methods: {
    ...mapActions([
      'postHouse'
    ]),
    onfileChange: function (e) {
      console.log('hello')
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.post.image = files[0]
    },
    submit: function () {
      this.upload()
    },
    upload: function () {
      console.log(this.post.image)
      let fileName = randomWord()
      let storageRef = firebaseStorage.ref()
      let file = this.post.image
      let vm = this
      var uploadTask = storageRef.child(`houses/${fileName}.png`).put(file)
      uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running')
            break
        }
      }, function (error) {
        alert(error)
      }, function () {
        console.log('success')
        vm.post.downloadURL = uploadTask.snapshot.downloadURL
        vm.postHouse(vm.post)
      })
    }
  }
}
</script>

<style scoped>
form {
  width: 100%;
}
</style>
