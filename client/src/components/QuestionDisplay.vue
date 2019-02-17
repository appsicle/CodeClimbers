<template>
    <div class="display">
        <div v-if="selected">
            <h1 >{{selected.title}}</h1>
            <p v-if="display" class="helper-text" style="font-style: italic">Difficulty: {{selected.difficulty}}</p>
        </div>
        <p v-if="selected"><span class="helper-text" v-html="selected.description"></span></p>
        <p class="room-number">Room # {{rid}}</p>
    </div>
</template>

<script>
    export default {
        props: ['db', 'uid', 'display', 'rid'],
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
                        description: `Write a function that divides a number by two.<br>
                                      Your function will take a single paramater n as an integer.<br>
                                      You must return the quotient as the floor division of the integer<br><br>

                                      Example Input #1:    12<br>
                                      Example Output #1:   6<br><br>

                                      Example Input #2:     7<br>
                                      Example Output #2:    3`,
                        definition: 'def half_num(n):\n\t'
                    },
                    {
                        qnum: 'q2',
                        title: 'Smallest Num',
                        difficulty: 'Beginner',
                        description: `Return the Smallest Element in Array<br>
                                      Given an unsorted array of integers, return the smallest element in the array.<br><br>

                                      <strong>Restrictions:</strong><br>
                                        Must be done without using standard library functions.<br><br>

                                      Don't think too hard about it.<br><br>

                                      Example Input #1:   [1,2,3,4,5,0,-2,-3]<br>
                                      Example Output #1   -3<br><br>

                                      Example Input #2:   [-1, 5, 100, 3, 54.5, 67, 0]<br>
                                      Example Output #2:  -1`,
                        definition: 'def smallest(arr):\n\t'
                    },
                    {
                        qnum: 'q3',
                        title: 'String Reversal',
                        difficulty: 'Novice',
                        description: `Reverse a String:<br>
                                      Your function takes a single parameter s as an array of chars.<br>
                                      You are required to return the string reversed.<br><br>

                                      <strong>Restrictions:</strong><br>
                                        Must be done in O(1) extra space.<br>
                                      Can you do it in one line?<br><br>

                                      Example Input #1:      'Racecar'<br>
                                      Expected Output #1:    'reacecaR'<br><br>

                                      Example Input #2:      'There are spaces, wow!'<br>
                                      Expected Output #2:      '!wow ,secaps era erehT'`,
                        definition: 'def reverse(s):\n\t'

                    },
                    {
                        qnum: 'q4',
                        title: 'First Unique',
                        difficulty: 'Moderate',
                        description: `Find the First Unique Element<br>
                                      Given an array of chars, return the first unique character in the string<br><br>

                                      <strong>Restrictions:</strong><br>
                                        Must be done in O(n) time<br><br>

                                      "I can do it in 2 lines, but can you do it in 5? -Pattis"<br><br>

                                      Example Input #1:     'bibliography'<br>
                                      Expected Output #1:   'l'<br><br>

                                      Example Input #2:     'mississippi'<br>
                                      Expected Output #2:   'm'`,
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
                this.db.ref(this.rid).update({
                    selected: this.selected
                });

                this.db.ref(this.rid + '/selected').once('value', snapshot=>{
                    console.log('hello');
                    this.db.ref(this.rid).update({
                        text: snapshot.val().definition
                    });
                })
            },
            formatInfo(problemExplanation) {
                // document.getElementByTagName("p2")[0].innerHTML=problemExplanation
                ;
            }
        },
        watch: {
            display(){
                this.selectRandomQuestion();
                // this.formatInfo(this.description);
            }
        },
        mounted(){
            this.db.ref(this.rid + '/selected').remove();
            this.db.ref(this.rid + '/selected').on('value', snapshot=>{
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

    .room-number{
        position: absolute;
        bottom: 20px;
        font-size: 24px;
    }

    .helper-text{
        font-size: 24px;
    }
</style>
