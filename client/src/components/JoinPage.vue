<template>
    <v-app>
        <div class="landing-div">
            <img class="mountain" src="../assets/mountain4.jpg" alt="">

            <v-text-field
                    v-if="this.reveal"
                    v-model="rooomid"
                    label="ID to Join Room"
                    outline
            ></v-text-field>
            <v-btn v-if="!this.reveal" flat color="primary" @click="createRoom" class="create-room text-capitalize">
                Create Room
            </v-btn>
            <v-btn v-if="this.reveal" flat color="warning" @click="back" class="join-button text-capitalize">Back</v-btn>

            <v-btn flat color="primary" @click="joinRoom" class="join-button text-capitalize">Join Room</v-btn>
        </div>

    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                rooomid: '',
                reveal: false
            }
        },
        methods: {
            createRoom: function () {
                this.$emit('created', 'room');
            },
            joinRoom: function () {
                if (this.rooomid) {
                    this.$emit('joined', parseInt(this.rooomid));
                } else {
                    this.reveal = true;
                }

            },
            back() {
                this.reveal = false;
            }
        }

    }

</script>

<style>

    .landing-div {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .create-room {
        height: 48px;
        width: 200px;
        border: 1px solid #d0cdcd;
        font-size: 20px;
        border-radius: 4px;
    }

    .join-button {
        height: 48px;
        width: 200px;
        border: 1px solid #d0cdcd;
        font-size: 20px;
        border-radius: 4px;
    }
    .mountain{
        position: absolute;
        left: 50%;
        transform: translate(-50%, -120%);
    }
</style>
