<!-- 背题模式 -->
<template>
  <div class="question_box">
    <div class="question_title">
      <span class="_titleType" v-if="currentData.item3!=''">单选</span>
      <span class="_titleType" v-if="!currentData.item3||currentData.item3==''">判断</span>
      <span class="_titleType" v-if="currentData.answer.length>2">多选</span>
      <span>{{currentData.question}}</span>
    </div>
    <img v-if="currentData.url&&judgeSwfFiles(currentData.url)" :src="currentData.url || ''" alt />
    <video
      v-if="currentData.url&&!judgeSwfFiles(currentData.url)"
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
      <li v-if="currentData.item1" @click="chooseOption(1)">
        <span
          class="activeCorrect iconfont icon-duigoutianchong-"
          v-if="currentData.answer == 1 && answerType"
        ></span>
        <span
          class="activeErr iconfont icon-cuowuguanbi-"
          v-else-if="currentData.answer !== 1 && answer ==1 && showErr"
        ></span>
        <div class="option" v-else>
          <span>A</span>
        </div>
        <span>{{currentData.item1}}</span>
      </li>
      <li v-if="currentData.item2" @click="chooseOption(2)">
        <span
          class="activeCorrect iconfont icon-duigoutianchong-"
          v-if="currentData.answer == 2 && answerType"
        ></span>
        <span
          class="activeErr iconfont icon-cuowuguanbi-"
          v-else-if="currentData.answer !== 2 && answer ==2 && showErr"
        ></span>
        <div class="option" v-else>B</div>
        <span>{{currentData.item2}}</span>
      </li>
      <li v-if="currentData.item3" @click="chooseOption(3)">
        <span
          class="activeCorrect iconfont icon-duigoutianchong-"
          v-if="currentData.answer == 3 && answerType"
        ></span>
        <span
          class="activeErr iconfont icon-cuowuguanbi-"
          v-else-if="currentData.answer !== 3 && answer ==3 && showErr"
        ></span>
        <div class="option" v-else>C</div>
        <span>{{currentData.item3}}</span>
      </li>
      <li v-if="currentData.item4" @click="chooseOption(4)">
        <span
          class="activeCorrect iconfont icon-duigoutianchong-"
          v-if="currentData.answer == 4 && answerType"
        ></span>
        <span
          class="activeErr iconfont icon-cuowuguanbi-"
          v-else-if="currentData.answer !== 4 && answer ==4 && showErr"
        ></span>
        <div class="option" v-else>D</div>
        <span>{{currentData.item4}}</span>
      </li>
    </ul>
    <div v-if="showErrExplain">
      <div class="questionInfo" v-if="isInfo">
        <div class="info_title">
          <span class="title">试题详解</span>
        </div>
        <div class="info_content" v-html="currentData.explains"></div>
        <div class="info_content" v-html="currentData.explains"></div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../api/common.js";
import { getStore } from "../common/util.js";
export default {
  data() {
    return {
      answer: null,
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
  mounted() {
    const vm = this;
    vm.userInfo = JSON.parse(getStore("loginInfo"));
  },
  methods: {
    chooseOption(answer) {
      const vm = this;
      if (vm.answerType) {
        return;
      }
      vm.answerType = true;
      vm.answer = answer;
      vm.isInfo = true;
      vm.showErr = true;
      vm.$emit("driveimgRead", vm.currentData.id, answer);
      vm.$emit(
        "yetTipicList",
        vm.currentData.id,
        vm.currentData.answer,
        answer
      );
      vm.currentData.currentType = true;
    },
    getDocement(className) {
      return document.querySelectorAll(`.${className}`);
    },
    // 每次答题完成恢复默认
    resetType() {
      const vm = this;
      vm.answer = null;
      vm.isInfo = false;
      vm.showErr = false;
      vm.answerType = false;
    },
    judgeSwfFiles(file) {
      if (file.indexOf(".mp4") == 0) {
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
          vm.chooseOption(vm.answer);
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
</style>