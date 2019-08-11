<!-- 背题模式 -->
<template>
  <div class="question_box">
    <div class="question_title">
      <span v-if="currentData.item3!=null">单选</span>
      <span v-if="!currentData.item3||currentData.item3==null">判断</span>
      <span v-if="false">多选</span>
      <span>{{currentData.question}}</span>
    </div>
    {{
    currentData.url
    }}
    <img :src="currentData.url || ''" alt />
    <ul class="option_box" ref="option_box">
      <li v-if="currentData.item1" @click="chooseOption(1)">
        <span
          class="activeCorrect iconfont icon-duigoutianchong-"
          v-if="currentData.answer == 1 && answerType"
        ></span>
        <span
          class="activeErr iconfont icon-cuowuguanbi-"
          v-else-if="currentData.answer !== 1 && answer ==1"
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
          v-else-if="currentData.answer !== 2 && answer ==2"
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
          v-else-if="currentData.answer !== 3 && answer ==3"
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
          v-else-if="currentData.answer !== 4 && answer ==4"
        ></span>
        <div class="option" v-else>D</div>
        <span>{{currentData.item4}}</span>
      </li>
    </ul>
    <div class="questionInfo" v-if="isInfo">
      <div class="info_title">
        <span class="title">试题详解</span>
      </div>

      <div class="info_content">{{currentData.explains}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      answer: null,
      answerType: false,
      isInfo: false
    };
  },
  props: {
    //show:显示试题详解，hide:隐藏试题详情
    info: {
      type: Boolean,
      default: false
    },
    currentData: {
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
  methods: {
    chooseOption(answer) {
      const vm = this;
      if (vm.answerType) {
        return;
      }
      vm.answerType = true;
      vm.answer = answer;
      vm.isInfo = true;
      let currentBox = vm.getDocement("option")[answer - 1];
      if (answer !== vm.currentData.answer) {
        currentBox.classList.add("activeErr");
      }
    },
    getDocement(className) {
      let div = document.getElementsByClassName("question_box")[0];
      return div.getElementsByClassName(className);
    },
    // 每次答题完成恢复默认
    resetType() {
      const vm = this;
      vm.answer = null;
      vm.answerType = false;
      vm.isInfo = false;
      console.log(1231232)
    }
  },
  watch: {
    info(val, oldVal) {
      const vm = this;
      if (vm.answerType) {
        return;
      } else {
        vm.isInfo = val;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.question_box {
  padding: 0.6rem 0.4rem;
  line-height: 0.5rem;
  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
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