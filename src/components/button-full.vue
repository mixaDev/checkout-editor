<template>
  <button type="button"  @click="toggleFull()">{{full ? 'min' : 'full'}}</button>
</template>

<script>
  export default {
    props: {
      full: Boolean
    },
    data(){
      return {

      }
    },
    methods: {
      toggleFull (){
        this.$emit('update:full', !this.full)
      }
    }
  }
</script>