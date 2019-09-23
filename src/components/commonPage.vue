<!-- 公共头部 -->
<template>
  <div class="content" v-if="showContent">
    <!-- tab -->
    <div class="tab-header">
      <div>
        <span class="iconfont return" @click="goBack">&#xe62a;</span>
      </div>
      <div class="tabs" v-if="showType === 'tab'">
        <div
          class="tab"
          v-if="showAnswer"
          :class="{ active: 'answer' === active }"
          @click="changemodal('answer')"
        >答题模式</div>
        <div
          class="tab"
          :class="{ active: 'recite' === active }"
          @click="changemodal('recite')"
        >背题模式</div>
      </div>

      <!-- 倒计时 -->
      <div class="time" v-if="showType === 'time'">
        <!-- 开始 -->
        <span class="iconfont countdown" v-if="countdownType">&#xe615;</span>
        <!-- 暂停 -->
        <span class="iconfont countdown" v-if="!countdownType">&#xe67a;</span>
        倒计时{{ times }}
      </div>
      <div class="txt" v-if="showType === 'txt'">
        <slot name="txt"></slot>
      </div>
      <div>
        <!-- <span v-if="showSetting" @click="showSetMenu = !showSetMenu">设置</span> -->
      </div>
    </div>
    <!-- tab内容  -->
    <div class="tab-body" v-if="showType === 'tab'">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
const timeOutVal = 45; // 考试时间 分
export default {
  data() {
    return {
      countdownType: true, // 倒计时状态
      showAnswer: true,
      navList: [
        {
          name: "答题模式",
          type: "answer"
        },
        {
          name: "背题模式",
          type: "recite"
        }
      ],
      times: "",
      showContent: true,
      sumTimeOut: 0, // 倒计时
      motif: "criteria" //主题
    };
  },
  props: {
    // tab答题背题模式默认为答题模式
    active: {
      type: String,
      default: "answer"
    },
    // tab：tab切换，time：倒计时显示
    showType: {
      type: String,
      required: true,
      default: ""
    },
    showSetting: {
      type: Boolean,
      default: true
    }
  },
  created() {
    let vm = this;
    document.title = vm.changeTitle(this.$route.path, this.$route.query.type);
  },
  mounted() {
    let vm = this;
    if (vm.showType === "time") {
      this.Countdown();
    }
  },
  destroyed() {
    this.Countdown();
  },
  methods: {
    changeTitle(url, type) {
      let vm = this;
      let title = "";
      if (type === "1") {
        title = "科目一";
      } else if (type === "4") {
        title = "科目四";
      } else {
        title = "";
      }
      switch (url) {
        case "/errorQuestion/":
          title += "->我的错题";
          vm.showAnswer = false;
          vm.changemodal("recite");
          break;
        case "/mockExam/":
          title += "->模拟考试";
          break;
        case "/questionCollect/":
          title += "->我的收藏";
          vm.showAnswer = false;
          vm.changemodal("recite");
          break;
        case "/questionOrder/":
          title += "->顺序练习";
          break;
        case "/specialPractice/":
          title += "-专项练习";
          break;
        case "/examScores/":
          title += "-考试成绩";
          break;
        default:
          title += "教练通";
          vm.showAnswer = true;
      }
      return title;
    },
    goBack() {
      let vm = this;
      vm.$router.replace(
        `/questionBank/?type=${vm.$route.query.type || "1"}`
      );
    },
    changemodal(type) {
      let self = this;
      self.$emit("changeModal", type);
    },
    Countdown() {
      let vm = this;
      const startTime = Date.parse(new Date());
      vm.sumTimeOut = timeOutVal * 60;
      if (vm.sumTimeOut <= 0) {
        clearInterval(interval);
      }
      let interval = setInterval(() => {
        vm.sumTimeOut--;
        let min = parseInt(vm.sumTimeOut / 60);
        let sec = parseInt(vm.sumTimeOut - min * 60);
        vm.times =
          (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
      }, 999);
    },
    // 考试时间
    getTime() {
      let vm = this;
      return timeOutVal * 60 - vm.sumTimeOut;
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  .tab-header {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    padding: 0 0.2rem;
    font-size: 14px;
    border-bottom: 1px solid #f0f0f0;
    .return {
      color: #4b4b4b;
    }
    .tabs {
      display: flex;
      flex-wrap: nowrap;
      border-radius: 0.1rem;
      overflow: hidden;
      .tab {
        padding: 0.1rem 0.2rem;
        background-color: #f1f1f1;
      }
      .active {
        background-color: #1b82d1;
        color: #f7f7f9;
      }
    }
    .time {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      .countdown {
        font-size: 0.24rem;
        margin-right: 4px;
      }
    }
  }
  .mask {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .setContent {
    position: fixed;
    width: 100%;
    background-color: #fff;
    z-index: 300;
    bottom: 0;
    left: 0;
    ul {
      width: 100%;
      li {
        width: 100%;
        height: 1.4rem;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.2rem;
        border-top: 1px solid #f1f1f1;
        .title {
          color: #333;
          font-size: 0.36rem;
        }
        .fontList {
          color: #333;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .font {
            display: block;
            padding: 0 0.1rem;
          }
          .small {
            font-size: 0.28rem;
          }
          .middle {
            font-size: 0.32rem;
          }
          .big {
            font-size: 0.36rem;
          }
        }
      }
    }
  }
}
.switch {
  width: 1.14rem;
  height: 0.56rem;
  position: relative;
  border: 1px solid #dfdfdf;
  background-color: #fdfdfd;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border-radius: 0.4rem;
  background-clip: content-box;
  display: inline-block;
  -webkit-appearance: none;
  user-select: none;
  outline: none;
}
.switch:before {
  content: "";
  width: 0.52rem;
  height: 0.52rem;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0.4rem;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
.switch:checked {
  border-color: #64bd63;
  box-shadow: #64bd63 0 0 0 0.32rem inset;
  background-color: #64bd63;
}
.switch:checked:before {
  left: 0.6rem;
}
.switch.switch-anim {
  transition: border cubic-bezier(0, 0, 0, 1) 0.4s,
    box-shadow cubic-bezier(0, 0, 0, 1) 0.4s;
}
.switch.switch-anim:before {
  transition: left 0.3s;
}
.switch.switch-anim:checked {
  box-shadow: #64bd63 0 0 0 0.32rem inset;
  background-color: #64bd63;
  transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s;
}
.switch.switch-anim:checked:before {
  transition: left 0.3s;
}
.setting-motif {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    .motif-box {
      display: block;
      width: 0.7rem;
      height: 0.7rem;
      padding: 0.1rem;
      font-size: 0.5rem;
      border-radius: 0.4rem;
      background-color: #b1b7be;
      color: #e5e5e5;
    }
  }
  .criteria {
    margin-right: 0.7rem;
  }
  .active {
    background-color: #00c356 !important;
  }
}
</style>
