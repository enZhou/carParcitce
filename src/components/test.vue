<template>
    <div>
            {{dataInfo}}
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{
        dataInfo:{
            type:Object,
            default:{}
        }
    },
    mounted(){
        console.error(this.dataInfo)
    }
}
</script>