<template>
  <div id="app">
    <Landing></Landing>
  </div>
</template>

<script>


// Get a reference to the database service
// let database = firebase.database();
// console.log(database);
// console.log("here");


import Landing from './components/Landing.vue'

export default {
  // data(){
  //   return{
  //     database
  //   }
  // },
  name: 'app',
  components: {
      Landing
  }
}
</script>

<style>
*{
  font-family: Roboto;
}
</style>
