<!-- 我的错题 -->
<template>
  <div>
    <commonNav :active="active" :showType="showType" @changeModal="changeType">
      <template slot="content">
        <div v-show="active === 'answer'">
          <answer-question></answer-question>
          <!-- 底部操作等 -->
          <questionFooter :del="true" :uncollected="true"></questionFooter>
        </div>
        <div v-show="active === 'recite'">
          <recite-question></recite-question>
          <questionFooter :del="true" :uncollected="true"></questionFooter>
        </div>
      </template>
    </commonNav>
  </div>
</template>
<script>
import commonNav from "../../components/commonNav.vue";
import questionFooter from "../../components/questionFooter.vue";
import answerQuestion from "../../components/answerQuestion.vue";
import reciteQuestion from "../../components/reciteQuestion.vue";
export default {
  components: {
    commonNav,
    questionFooter,
    answerQuestion,
    reciteQuestion
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

