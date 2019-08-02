<!-- 背题模式 -->
<template>
  <div class="question_box">
    <div class="question_title">
      <span v-if="false">单选 </span>
      <span>判断 </span>
      <span v-if="false">多选 </span>
      <span>
        这辆小型载客汽车驶离高速公路行车道的方法是正确的。
      </span>
    </div>
    <img src="../assets/img/img.png" alt="" />
    <ul class="option_box">
      <li>
        <div class="option">A</div>
        <span>正确</span>
      </li>
      <li>
        <div class="option">B</div>
        <span>错误</span>
      </li>
    </ul>
    <div class="questionInfo">
      <div class="info_title">
        <span class="title">试题详解</span>
      </div>

      <div class="info_content">
        违反《道路交通安全法》，属于违法行为官方已无违规、违章的说法。
      </div>
    </div>
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
.questionInfo {
  width: 100%;
  margin-top: 0.4rem;
  .info_title {
    position: relative;
    text-align: center;

    &:before {
      content: "";
      position: absolute;
      top: 0.2rem;
      left: 1.2rem;
      height: 1px;
      border: 1px solid #f0f0f0;
      width: 0.8rem;
    }
    &:after {
      content: "";
      position: absolute;
      top: 0.2rem;
      right: 1.2rem;
      height: 1px;
      border: 1px solid #f0f0f0;
      width: 0.8rem;
    }
  }
  .info_content{
      line-height: 0.5rem;
      img{
          max-width: 100%;
          display: block;
          margin: 0 auto;
      }
  }
}
</style>
