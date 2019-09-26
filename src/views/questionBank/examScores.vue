<!-- 模拟考试 - 成绩 -->
<template>
  <div class="box">
    <div class="blueBg">
      <div class="bgColor"></div>
    </div>
    <div class="content">
      <div class="nav">
        <span class="iconfont" @click="goback">&#xe677;</span>
        <span>本次成绩</span>
      </div>
      <div class="scoreBox">
        <img class="header_img" src="../../assets/img/default_avatar.jpg" />
        <p class="bold_font">马路杀手</p>
        <p class="normal_font">一定是路修歪了！不知路在何方！</p>
        <p class="m-30">
          <span class="score">
            {{
            score
            }}
          </span>
          <span class="bold_font">分</span>
        </p>
        <ul>
          <li>
            <p>
              {{
              showTime
              }}
            </p>
            <span>考试用时</span>
          </li>
          <li>
            <p v-if="score<OFFSCORE">不合格</p>
            <p v-else>及格</p>
            <span>考试结果</span>
          </li>
          <li>
            <p>
              {{
              maxScore
              }}
              分
            </p>
            <span>最佳成绩</span>
          </li>
        </ul>
        <button class="lockError" @click="lockErr">查看错题</button>
      </div>
    </div>
  </div>
</template>
<script>
import { setStore, getStore, removeStore } from "../../common/util.js";
export default {
  data() {
    return {
      score: 0,
      maxScore: 0,
      time: null,
      showTime: "",
      OFFSCORE: 90, // 及格线
      showTitle: {},
      userInfo: null,
      failList: [
        {
          title: "马路杀手",
          cnt: "一定是路修歪了！不知路在何方！"
        },
        {
          title: "马路杀手",
          cnt: "东擦西挂，分不够扣"
        }
      ],
      passList: [
        {
          title: "秋名山车神",
          cnt: "秋名山跪求一战！"
        },
        {
          title: "道路宗师",
          cnt: "得心应手，技压群雄"
        }
      ]
    };
  },
  created() {
    let vm = this;
    let title = "";
    if (vm.$route.query.type == "1") {
      title = "科目一";
    } else if (vm.$route.query.type == "4") {
      title = "科目四";
    } else {
      title = "";
    }
    if (this.$route.name === "examScores") {
      title += "考试成绩";
    }

    vm.userInfo = JSON.parse(getStore("loginInfo"));
    document.title = title;
  },
  mounted() {
    let vm = this;
    if (Object.keys(vm.$route.query).length > 0) {
      if (vm.$route.query.type == 4) {
        vm.score = vm.$route.query.score * 2;
      } else {
        vm.score = vm.$route.query.score;
      }
      vm.maxScore = vm.$route.query.maxCore;
      vm.time = vm.$route.query.time;
    }
    if (vm.score < vm.OFFSCORE) {
      vm.showTitle =
        vm.failList[Math.floor(Math.random() * (vm.failList.length - 1))];
    } else {
      vm.showTitle =
        vm.failList[Math.floor(Math.random() * (vm.passList.length - 1))];
    }
    let min = parseInt(vm.time / 60);
    let sec = parseInt(vm.time - min * 60);
    vm.showTime =
      (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
  },
  methods: {
    goback() {
      this.$router.replace("questionBank");
    },
    lockErr() {
      let vm = this;
      if (
        getStore(`${vm.userInfo.user_id}vehicleListError`) &&
        JSON.parse(getStore(`${vm.userInfo.user_id}vehicleListError`)).length >
          0
      ) {
        vm.$router.replace(`examList/?type=${vm.$route.query.type}`);
      } else {
        vm.$toast("当前暂时没有错题！");
      }
    }
  },
  destroyed() {
    let vm = this;
    vm.score = 0;
    vm.maxScore = 0;
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
      margin-top: 2.02rem;

      // 头像
      .header_img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        margin-top: -0.6rem;
        margin-bottom: 0.4rem;
      }
      .m-30 {
        margin: 0.6rem 0;
        // margin-bottom: 0.6rem;
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
      .lockError {
        margin-top: 0.5rem;
        border-radius: 0.1rem;
        padding: 0.1rem 0.3rem;
        color: #fff;
        background-color: rgba(251, 110, 82, 1);
        cursor: pointer;
      }
    }
  }
}
</style>
