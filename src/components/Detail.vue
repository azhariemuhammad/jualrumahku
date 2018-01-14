<template>
  <div>
    
    <div class="desc" v-if="house">
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--1-col"></div>
        <div class="mdl-cell mdl-cell--10-col">
          <h1> {{ house[0].title }} </h1>
          <p>
            <span v-html="house[0].desc"></span>
          </p>
          <p>Rp. {{ currency }}</p>

          <p>Developer: {{house[0].userId.username}}</p>
          <p>Contact: {{house[0].userId.email}}</p>
          <router-link :to="{name: 'Gmap', params: {house: house[0]}}"><a>Show in Map</a></router-link>

          <router-view/>
        </div>
        <div class="mdl-cell mdl-cell--1-col"></div>
      </div>
    </div>
    <div v-else>
      <div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
    </div>
  </div>
</template>

<script>
import numeral from 'numeral'
export default {
  name: 'Detail',
  data () {
    return {
      house: ''
    }
  },
  computed: {
    currency () {
      let price = this.house[0].price
      return numeral(price).format('0,0.00')
    }
  },
  methods: {
    getHouseById: function () {
      this.$http.get(`/houses/${this.$route.params.id}`)
        .then(({data}) => {
          console.log(data)
          this.house = data
        })
        .catch(err => console.error(err))
    }
  },
  created () {
    this.getHouseById()
  }
}
</script>

<style scoped>
.desc {
  background: #fff;
  background-color: transparent;
  color: #fff;
  background-color: rgba(255, 0, 0, 0.4);
}

p {
  font-size: 18px;
}
h1 {
  color: rgb(245, 242, 242);
}
a {
  font-size: 16px;
}

</style>
