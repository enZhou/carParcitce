<!-- 我的收藏 -->
<template>
  <div>
    <!-- tab切换操作 -->
    <commonNav :active="active" :showType="showType" @changeModal="changeType">
      <template slot="content">
        <div v-show="active === 'answer'">
          <question :info='false'></question>
          <!-- 底部操作等 -->
          <question-footer :del="true"></question-footer>
        </div>
        <div v-show="active === 'recite'">
          <question :info='true'></question>
          <!-- 底部操作 -->
          <question-footer :del="true"></question-footer>
        </div>
      </template>
    </commonNav>
  </div>
</template>
<script>
import commonNav from "../../components/commonNav.vue";
import questionFooter from "../../components/questionFooter.vue";
import Question from "../../components/question.vue";
export default {
  components: {
    commonNav,
    questionFooter,
    Question
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