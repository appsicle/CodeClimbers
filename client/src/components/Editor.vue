<template>
    <div class="editor-container">
        <AceEditor :fontSize="18"
                   :showPrintMargin="true"
                   :showGutter="true"
                   :highlightActiveLine="true"
                   :onChange="textEntered"
                   :value="code"
                   height="100%"
                   width="100%"
                   mode="python"
                   theme="tomorrow_night_eighties"
        >

        </AceEditor>
        <div class="button-container">
            <button class="submit-button" @click="runCode">Run</button>
            <button class="submit-button" @click="submitCode">Submit</button>
        </div>
        <div class="result-box" v-if="result.length">
            <p>Result</p>
            <p v-for="res in result">{{res}}</p>
        </div>
        <div v-if="runResult">
            {{runResult}}
        </div>
    </div>
</template>

<script>
import brace from 'brace';
import { Ace as AceEditor } from 'vue2-brace-editor';

import 'brace/mode/python';
import 'brace/theme/tomorrow_night_eighties'
import axios from 'axios';

export default {
    props: ['db', 'uid', 'rid'],
    data(){
        return {
            test: '',
            result: [],
            code: '',
            runResult: '',
            currentTyper: 0,
        }
    },
    components: {
        AceEditor
    },
    methods: {
        textEntered(value){
            this.code = value;
            this.db.ref(this.rid).update({
                text: this.code
            });
        },
        submitCode(){
            var qnum;
            this.db.ref(this.rid + '/selected').once('value', snapshot=>{
                qnum = snapshot.val().qnum;
            });
            const toSubmit = this.code;
            axios.post('http://localhost:3000/submit', {
                qnum: qnum,
                code: toSubmit
            }).then(response =>{
                this.result = [];
                this.runResult = '';
                var res = response.data;
                for(var i = 0; i < res.length; ++i){
                    var testcase_num = i+1;
                    var info = "Testcase #" + testcase_num + ": " + res[i]['P/F'];
                    this.result.push(info);
                    console.log(this.result)
                    if(res[i]['P/F'] === "Failed"){
                        if(res[i]['ErrorMessage'] === null){
                            this.result.push("Input: " + res[i]["input"]);
                            this.result.push("Expected Output: " + res[i]["expected_output"]);
                            this.result.push("Actual Output: " + res[i]["output"]);
                        }
                        else{
                            this.result.push(res[i]["ErrorMessage"]);
                        }
                        break;
                    }
                }
            }).catch(err=>{
                console.error(err);
            })
        },
        runCode(){
            const toRun = this.code;
            axios.post('http://localhost:3000/run', {
                code: toRun
            }).then(response =>{
                this.result = [];
                this.runResult = response.data;
                console.log(this.runResult);
            }).catch(err=>{
                console.error(err);
            })
        },
        f(event){
            event.preventDefault();
            console.log('keydown');
            return false;
        }
    },
    mounted(){
        this.db.ref(this.rid + '/current').on('value', snapshot=>{
            this.currentTyper = parseInt(snapshot.val());
        });
        this.db.ref(this.rid).update({
            text: ''
        });
        this.db.ref(this.rid + '/text').on('value', data=>{
            console.log(data.val());
            this.code = data.val();
        });
    },
    watch:{
        currentTyper: function(){
            console.log('current user changed')
            if (this.uid !== this.currentTyper){
                document.querySelector('textarea').addEventListener('keydown', this.f)
            }else{
                console.log('we can type')
                document.querySelector('textarea').removeEventListener('keydown',this.f);
            }
        }
    }


}

</script>

<style>
.editor-container{
    width: 100%;
}

.button-container{
    display: flex;
    justify-content: flex-end;
}
.submit-button{
    font-family: Roboto;
    transform: translateY(30%);
    margin: 0 15px;
    text-align: center;
    height: 48px;
    width: 160px;
    background-color: #7b5958d6;
    color: white;
    border-radius: 4px;
    font-size: 20px;
    -webkit-box-shadow: -1px 0px 14px -4px rgba(0,0,0,0.75);
    -moz-box-shadow: -1px 0px 14px -4px rgba(0,0,0,0.75);
    box-shadow: -1px 0px 14px -4px rgba(0,0,0,0.75);
}

.submit-button:hover{
    opacity: .8;
    cursor: pointer;
}

.result-box{
    font-family: Roboto;
    position: absolute;
    left: 0;
    top: 40%;
}
.result-box p{
    padding: 0 20px;
}
</style>
