<template>
  <div id="app">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <TheNavBar />
      <main class="mdl-layout__content">
        <div class="page-content">
          <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--1-col"></div>
            <div class="mdl-cell mdl-cell--10-col">
              <router-view></router-view>
            </div>
            <div class="mdl-cell mdl-cell--1-col"></div>
          </div>
        </div>
      </main>
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
}


</style>
