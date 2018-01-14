<template>
<div>

    <h1>Popular</h1>
    <div class="flex-container">
    <div class="mdl-card" v-for="item in houses">
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
    return {}
  },
  computed: {
    ...mapState([
      'houses'
    ])
  },
  methods: {
    ...mapActions([
      'getDataHouses'
    ])
  },
  created () {
    if (this.houses.length === 0) {
      this.getDataHouses()
    }
  }
}
</script>

<style scoped>

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
