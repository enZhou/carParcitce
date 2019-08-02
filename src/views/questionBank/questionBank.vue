<template>
  <div class="questionBank">
    <!-- 答题/背题模式切换 -->
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
    <p class="bank-title">选择题库类型</p>
    <stuFooter></stuFooter>
  </div>
</template>
<script>
import stuFooter from "../../components/stuFooter";
import newHead from "../../components/newHead";
// import commonNav from "../../components/commonNav.vue";
export default {
  components: { newHead, stuFooter },
  data() {
    return {
      title: "驾考题库",
      active: "answer",//默认答题模式
      showType:'tab'
    };
  },
  methods: {
    // 选择模式
    changeType(val) {
      let self = this;
      self.active = val;
    }
  }
};
</script>
<style scoped lang="scss">
.questionBank{
  .bank-title{
    font-size: 1rem;
    padding: 1rem;
    background-color: #1B82D1;
  }
}
</style>

