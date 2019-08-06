<template>
  <div id="app">
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "./style/reset.scss";
@import "./style/common.scss";
@import "~@/assets/iconfont/iconfont.css";
@import "~@/assets/bankIconFont/iconfont.css";
.slide-enter-active,
.slide-leave-active {
  opacity: 0.5;
  transition: all 0.3s;
}
.slide-enter,
.slide-leave {
  opacity: 0;
}
</style>
