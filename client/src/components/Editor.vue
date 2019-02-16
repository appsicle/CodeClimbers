<template>
    <div>
        <textarea name="" id="" cols="30" rows="10" @input="textEntered" v-model="code">

        </textarea>
        {{code}}
    </div>
</template>

<script>

export default{
    props: ['db', 'uid'],
    data(){
        return {
            code: '',
        }
    },
    mounted(){
        this.db.ref('code').on('child_changed', data=>{
           console.log(data.val());
           this.code = data.val();
        });
    },
    methods: {
        textEntered(){
            this.db.ref('code').update({
                text: this.code
            });
        }
    },

}

</script>