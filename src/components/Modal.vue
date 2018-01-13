<template>
<div>
  <h1>Online</h1>
    <modal name="hello-world">
      <div id="card-modal">
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text">Login</h2>
        </div>
        <div class="mdl-card__supporting-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenan convallis.
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Login with Google
          </a>
      </div>
      </div>
    </modal>
  </div>
    
</div>
  
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>
demo-card-square.mdl-card {
  width: 100%;
  height: 100%;
}
.demo-card-square > .mdl-card__title {
  color: #fff;
  background:
    url() bottom right 15% no-repeat #46B6AC;
}

</style>
