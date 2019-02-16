<template>
  <div id="app">
    <!--<Landing></Landing>-->
    <Room></Room>
  </div>
</template>

<script>

import Landing from './components/Landing.vue'
import Room from './components/Room'

export default {
  // data(){
  //   return{
  //     database
  //   }
  // },
  name: 'app',
  components: {
      Landing,
      Room
  }
}
</script>

<style>
*{
  font-family: Roboto;
}
</style>
