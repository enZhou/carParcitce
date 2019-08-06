<!-- 答题底部 收藏错题等 -->
<template>
  <div class="question_bottom">
    <div class="option left">
      <div class="submit f-c-2AC782" v-if="submit === true">
        🆚 交卷
      </div>
      <div class="del" v-if="del === true">
        🚮 移除
      </div>
      <div class="uncollected" v-if="uncollected === true">
        ⭐️ 收藏
      </div>
      <div class="collected" v-if="collected === true">
        ⭐️ 已收藏
      </div>
    </div>
    <div class="option right">
      <div class="correct f-c-2AC782">
        √ 1
      </div>
      <div class="error f-c-FB6E52">
        X 1
      </div>
      <div class="menu">
        口 1/22
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    submit: {
      type: Boolean,
      default: false
    },
    del: {
      type: Boolean,
      default: false
    },
    uncollected: {
      type: Boolean,
      default: false
    },
    collected: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.question_bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  background-color: #f7f7f9;
  border-top: 1px solid #e1e0e0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding: 0 0.2rem;
  .option {
    width: 40%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
}
.f-c-2AC782{
  color: #2AC782;
}
.f-c-FB6E52{
  color: #FB6E52;
}
</style>
