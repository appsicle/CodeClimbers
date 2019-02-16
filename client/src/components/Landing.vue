<template>
    <div class="button-container">
        <div @click="createRoom">Create Room</div>

        <div>Join Room</div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                roomId: 0
            }

        },
        methods: {
            newRoomObj() {
              // var roomId = Math.random() * 1000000
              // firsebase.database().ref('rooms/' + roomId).set({
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
                // const r =
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
