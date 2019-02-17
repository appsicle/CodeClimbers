<template>
    <div class="header-container">
        <p id="logo">CODE CLIMBERS</p>
        <p>{{currentUser === uid ? "Your" : "Their"}} Turn!</p>
        <p>{{parseInt(seconds) > 9 ? '00:'+seconds : '00:0'+seconds}}</p>
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
                user2: 0,
                start: false,
            }
        },
        props: ['db', 'sTime','uid','rid'],
        methods: {
            originalMountChecker: function(){



            },
            startTime: function () {
                if (this.currentUser == this.user1) {
                    this.currentUser = this.user2;
                } else {
                    this.currentUser = this.user1;
                }

                this.db.ref(this.rid).update({
                    current: this.currentUser
                });
                this.timer = setInterval(() => {
                    this.seconds--;
                    if (this.seconds > 0) {
                        this.db.ref(this.rid).update({
                            time: this.seconds
                        });
                    } else {

                        clearInterval(this.timer);
                    }
                }, 1000);
            }
        },
        mounted() {
            db.ref(this.rid).update({
                time: 15
            });
            db.ref(this.rid).update({
                current: ""
            })
            db.ref(this.rid ).onDisconnect().remove();
            db.ref(this.rid).once('value').then(snapshot=>{
                if(snapshot.val().userOne){ //if a user already exists
                    db.ref(this.rid).update({ //make user Two true
                        userTwo: this.uid
                    });
                    //start 2 timers
                    this.$emit('startTime', true);
                    this.$emit('displayQuest', true);

                    //display question from our cache
                    //block out text area for player 2

                }else{
                    db.ref(this.rid).update({
                        userOne: this.uid
                    })
                }
            });
            this.db.ref(this.rid + '/time').on('value', data => {
                this.seconds = data.val();
            });
            this.db.ref(this.rid + '/current').on('value', data => {
                this.currentUser = data.val();
            });

        },
        watch: {
            sTime: function () {
              this.db.ref(this.rid).once('value', data => {
                  this.user1 = data.val().userOne;
                  this.user2 = data.val().userTwo;
                  this.currentUser = this.user2;
              });
              this.timer = setInterval(() => {
                  this.db.ref(this.rid).update({
                      current: this.currentUser
                  });
                  this.seconds--;
                  if (this.seconds > 0) {
                      this.db.ref(this.rid).update({
                          time: this.seconds
                      });
                  } else {
                      db.ref(this.rid).update({
                          time: 15
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
