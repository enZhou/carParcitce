<!-- 公共头部 -->
<template>
  <div class="content">
    <!-- tab -->
    <div class="tab-header">
      <span>＜</span>
      <div class="tabs">
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
      <span>设置</span>
    </div>
    <!-- 内容  -->
    <div class="tab-body">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
    };
  },
  props: {
    active: {
      type: String,
      default: "answer"
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
  height: 50px;
  padding: 0 10px;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
  .tabs {
    display: flex;
    flex-wrap: nowrap;
    border-radius: 4px;
    overflow: hidden;
    .tab {
      padding: 5px 10px;
      background-color: #f1f1f1;
    }
    .active {
      background-color: #1b82d1;
      color: #f7f7f9;
    }
  }
}
</style>
