<template>
<div>

    <h1>Popular</h1>
    <div class="field has-addons">
      <div class="control" id="control1">
        <input class="input is-large" v-model="query" type="text" placeholder="Find a repository">
      </div>
        <div class="control" id="control2">
          <a class="button  is-large is-info">        
          <i class="material-icons" @click="search">search</i>
        </a>
        </div> 
        <div class="control" id="control1">
          <a class="button  is-large is-info">        
            <i class="material-icons" @click="renew">autorenew</i>
           </a>
        </div>               
    </div>
    
    <div class="flex-container" v-if="filterHouse">
    <div class="mdl-card" v-for="item in filterHouse">
      <div flex-item>
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">{{ item.title }}</h2>
      </div>
      <div class="mdl-card__media">
        <img :src="item.photoDenah" width="330px" height="165px" border="0" :alt="item.title">
      </div>
      <div class="mdl-card__supporting-text">
        Rp.{{ item.price }}
        <br>
        <br>
        {{ item.address }}
      </div>
      <div class="mdl-card__actions">
        <router-link :to="{path: `/detail/${item._id}`}"><a>Read More</a></router-link>
      </div>
      </div>
    </div>
    </div>
</div>
  
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      query: ''
    }
  },
  computed: {
    ...mapState([
      'filterHouse'
    ])
  },
  methods: {
    ...mapActions([
      'getDataHouses',
      'filter'
    ]),
    search: function () {
      this.filter(this.query)
    },
    renew: function () {
      this.query = ''
      this.filter(this.query)
    }
  },
  created () {
    if (this.filterHouse.length === 0) {
      this.getDataHouses()
    }
  }
}
</script>

<style scoped>

#control1 {
  margin-right: 20px;
}

.button.is-info {
  line-height: 13px;
  margin-top: -1px;
}

h1 {
  color: black;
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
  flex-wrap: wrap;
  
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
.mdl-card {
  margin-top: 16px;
}
</style>
