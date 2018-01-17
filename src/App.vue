<template>
  <div id="app">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <TheNavBar />
        <div class="page-content">
          <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--1-col"></div>
            <div class="mdl-cell mdl-cell--10-col">
              <router-view></router-view>
            </div>
            <div class="mdl-cell mdl-cell--1-col"></div>
          </div>
        </div>
    </div>
    </div>
  
</template>

<script>
import TheNavBar from './components/TheNavBar'
export default {
  name: 'app',
  components: { TheNavBar }
}
</script>

<style>
body {
  margin: 0;
  background-image: url('./assets/bc.jpeg');
}
/* .mdl-layout__content {
  
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  opacity: 0.9;
} */


</style>
