<template>
    <div class="display">
        <div v-if="selected">
            <h1 >{{selected.title}}</h1>
            <p v-if="display">Difficulty: {{selected.difficulty}}</p>
        </div>
        <p v-if="selected">{{selected.description}}</p>
    </div>
</template>

<script>
    export default {
        props: ['db', 'uid', 'display'],
        data() {
            return {
                recent: {
                    qnum: ''
                },
                selected: {
                    qnum: '',
                    title: '',
                    difficulty: '',
                    description: '',
                    definition: ''
                },
                questions: [
                    {
                        qnum: 'q1',
                        title: 'Half a Number',
                        difficulty: 'Beginner',
                        description: 'Write a function that divides a number by two.',
                        definition: 'def half_num(n):\n\t'
                    },
                    {
                        qnum: 'q2',
                        title: 'Smallest Num',
                        difficulty: 'Beginner',
                        description: 'Return the smallest element in an array.',
                        definition: 'def smallest(arr):\n\t'
                    },
                    {
                        qnum: 'q3',
                        title: 'String Reversal',
                        difficulty: 'Novice',
                        description: "" +
                            "Reverse a String:" +
                            "Your function takes a single parameter s as an array of chars." +
                            " You should return the string reversed.\n" +
                            "\nRestrictions: " +
                            "   Must be done in O(1) extra space." +
                            "Can you do it in one line?" +
                            "\nExample Input #1:     'Racecar'." +
                            "\nExpected Output #1:   'racecaR'" +
                            "\nExample Input #2:      'There are spaces, wow!'" +
                            "\nExample Output #2:     '!wow ,secaps era erehT'",
                        definition: 'def reverse(s):\n\t'
                    },
                    {
                        qnum: 'q4',
                        title: 'First Unique',
                        difficulty: 'Moderate',
                        description: 'Return the first unique character in a string.',
                        definition: 'def first_unique(s):\n\t'
                    }

                ]
            }

        },
        methods: {
            selectRandomQuestion() {
                let temp = this.recent;
                while (temp["qnum"] === this.recent["qnum"]){
                    temp = this.questions[Math.floor(Math.random() * this.questions.length)];
                }
                this.selected = temp;
                this.recent = temp;
                //push selected to firebase
                this.db.ref('code').update({
                    selected: this.selected
                });

                this.db.ref('code/selected').once('value', snapshot=>{
                    console.log('hello');
                    this.db.ref('code').update({
                        text: snapshot.val().definition
                    });
                })
            }
        },
        watch: {
            display(){
                this.selectRandomQuestion();
            }
        },
        mounted(){
            this.db.ref('code/selected').remove();
            this.db.ref('code/selected').on('value', snapshot=>{
                this.selected = snapshot.val();
            });

        }

    }
</script>

<style scoped>
    *{
        font-family: Roboto;
    }
    .display {
        width: 100%;
        padding: 0 20px;
    }
    div h1{
        margin: 20px 0;

    }
    div p{
        margin: 0;
    }
</style>