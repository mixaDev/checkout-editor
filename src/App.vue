<template>
  <div id="app">

  </div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'

  Vue.use(VueResource);

export default {
  name: 'app',
  created() {
    this.$http.get('style.css').then(response => {
      console.log(response.body)
    }, response => {
      // error callback
    });
  },
}
</script>
