<template>
  <div>{{dataInfo}}</div>
</template>
<script>
export default {
  data() {
    return {
      dataInfo: "12312312"
    };
  },
  // props:{
  //     dataInfo:{
  //         type:String,
  //         default:''
  //     }
  // },
  mounted() {
    console.error(this.dataInfo);
  }
};
</script>