<template>
    <div id="app">
        <Editor :db="db" :uid="userId"></Editor>
        <QD :db="db" :uid="userId"></QD>
    </div>
</template>

<script>
    import db from './Firebase';

    import Editor from './components/Editor'
    import QD from './components/QuestionDisplay'

    export default {
        data(){
          return {
              db: db,
              userId: 0
          }
        },
        name: 'app',
        components: {
            QD,
            Editor
        },

        mounted(){
            var randomInt = parseInt(Math.random()*10000);
            this.userId = randomInt;
            db.ref('code/userOne').onDisconnect().remove();
            db.ref('code/userTwo').onDisconnect().remove();
            db.ref('code').once('value').then(snapshot=>{
                // console.log(snapshot.val());
                console.log(snapshot.key);
                console.log(snapshot.child('userOne').exists());
                if(snapshot.val().userOne){ //if a user already exists
                    db.ref('code').update({ //make user Two true
                        userTwo: this.userId
                    });
                    //start 2 timers
                    //display question from our cache
                    //block out text area for player 2

                }else{
                    console.log('HELLO')
                    db.ref('code').update({
                        userOne: this.userId
                    })
                }
            });
        },
        destroyed(){
            cleardb();
        },
        methods: {
            cleardb(){
                db.ref('code').child('userOne').remove();
                db.ref('code').child('userTwo').remove();
            }
        }

    }
</script>

<style>
    * {
        font-family: Roboto;
    }
</style>
