<template>
    <div class="display">
        insert quesiton here
        {{uid}}
    </div>
</template>

<script>
    export default{
        props: ['db', 'uid'],
        data(){
            return {
            }

        }
    }
</script>

<style>
    .display{
        width: 50%;
    }
</style>