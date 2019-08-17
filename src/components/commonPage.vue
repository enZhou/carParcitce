<!-- 公共头部 -->
<template>
  <div class="content">
    <!-- tab -->
    <div class="tab-header">
      <span class="iconfont return" @click="$router.back(-1)">&#xe62a;</span>
      <div class="tabs" v-if="showType === 'tab'">
        <div
          class="tab"
          :class="{ active: item.type === active }"
          v-for="(item, index) in navList"
          :key="index"
          @click="changemodal(item.type)"
        >
          {{ item.name }}
        </div>
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
        <span v-if="showSetting" @click="showSetMenu = !showSetMenu">设置</span>
      </div>
    </div>
    <!-- tab内容  -->
    <div class="tab-body" v-if="showType === 'tab'">
      <slot name="content"></slot>
    </div>
    <div
      class="mask"
      v-if="showSetMenu == true"
      @click="showSetMenu = !showSetMenu"
    ></div>
    <div class="setContent" v-if="showSetMenu == true">
      <ul>
        <li>
          <span class="title">答对跳转下一题</span>
          <input class="switch switch-anim" @change="check()" type="checkbox" />
        </li>
        <li>
          <span class="title">答错展示试题详解</span>
          <input class="switch switch-anim" @change="check()" type="checkbox" />
        </li>
        <li>
          <span class="title">提示声音</span>
          <input class="switch switch-anim" @change="check()" type="checkbox" />
        </li>
        <li>
          <span class="title">主题切换</span>
          <div>
            <div>标准</div>
            <div>夜间</div>
          </div>
        </li>
        <li>
          <span class="title">字体大小</span>
          <div class="fontList">
            <span class="font small">A标准</span>
            <span class="font middle">A大号</span>
            <span class="font big">A超大号</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      countdownType: true, // 倒计时状态
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
      showSetMenu: false
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
  mounted() {
    this.Countdown();
  },
  destroyed() {
    this.Countdown();
  },
  methods: {
    changemodal(type) {
      let self = this;
      self.$emit("changeModal", type);
    },
    Countdown() {
      const startTime = Date.parse(new Date());
      // 初始化倒计时
      this.init = function() {
        var endTime = startTime + 24 * 60 * 60 * 1000; // 结束时间
        var timeLeft = endTime - new Date().getTime(); // 剩余时间

        // 格式化时间
        var minutes = parseInt((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = parseInt((timeLeft % (1000 * 60)) / 1000);
        this.times =
          (minutes < 10 ? "0" + minutes : minutes) +
          ":" +
          (seconds < 10 ? "0" + seconds : seconds);
        // 轮询计算时间
        var that = this;
        setInterval(function() {
          that.init();
        }, 1000);
      };
      this.init();
    },
    // 设置开关
    check() {
      const vm = this;
      vm.$emit('closeInfo',);
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
</style>
