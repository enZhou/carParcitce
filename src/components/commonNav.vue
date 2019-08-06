<!-- 公共头部 -->
<template>
  <div class="content">
    <!-- tab -->
    <div class="tab-header">
      <!-- <span>＜</span> -->

      <span class="iconfont return">&#xe62a;</span>
      <div class="tabs" v-if="showType === 'tab'">
        <div
          class="tab"
          :class="{ active: item.type === active }"
          v-for="(item, index) in navList"
          :key="index"
          @click="changemodal(item.type)"
        >{{ item.name }}</div>
      </div>
      <!-- 倒计时 -->
      <div class="time" v-if="showType === 'time'">
        <!-- 开始 -->
        <span class="iconfont countdown" v-if="countdownType">&#xe615;</span>
        <!-- 暂停 -->
        <span class="iconfont countdown" v-if="!countdownType">&#xe67a;</span>
        倒计时44:29
      </div>
      <span>设置</span>
    </div>
    <!-- tab内容  -->
    <div class="tab-body" v-if="showType === 'tab'">
      <slot name="content"></slot>
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
      ]
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
    }
  },
  methods: {
    changemodal(type) {
      let self = this;
      self.$emit("changeModal", type);
    }
  }
};
</script>
<style lang="scss" scoped>
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
</style>
