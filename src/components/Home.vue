<template>
  <h1>sjfoajsodfjaos</h1>
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
    this.getDataHouses()
  }
}
</script>

<style>

</style>
