<template>
    <div>
        <h1>Timer</h1>
        {{seconds}}
        {{sTime}}
    </div>
</template>

<script>
    export default{
        data(){
            return {
                seconds: 30,

            }
        },
        props: ['sTime'],
        watch: {
          sTime: function(newVal){
            console.log("here");
          }
        }


    }

</script>
