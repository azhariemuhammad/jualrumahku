<template>
  <div>

    <h1>map</h1>
      <gmap-map
    :center="center"
    :zoom="7"
    style="width: 500px; height: 300px">
  <gmap-marker
      :key="index"
       v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  nama: 'Gmap',
  props: ['to'],
  data () {
    return {
      address: '',
      center: {lat: 10.0, lng: 10.0},
      markers: [{
        position: {lat: 10.0, lng: 10.0}
      }]
    }
  },
  beforeRouteEnter (to, from, next) {
    let lat = to.params.house.lat
    let lng = to.params.house.lng
    let address = to.params.house.address
    next(vm => {
      vm.markers[0].position.lat = lat
      vm.markers[0].position.lng = lng
      vm.center.lat = lat
      vm.center.lat = lng
      vm.address = address
    })
  }
}
</script>

<style>

</style>
