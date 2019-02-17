<template>
    <div class="editor-container">
        <AceEditor :fontSize="20"
                   :showPrintMargin="true"
                   :showGutter="true"
                   :highlightActiveLine="true"
                   :onChange="textEntered"
                   :value="code"
                   height="100%"
                   width="100%"
                   mode="python"
                   theme="vibrant_ink"
        >

        </AceEditor>
        <button class="submit-button" @click="submitCode">Submit</button>
        <button class="submit-button" @click="runCode">Run</button>
        {{uid}}
    </div>
</template>

<script>
import brace from 'brace';
import { Ace as AceEditor } from 'vue2-brace-editor';

import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/theme/xcode';
import 'brace/theme/vibrant_ink';
import axios from 'axios';

export default {
    props: ['db', 'uid'],
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
            this.db.ref('code').update({
                text: this.code
            });
        },
        submitCode(){
            var qnum;
            this.db.ref('code/selected').once('value', snapshot=>{
                qnum = snapshot.val().qnum;
            });
            const toSubmit = this.code;
            axios.post('http://localhost:3000/submit', {
                qnum: qnum,
                code: toSubmit
            }).then(response =>{
                this.result = response.data;
                console.log(this.result);
            }).catch(err=>{
                console.error(err);
            })
        },
        runCode(){
            const toRun = this.code;
            axios.post('http://localhost:3000/run', {
                code: toRun
            }).then(response =>{
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
        this.db.ref('code/current').on('value', snapshot=>{
            this.currentTyper = parseInt(snapshot.val());
        });
        this.db.ref('code').update({
            text: ''
        });
        this.db.ref('code/text').on('value', data=>{
            console.log(data.val());
            this.code = data.val();
        });
    },
    watch:{
        currentTyper: function(){
            console.log('current user changed')
            // var f = function f(event){
            //     event.preventDefault();
            //     console.log('keydown');
            //     return false;
            // };
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
    height: 80vh;
    width: 100%;
}
.submit-button{
    font-family: Roboto;
    text-align: center;
    border: 1px solid black;
    height: 36px;
    width: 120px;
    background-color: rgb(69, 90, 100);;
    color: white;
    border-radius: 4px;
    font-size: 14px;
    -webkit-box-shadow: -1px 0px 14px -4px rgba(0,0,0,0.75);
    -moz-box-shadow: -1px 0px 14px -4px rgba(0,0,0,0.75);
    box-shadow: -1px 0px 14px -4px rgba(0,0,0,0.75);
}

.submit-button:hover{
    opacity: .8;
    cursor: pointer;
}
</style>
