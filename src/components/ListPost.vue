<template>
  <div>
    <div class="flex-container">
      <div v-for="(item, index) in housesBaseUid"> 
        <div class="demo-card-wide mdl-card mdl-shadow--2dp flex-item">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">grergsegse</h2>
        </div>
        <div class="mdl-card__supporting-text">
           {{ item.title }}
           {{ item.price }}
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="edit(item)">
            Edit
          </a>
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="remove(item)">
            Remove
          </a>
        </div>
        <div class="mdl-card__menu">
          <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i class="material-icons">share</i>
          </button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ListPost',
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'housesBaseUid'
    ])
  },
  methods: {
    ...mapActions([
      'editPost',
      'deleteHouse',
      'findHouseByUid'
    ]),
    edit: function (item) {
      this.editPost(item)
    },
    remove: function (house) {
      console.log('mo edit')
      this.deleteHouse(house)
    }
  },
  created () {
    this.findHouseByUid()
  }

}
</script>

<style scoped>
.demo-card-wide.mdl-card {
  width: 512px;
}
.demo-card-wide > .mdl-card__title {
  color: #fff;
  height: 176px;
}
.demo-card-wide > .mdl-card__menu {
  color: #fff;
}


.flex-container {
  padding: 0;
  margin: 0;
  list-style: none;
  
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  
  -webkit-flex-flow: wrap;
  justify-content: space-around;
}

.flex-item {
  padding: 5px;
  width: 200px;
  height: 150px;
  margin-top: 10px;
  
  line-height: 150px;
  color: white;
  font-weight: bold;
  font-size: 3em;
}
</style>
