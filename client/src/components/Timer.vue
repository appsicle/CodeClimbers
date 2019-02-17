<template>
    <div class="header-container">
        <p id="logo">CODE CLIMBERS</p>
        <p>User {{currentUser}}'s Turn!</p>
        <p>00:0{{seconds}}</p>
    </div>

</template>

<script>
    import db from '../Firebase';

    export default {
        data() {
            return {
                seconds: '',
                timer: '',
                currentUser: 0,
                user1: 0,
                user2: 0
            }
        },
        props: ['db', 'sTime'],
        methods: {
            startTime: function () {
                if (this.currentUser == this.user1) {
                    this.currentUser = this.user2;
                } else {
                    this.currentUser = this.user1;
                }

                this.db.ref('code').update({
                    current: this.currentUser
                });
                this.timer = setInterval(() => {
                    this.seconds--;
                    if (this.seconds > 0) {
                        this.db.ref('code').update({
                            time: this.seconds
                        });
                    } else {
                        clearInterval(this.timer);
                    }
                }, 1000);
            }
        },
        mounted() {
            db.ref('code').update({
                time: 15
            });
            db.ref('code').update({
                current: ""
            })
            this.db.ref('code/time').on('value', data => {
                this.seconds = data.val();
            });
            this.db.ref('code/current').on('value', data => {
                this.currentUser = data.val();
            });

        },
        watch: {
            sTime: function () {
                this.db.ref('code').once('value', data => {
                    this.user1 = data.val().userOne;
                    this.user2 = data.val().userTwo;
                    this.currentUser = this.user2;
                });

                this.timer = setInterval(() => {
                    this.db.ref('code').update({
                        current: this.currentUser
                    });
                    this.seconds--;
                    if (this.seconds > 0) {
                        this.db.ref('code').update({
                            time: this.seconds
                        });
                    } else {
                        db.ref('code').update({
                            time: 10
                        });
                        this.startTime();
                        clearInterval(this.timer);
                    }
                }, 1000);
            }
        }


    }

</script>

<style scoped>
    * {
        margin: 0;
        font-family: Roboto;
    }

    #logo{
        font-family: "Source Sans Pro" !important;
        font-weight: 700;
    }

    .header-container {
        background-color: #a0d3ff78;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        width: auto;
    }

    .header-container p {
        font-size: 36px;
    }
</style>
