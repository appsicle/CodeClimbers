<template>
    <div class="button-container">
        <div @click="createRoom">Create Room</div>

        <div>Join Room</div>
    </div>

</template>

<script>
  import db from '../Firebase.js'
    export default {
        data() {
            return {
                roomId: 0
            }

        },
        mounted(){
          var roomId = parseInt(Math.random() * 1000000);
          // db.ref()
          db.ref('rooms/' + roomId).set({
            id: roomId,
            gamestate: 'WAITING',
            Users: {
                user: {
                    id: 1234
                },
            },

            code: 'hi',
          });

        },
        methods: {
            newRoomObj() {
              // console.lorg(items);

              // console.log(roomId);
              // db.database().ref('rooms/' + roomId).set({
              //   id: roomId,
              //   gamestate: 'WAITING',
              //   Users: {
              //       user: {
              //           id: 1234
              //       },
              //   },
              //
              //   code: 'hi',
              // })


                // const room = {
                //     id: 1234,
                //     gamestate: 'WAITING',
                //     Users: {
                //         user: {
                //             id: 1234
                //         },
                //     },
                //
                //     code: 'hi',
                //
                // };
                // return room;
            },
            createRoom() {
                this.newRoomObj();
            },
            joinRoom() {
            }
        }


    }

</script>

<style scoped>
    .button-container {
        text-align: center;
    }

    .button-container div {
        width: 200px;
        margin: 0 auto;
    }

    .button-container div:hover {
        background-color: gray;
    }
</style>
