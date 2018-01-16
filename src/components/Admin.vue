<template>
  <div class="content">
    <div v-if="editItem.length === 0">
      <h1>Post</h1>
     <gmap-map
    :center="center"
    :zoom="7"
    style="width: 500px; height: 300px"
  >
  <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
    </gmap-map>

      <div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate" v-if="progressUpload"></div>
      <form action="#" @submit.prevent="submit">
        
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" v-model="post.title" id="sample3">
        <label class="mdl-textfield__label" for="sample3">Title</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" v-model="post.price" type="text" id="sample2">
        <label class="mdl-textfield__label" for="sample2">Price</label>
      </div>
        <vue-google-autocomplete
            id="map"
            ref="address"
            classname="form-control"
            placeholder="Start typing"
            v-on:placechanged="getAddressData"
            country="id"
        >
        </vue-google-autocomplete>

      <input type="file" @change="onfileChange">
        <label class="mdl-textfield__label" for="sample2"></label>
        <vue-editor v-model="post.desc"></vue-editor>
      <input type="submit">
    </form>

    </div>
    
    <div v-else>
      <h1>Edit</h1>

     <gmap-map
    :center="center"
    :zoom="7"
    style="width: 500px; height: 300px"
      >
      <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        ></gmap-marker>
        </gmap-map>
      <form action="#" @submit.prevent="submit(true)">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" v-model="editItem.title" id="sample3">
        <label class="mdl-textfield__label" for="sample3">Title</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" v-model="editItem.price" type="text" id="sample2">
        <label class="mdl-textfield__label" for="sample2">Price</label>
      </div>
      <vue-google-autocomplete
            id="map"
            ref="address"
            classname="form-control"
            placeholder="Start typing"
            v-on:placechanged="getAddressData"
            country="id"
        >
        </vue-google-autocomplete>
      <input type="file" @change="onfileChange">
        <label class="mdl-textfield__label" for="sample2">Description</label>
        <vue-editor v-model="editItem.desc"></vue-editor>
      <input type="submit">
    </form>
    </div>
    
  <ListPost/>
  </div>
  
  
  


</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import firebaseStorage from '../firebase.js'
import ListPost from '@/components/ListPost'
import firebase from 'firebase'
import { mapActions, mapState } from 'vuex'
import { VueEditor } from 'vue2-editor'
import randomWord from 'get-unique-name'
export default {
  components: { VueEditor, ListPost, VueGoogleAutocomplete },
  name: 'Admin',
  data () {
    return {
      center: {lat: 6.1751, lng: 106.8650},
      markers: [{
        position: {lat: 10.0, lng: 10.0}
      }],
      post: {
        title: '',
        price: '',
        desc: '',
        image: '',
        downloadURL: '',
        address: '',
        lat: null,
        lng: null
      },
      htmlForEditor: null,
      onUpdate: false,
      progressUpload: false
    }
  },
  computed: {
    ...mapState([
      'editItem'
    ])
  },
  mounted () {
    // To demonstrate functionality of exposed component functions
    // Here we make focus on the user input
    this.$refs.address.focus()
  },
  methods: {
    ...mapActions([
      'postHouse',
      'getDataHouses',
      'updateHouse',
      'findHouseByUid'
    ]),
    getAddressData: function (addressData, placeResultData, id) {
      console.log(id)
      this.post.address = addressData.route
      this.post.lat = addressData.latitude
      this.post.lng = addressData.longitude
      this.center.lat = addressData.latitude
      this.center.lng = addressData.longitude
      this.markers[0].position.lat = addressData.latitude
      this.markers[0].position.lng = addressData.longitude
    },
    onfileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.post.image = files[0]
    },
    submit: function (params) {
      console.log('paramas ,', params)
      if (params === true) {
        console.log('masuk paraa')
        this.onUpdate = true
        this.progressUpload = !this.progressUpload
        this.upload()
      } else {
        this.progressUpload = !this.progressUpload
        this.upload()
      }
    },
    control: function () {
      console.log(this.onUpdate)
      if (this.onUpdate) {
        console.log('update')
        let obj = {
          id: this.editItem._id,
          title: this.editItem.title,
          price: this.editItem.price,
          desc: this.editItem.desc,
          address: this.post.address,
          lat: this.post.lat,
          lng: this.post.lng,
          downloadURL: this.post.downloadURL
        }
        this.updateHouse(obj)
        this.progressUpload = !this.progressUpload
        this.post = {}
      } else {
        console.log('new post')
        this.postHouse(this.post)
        this.progressUpload = !this.progressUpload
        this.post = {}
      }
    },
    upload: function () {
      console.log(this.post.image)
      let fileName = randomWord()
      let storageRef = firebaseStorage.ref()
      let file = this.post.image
      let vm = this
      if (!file) {
        alert('Image Required')
      }
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
        vm.control()
      })
    }
  },
  created () {
    this.getDataHouses()
  }
}
</script>

<style scoped>
form {
  width: 100%;
}

h1 {
  color: black;
}

</style>
