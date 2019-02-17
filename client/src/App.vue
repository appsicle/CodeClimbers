<template>
    <div id="app">
        <div v-if="di === 'joinPage'">
          <JoinPage @created="createRoomFunc" @joined="joinRoomFunc"></JoinPage>
        </div>
        <div style="height: 100vh" v-else>
          <Timer @startTime= "startTime"@displayQuest="displayQuest":sTime="startTimer" :db="db" :uid="userId" :rid="roomId"></Timer>
          <div class="main-container">
              <QD :db="db" :uid="userId" :display="displayQuestion" :rid="roomId"></QD>
              <Editor :db="db" :uid="userId" :rid="roomId"></Editor>
          </div>
          <div style="background-color: #e8e8e8; height: 9%"></div>
        </div>
    </div>
</template>

<script>
    import db from './Firebase';

    import Editor from './components/Editor'
    import QD from './components/QuestionDisplay'
    import Timer from './components/Timer'
    import JoinPage from './components/JoinPage'

    export default {
        data(){
          return {
              db: db,
              userId: 0,
              startTimer: false,
              displayQuestion: 'false',
              roomId: 0,
              di: "joinPage"
          }
        },
        name: 'app',
        components: {
            QD,
            Editor,
            Timer,
            JoinPage
        },

        mounted(){
            var randomInt = parseInt(Math.random()*10000);
            this.userId = randomInt;
            var randomRoomId = parseInt(Math.random()*1000000)
            this.roomId = randomRoomId;

        },
        destroyed(){
            // this.cleardb();
        },
        methods: {
            cleardb(){
                db.ref('code').child('userOne').remove();
                db.ref('code').child('userTwo').remove();
            },
            createRoomFunc(data){
              this.di = data
            },
            joinRoomFunc(data){

              this.roomId = data
              this.createRoomFunc(data);
            },
            displayQuest(data){
              // console.log(data);
              this.displayQuestion = true;
            },
            startTime(data){
              this.startTimer = true;
            }


        }

    }
</script>

<style>
    body{
        margin: 0;
    }
    #app{
        height: 100vh;

    }

    .main-container{
        display: flex;
        height: 80%;
    }
</style>
