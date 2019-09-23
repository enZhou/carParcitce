

<!-- 背题模式 -->
<template>
  <div class="question_box">
    <div class="question_title">
      <span class="_titleType" v-if="currentData.answer.length>=2">多选</span>
      <span class="_titleType" v-else-if="currentData.item3!=''">单选</span>
      <span class="_titleType" v-else-if="!currentData.item3||currentData.item3==''">判断</span>
      <span>{{currentData.question}}</span>
    </div>
    <img v-if="currentData.url&&!judgeSwfFiles(currentData.url)" :src="currentData.url || ''" alt />
    <video
      v-if="currentData.url&&judgeSwfFiles(currentData.url)"
      autoplay="autoplay"
      :src="currentData.url"
      controls="controls"
      style="width:100%"
      height="200px"
      webkit-playsinline
      playsinline
      x5-playsinline
      x-webkit-airplay="allow"
    >您的浏览器不支持 video 标签。</video>
    <ul class="option_box" ref="option_box">
      <li v-if="currentData.item1" @click="chooseOption($event,1)">
        <span
          class="activeCorrect iconfont icon-duigoutianchong-"
          v-if="currentData.changeAnswer.indexOf('1')!==-1&& answerType"
        ></span>
        <span
          class="activeErr iconfont icon-cuowuguanbi-"
          v-else-if="currentData.changeAnswer.indexOf('1')===-1 && answer.indexOf('1')!==-1 && showErr"
        ></span>
        <div ref="option_li1" class="option" v-else>A</div>
        <span>{{currentData.item1}}</span>
      </li>
      <li v-if="currentData.item2" @click="chooseOption($event,2)">
        <span
          class="activeCorrect iconfont icon-duigoutianchong-"
          v-if="currentData.changeAnswer.indexOf('2')!==-1&& answerType"
        ></span>
        <span
          class="activeErr iconfont icon-cuowuguanbi-"
          v-else-if="currentData.changeAnswer.indexOf('2')===-1 && answer.indexOf('2')!==-1 && showErr"
        ></span>
        <div ref="option_li2" class="option" v-else>B</div>
        <span>{{currentData.item2}}</span>
      </li>
      <li v-if="currentData.item3" @click="chooseOption($event,3)">
        <span
          class="activeCorrect iconfont icon-duigoutianchong-"
          v-if="currentData.changeAnswer.indexOf('3')!==-1&& answerType"
        ></span>
        <span
          class="activeErr iconfont icon-cuowuguanbi-"
          v-else-if="currentData.changeAnswer.indexOf('3')===-1 && answer.indexOf('3')!==-1 && showErr"
        ></span>
        <div ref="option_li3" class="option" v-else>C</div>
        <span>{{currentData.item3}}</span>
      </li>
      <li v-if="currentData.item4" @click="chooseOption($event,4)">
        <span
          class="activeCorrect iconfont icon-duigoutianchong-"
          v-if="currentData.changeAnswer.indexOf('4')!==-1&& answerType"
        ></span>
        <span
          class="activeErr iconfont icon-cuowuguanbi-"
          v-else-if="currentData.changeAnswer.indexOf('4')===-1 && answer.indexOf('4')!==-1 && showErr"
        ></span>
        <div ref="option_li4" class="option" v-else>D</div>
        <span>{{currentData.item4}}</span>
      </li>
    </ul>
    <button
      class="checkAnswer"
      v-if="currentData.changeAnswer.length>=2"
      @click="chooseOptionTwo"
    >确定答案</button>
    <div v-if="showErrExplain">
      <div class="questionInfo" v-if="isInfo">
        <div class="info_title">
          <span class="title">试题详解</span>
        </div>
        <div class="info_content" v-html="currentData.explains"></div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import api from "../api/common.js";
import { getStore } from "../common/util.js";
export default {
  data() {
    return {
      userAnswer: {
        1: null,
        2: null,
        3: null,
        4: null
      },
      answer: "",
      answerList: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        12: "7",
        13: "8",
        14: "9",
        23: "10",
        24: "11",
        34: "12",
        123: "13",
        124: "14",
        134: "15",
        234: "16",
        1234: "17"
      },
      changeAnswer: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        7: "12",
        8: "13",
        9: "14",
        10: "23",
        11: "24",
        12: "34",
        13: "123",
        14: "124",
        15: "134",
        16: "234",
        17: "1234"
      },
      answerType: false,
      isInfo: false,
      showErr: false, // 是否显示错误答案
      userInfo: null,
      showErrExplain: this.isShowErrExplain,
      currentData: Object.assign({}, this.topicInfo) // 题目信息
    };
  },
  props: {
    //show:显示试题详解，hide:隐藏试题详情
    info: {
      type: Boolean,
      default: false
    },
    isShowErrExplain: {
      type: Boolean,
      default: false
    },
    oldAnswer: {
      type: String,
      default: ""
    },
    topicInfo: {
      type: Object,
      default: {
        id: null,
        question: null,
        answer: null,
        item1: null,
        item2: null,
        item3: null,
        item4: null,
        explains: null,
        url: null
      }
    }
  },
  created() {
    let vm = this;
    if(vm.$route.name === 'errorQuestion' || vm.$route.name === 'questionCollect'){
      vm.radioClcik(vm.currentData.answer)
    }
  },
  mounted() {
    const vm = this;
    vm.userInfo = JSON.parse(getStore("loginInfo"));
  },
  methods: {
    // 点击选项
    chooseOption(e, answer) {
      const vm = this;
      if (vm.answerType) {
        return;
      }
      if (vm.currentData.changeAnswer.length <= 1) {
        vm.radioClcik(answer + "");
      } else {
        vm.checkClcik(e, answer);
      }
    },
    // 单选题
    radioClcik(answer) {
      let vm = this;
      vm.answerType = true;
      vm.answer = answer;
      vm.isInfo = true;
      vm.showErr = true;
      vm.$emit("driveimgRead", vm.currentData.id, vm.answerList[answer]);
      vm.$emit(
        "yetTipicList",
        vm.currentData.id,
        vm.currentData.answer,
        vm.answerList[answer]
      );
      vm.currentData.currentType = true;
    },
    // 多选题
    checkClcik(e, answer) {
      let vm = this;
      if ($(vm.$refs[`option_li${answer}`]).hasClass("green")) {
        $(vm.$refs[`option_li${answer}`]).removeClass("green");
        vm.userAnswer[answer] = null;
      } else {
        vm.userAnswer[answer] = answer;
        $(vm.$refs[`option_li${answer}`]).addClass("green");
      }
    },
    // 多选确认
    chooseOptionTwo() {
      let vm = this;
      let answer = "";
      if (vm.answerType) {
        return;
      }
      for (const key in vm.userAnswer) {
        if (vm.userAnswer.hasOwnProperty(key)) {
          const element = vm.userAnswer[key];
          if (element) {
            answer += element;
          }
        }
      }
      if (!answer || answer === "" || answer.length < 2) {
        this.$toast("至少选择两个答案", true);
        return;
      }
      vm.radioClcik(answer);
    },
    getDocement(className) {
      return document.querySelectorAll(`.${className}`);
    },
    // 每次答题完成恢复默认
    resetType() {
      const vm = this;
      vm.answer = "";
      vm.isInfo = false;
      vm.showErr = false;
      vm.answerType = false;
    },
    judgeSwfFiles(file) {
      if (file.indexOf(".mp4") !== -1) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    topicInfo(val, oldval) {
      let vm = this;
      vm.currentData = Object.assign({}, val);
      if (!vm.info) {
        vm.resetType();
      }
    },
    isShowErrExplain(val, old) {
      let vm = this;
      vm.showErrExplain = val;
    },
    info(val, oldVal) {
      const vm = this;
      vm.isInfo = val;
      if (!vm.answer) {
        if (val) {
          vm.answerType = true;
        } else {
          vm.answerType = false;
        }
      } else {
        if (val) {
          vm.answerType = true;
          vm.showErr = false;
        } else {
          vm.answerType = false;
          vm.radioClcik(vm.answer);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.question_box {
  padding: 0.6rem 0.4rem;
  line-height: 0.5rem;
  position: relative;
  height: 100%;
  overflow-y: auto;
  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }
  ._titleType {
    font-size: 0.2rem;
    padding: 3px;
    background: rgba(251, 110, 82, 1);
    border-radius: 8px 8px 0 8px;
    color: #fff;
    margin-right: 3px;
  }
  .checkAnswer {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 0.2rem 0.5rem;
    margin-top: 5%;
    border: none;
    background-color: #fb6e52;
    color: white;
    border-radius: 0.1rem;
    cursor: pointer;
  }
}
.option_box {
  width: 100%;
  li {
    line-height: 0.8rem;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    .option {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      border: 1px solid #f0f0f0;
      margin-right: 0.2rem;
    }
  }
  .activeCorrect {
    font-size: 0.5rem;
    margin-right: 0.2rem;
    color: #24c27d;
  }
  .activeErr {
    font-size: 0.5rem;
    margin-right: 0.2rem;
    color: #fb6e52;
  }
}
.questionInfo {
  width: 100%;
  margin-top: 0.4rem;
  .info_title {
    text-align: center;
    &:before {
      content: "————";
      color: #f0f0f0;
      letter-spacing: -0.1rem;
      margin-right: 0.2rem;
    }
    &:after {
      content: "————";
      letter-spacing: -0.1rem;
      color: #f0f0f0;
      margin-left: 0.2rem;
    }
  }
  .info_content {
    line-height: 0.5rem;
    img {
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
  }
}
.green {
  background: #ccc !important;
  color: #fff !important;
}
</style>