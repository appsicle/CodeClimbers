<template>
    <div>
        <button @click="startTime">start</button>
        <h1>Timer</h1>
        <h2>Current Typer: {{currentUser}}</h2>
        {{seconds}}
        <!-- {{sTime}} -->
    </div>
</template>

<script>
    import db from '../Firebase';
    export default{
        data(){
            return {
                seconds: 30,
                timer: '',
                currentUser: '',
                user1:'',
                user2:''
            }
        },
        props: ['db','sTime'],
        methods: {
          startTime: function(){
            if (this.currentUser == this.user1){
              this.currentUser = this.user2;
            }else{
              this.currentUser = this.user1;
            }

            this.db.ref('code').update({
              current: this.currentUser
            });
            this.timer = setInterval(()=>{
              this.seconds--;
              if (this.seconds > 0){
                this.db.ref('code').update({
                  time: this.seconds
                });
              }else{
                clearInterval(this.timer);
              }
            },1000);
          }
        },
        mounted(){
          db.ref('code').update({
            time: 10
          });
          db.ref('code').update({
            current:""
          })
          this.db.ref('code/time').on('value', data=>{
              this.seconds = data.val();
          });
          this.db.ref('code/current').on('value', data=>{
              this.currentUser = data.val();
          });

        },
        watch: {
          sTime: function(){
            this.db.ref('code').once('value', data=>{
                this.user1 = data.val().userOne;
                this.user2 = data.val().userTwo;
                this.currentUser = this.user2;
            });

            this.timer = setInterval(()=>{
              this.db.ref('code').update({
                current: this.currentUser
              });
              this.seconds--;
              if (this.seconds > 0){
                this.db.ref('code').update({
                  time: this.seconds
                });
              }else{
                db.ref('code').update({
                  time: 10
                });
                this.startTime();
                clearInterval(this.timer);
              }
            },1000);
          }
        }


    }

</script>
