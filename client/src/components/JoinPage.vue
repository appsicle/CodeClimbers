<template>
    <div>
      <button v-on:click="createRoom">Create Room</button><br />
      Room Id:
      <input v-model = "rooomid"type="text">

      <button @click="joinRoom">Submit</button>
    </div>
</template>

<script>
export default {
  data(){
    return{
      rooomid: 0
    }
  },
  methods: {
    createRoom: function(){
      this.$emit('created', 'room');
    },
    joinRoom: function(){
      this.$emit('joined', this.rooomid);
    }
  }

}

</script>

<style scoped>
    div{
        /* background-color: blue; */
        /* height: 10%; */
    }
</style>
