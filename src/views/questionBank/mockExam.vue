<!-- 模拟考试 -->
<template>
  <div>
    <common-page :showType="showType"></common-page>
    <!-- 题目 -->
    <question :info="true"></question>
    <span @click="showDialog">测试</span>
    <!-- 底部操作 -->
    <question-footer :submit='true' :uncollected='true'></question-footer>
    
    <question-dialog :is-show="isShow" 
      :title="dialogTitle" 
      :content='dialogContent'
      :closeBtnName='closeBtnName'
      :okBtnName="okBtnName"
      @closeClk='close'
      @okClk='ok'></question-dialog>
  </div>
</template>
<script>
import commonPage from "../../components/commonPage.vue";
import Question from "../../components/question.vue";
import questionFooter from "../../components/questionFooter.vue";
import questionDialog from "../../components/questionDialog.vue";
export default {
  components: {
    commonPage,
    Question,
    questionFooter,
    questionDialog
  },
  data() {
    return {
      showType: "time",
      isShow:false,
      dialogTitle:'成绩不合格',
      dialogContent:'你本次做对14道题，做错11道题 考试得分14分，考试不合格，确认',
      closeBtnName:'继续',
      okBtnName:'提交',
    };
  },
  methods: {
    showDialog:function(){
      let self = this;
      self.isShow = true;
    },
    close:function(){
      let self = this;
      self.isShow = false;
    },
    ok:function(){
      let self = this;
      self.isShow = false;
    }
  }
};
</script>
