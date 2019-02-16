<template>
  <div id="app">
    <Landing></Landing>
  </div>
</template>
<script src="https://www.gstatic.com/firebasejs/5.8.2/firebase.js"></script>
<script>
var config = {
  apiKey: "AIzaSyBDoJlMgC3W749ra5MsantmhArh-Z2wziw",
  authDomain: "codeclimbers-1c849.firebaseapp.com",
  databaseURL: "https://codeclimbers-1c849.firebaseio.com/",
  storageBucket: "codeclimbers-1c849.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
// var database = firebase.database();


import Landing from './components/Landing.vue'

export default {
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
