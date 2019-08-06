<!-- 模拟考试 - 成绩 -->
<template>
  <div class="box">
    <div class="blueBg">
      <div class="bgColor"></div>
    </div>
    <div class="content">
      <div class="nav">
        <span>＜</span>
        <span>本次成绩</span>
      </div>
      <div class="scoreBox">
        <img class="header_img" src="../../assets/img/default_avatar.jpg" />
        <p class="bold_font">马路杀手</p>
        <p class="normal_font">一定是路修歪了！不知路在何方！</p>
        <p class="m-30">
          <span class="score">14</span>
          <span class="bold_font">分</span>
        </p>
        <ul>
          <li>
            <p>04:44</p>
            <span>考试用时</span>
          </li>
          <li>
            <p>不合格</p>
            <span>考试结果</span>
          </li>
          <li>
            <p>97分</p>
            <span>最佳成绩</span>
          </li>
        </ul>
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
.box {
  width: 100%;
  height: 100vh;
  background-color: #f1f1f1;
  .blueBg {
    position: relative;
    width: 100%;
    height: 50%;
    background: linear-gradient(left, #2ea9f2, #24b8e1);
    .bgColor {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 0;
      border-color: #f1f1f1 transparent;
      border-width: 0 0 1.4rem 100vw;
      border-style: solid;
    }
  }
  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    padding: 0 0.3rem;
    // 顶部操作
    .nav {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 1rem;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.2rem;
      span {
        color: #fff;
      }
    }
    // 分数样式
    .scoreBox {
      width: 100%;
      border-radius: 0.1rem;
      background-color: #fff;
      color: #515151;
      text-align: center;
      line-height: 0.5rem;
      padding-bottom: 1rem;
      margin-top: 3rem;

      // 头像
      .header_img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        margin-top: -0.6rem;
        margin-bottom: 0.4rem;
      }
      .m-30 {
        margin-top: 0.6rem;
        margin-bottom: 0.6rem;
      }
      .bold_font {
        color: #0f0f0f;
        font-size: 0.4rem;
        font-weight: 600;
      }
      .normal_font {
        font-size: 0.32rem;
      }
      .score {
        font-size: 1rem;
        font-weight: 600;
        color: #0f0f0f;
      }
      ul {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        li {
          width: 30%;
          font-size: 0.28rem;
          text-align: center;
          p {
            color: #1b82d1;
            font-size: 0.36rem;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
