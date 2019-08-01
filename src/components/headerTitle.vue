<template>
  <div>
    <header class="header_title">
      {{title}}
    </header>
  </div>
</template>

<script>
export default {
  props:{
    title:String
  },
  data(){
    return{
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header_title{
  width:100%;
  @include lh(.96rem);
  background: $color_red;
  color:#fff;
  font-size: .38rem;
}
</style>
