<!-- 答题模式 -->
<template>
  <div class="question_box">
    <div class="question_title">
      <span>单选 </span>
      <span v-if="false">判断 </span>
      <span v-if="false">多选 </span>
      <span>
        驾驶机动车在道路上违反道路交通安全法的行为，属于什么行为？
      </span>
    </div>
    <img v-if="false" src="../../assets/img/img.png" alt="" />
    <ul class="option_box">
      <li>
        <div class="option">A</div>
        <span>违章行为</span>
      </li>
      <li>
        <div class="option">B</div>
        <span>违法行为</span>
      </li>
      <li>
        <div class="option">C</div>
        <span>过失行为</span>
      </li>
      <li>
        <div class="option">D</div>
        <span>违规行为</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
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
}
</style>
