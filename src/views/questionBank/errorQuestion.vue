<!-- 我的错题 -->
<template>
  <div>
    <!-- tab切换操作 -->
    <commonPage :active="active" :showType="showType" @changeModal="changeType">
      <template slot="content">
        <div>
          <div class="question-box">
            <question
              v-if="active === 'answer' && showQuestion"
              :currentData="topicArr"
              :info="false"
              ref="question"
            ></question>
            <question
              v-if="active === 'recite' && showQuestion"
              :currentData="topicArr"
              :info="true"
              ref="question"
            ></question>
          </div>
          <!-- 底部操作等 -->
          <question-footer :del="true" :uncollected="true"></question-footer>
        </div>
      </template>
    </commonPage>
  </div>
</template>
<script>
import commonPage from "../../components/commonPage.vue";
import questionFooter from "../../components/questionFooter.vue";
import Question from "../../components/question.vue";
import api from "../../api/common.js";
import { getStore } from "../../common/util.js";
const INDEX = 0;
export default {
  components: {
    commonPage,
    questionFooter,
    Question
  },
  data() {
    return {
      active: "answer",
      showType: "tab",
      showQuestion: false,
      dataBase: {}, // 题目
      userInfo: null, // 用户信息
      topicArr: new Object() // 题目信息
    };
  },
  async created() {
    const vm = this;
    vm.userInfo = JSON.parse(getStore("loginInfo"));
    if (Object.keys(vm.$route.query).length > 0) {
      api
        .getDrivingOrder(vm.userInfo.user_id, vm.$route.query.type)
        .then(res => {
          vm.dataBase = res;
          vm.setCurrentData(res.list, res.last_read_id, data => {
            vm.topicArr = data;
            vm.showQuestion = true;
          });
        });
    }
  },
  mounted() {},
  methods: {
    //选择模式
    changeType(val) {
      let self = this;
      self.active = val;
    },
    // 处理数据
    setCurrentData(total, readId, callback) {
      const vm = this;
      let currentData = {};
      total.forEach((element, index) => {
        if (element.id === readId + "") {
          INDEX = index;
          currentData = element;
        }
      });
      if (!currentData.id) {
        currentData = total[INDEX];
      }
      callback(currentData);
    },
    resetModal() {
      const vm = this;
      vm.$refs.question.resetType();
    }
  }
};
</script>
<style lang="scss" scoped>
.question-box {
  position: absolute;
  width: 100%;
  height: 85%;
}
</style>
