<!-- 模拟考试 -->
<template>
  <div>
    <common-nav :showType="showType"></common-nav>
    <!-- 题目 -->
    <question :info="true"></question>
    <!-- 底部操作 -->
    <question-footer :submit='true' :uncollected='true'></question-footer>
  </div>
</template>
<script>
import commonPage from "../../components/commonPage.vue";
import Question from "../../components/question.vue";
import questionFooter from "../../components/questionFooter.vue";
export default {
  components: {
    commonPage,
    Question,
    questionFooter
  },
  data() {
    return {
      showType: "time",
    };
  },
  methods: {}
};
</script>
