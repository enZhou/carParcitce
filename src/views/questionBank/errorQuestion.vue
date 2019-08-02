<!-- 我的错题 -->
<template>
  <div>
    <commonNav :active="active" :showType="showType" @changeModal="changeType">
      <template slot="content">
        <div v-show="active === 'answer'">
          答题模式内容
        </div>
        <div v-show="active === 'recite'">
          背题模式内容
        </div>
      </template>
    </commonNav>
  </div>
</template>
<script>
import commonNav from "../../components/commonNav.vue";
export default {
  components: {
    commonNav
  },
  data() {
    return {
      active: "answer",
      showType: "tab"
    };
  },
  methods: {
    //选择模式
    changeType(val) {
      let self = this;
      self.active = val;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

