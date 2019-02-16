<template>
    <div class="editor-container">
        <AceEditor :fontSize="14"
                   :showPrintMargin="true"
                   :showGutter="true"
                   :highlightActiveLine="true"
                   :readOnly="!canType"
                   :enableBasicAutocompletion = "true"
                   :onChange="textEntered"
                   :value="code"
                   height="100%"
                   mode="python"
                   theme="vibrant_ink"
        >

        </AceEditor>
        <button @click="submitCode">submit</button>
        {{this.result}}
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
            canType: true,
            result: [],
            code:
`def f:
    print('hi')`
        }
    },
    components: {
        AceEditor
    },
    methods: {
        textEntered(value){
            this.code = value;
            console.log('text is now'+value);
            this.db.ref('code').update({
                text: this.code
            });
        },
        submitCode(){
            console.log('submitted')
            const toSubmit = this.code;
            axios.post('http://localhost:3000/submit', {
                qnum: "q2",
                code: toSubmit
            }).then(response =>{
                this.result = response.data;
                console.log(this.result);
            }).catch(err=>{
                console.error(err);
            })
        }
    },
    mounted(){
        this.db.ref('code/text').on('value', data=>{
            console.log(data.val());
            this.code = data.val();
        });
    },
}

</script>

<style>
.editor-container{
    height: 80vh;
}

</style>
