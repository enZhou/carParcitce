<template>
  <!-- 专项练习 -->
  <div class="specialPractice">
    <commonPage :showType="'txt'" :showSetting="false">
      <span slot="txt" class="title">专项练习</span>
    </commonPage>
    <div class="_cnt">
      <div class="_cnt-item" v-for="(value,key,index) in practiceList" :key="index+1">
        <div class="_cnt-item-left">
          <div class="index-box">
            <div class="box-cnt">
              {{
              index
              }}
            </div>
          </div>
          <div class="_cnt-titl">
            {{
            practiceTxt[key]
            }}
          </div>
        </div>
        <div class="_cnt-val">
          {{
          value
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import commonPage from "../../components/commonPage.vue";
export default {
  components: { commonPage },
  data() {
    return {
      practiceList: {
        textNum: null, //文字题
        pictureNum: null, // 图片题
        correctNum: null, // 正确题
        errorNum: null, // 错误题
        judgeNum: null, // 判断题
        radioNum: null, // 单选题
        timeNum: null, // 时间题
        speedTime: null, // 速度题
        distance: null, // 距离题
        fineNum: null, // 罚款题
        markNum: null, // 标志题
        gestures: null, // 手势题
        signalNum: null, // 信号题
        scoreNum: null, // 记分题
        drunkenDrivingNum: null, // 酒驾题
        markingNum: null, // 标线题
        lightNum: null, // 灯光题
        deviceNum: null, // 装置题
        roadNum: null, // 路况题
        instrumentNum: null // 仪表题
      },
      practiceTxt: {
        textNum: "文字题",
        pictureNum: "图片题",
        correctNum: "正确题",
        errorNum: "错误题",
        judgeNum: "判断题",
        radioNum: "单选题",
        timeNum: "时间题",
        speedTime: "速度题",
        distance: "距离题",
        fineNum: "罚款题",
        markNum: "标志题",
        gestures: "手势题",
        signalNum: "信号题",
        scoreNum: "记分题",
        drunkenDrivingNum: "酒驾题",
        markingNum: "标线题",
        lightNum: "灯光题",
        deviceNum: "装置题",
        roadNum: "路况题",
        instrumentNum: "仪表题"
      }
    };
  },
  mounted() {
    const vm = this;
    vm.practiceList = {
      textNum: 687, //文字题
      pictureNum: 647, // 图片题
      correctNum: 337, // 正确题
      errorNum: 261, // 错误题
      judgeNum: 589, // 判断题
      radioNum: 736, // 单选题
      timeNum: 44, // 时间题
      speedTime: 46, // 速度题
      distance: 14, // 距离题
      fineNum: 4, // 罚款题
      markNum: 243, // 标志题
      gestures: 12, // 手势题
      signalNum: 54, // 信号题
      scoreNum: 37, // 记分题
      drunkenDrivingNum: 9, // 酒驾题
      markingNum: 72, // 标线题
      lightNum: 48, // 灯光题
      deviceNum: 41, // 装置题
      roadNum: 130, // 路况题
      instrumentNum: 65 // 仪表题
    };
  }
};
</script>
<style scoped lang="scss">
.specialPractice {
    .title{
        font-size: .38rem;
        font-weight: bold;
    }
  ._cnt {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    ._cnt-item {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 50%;
      padding: 0.39rem 0.5rem;
      &:nth-child(2n) {
        &:before {
          content: "";
          position: absolute;
          top: 100%;
          left: 0;
          width: 88%;
          height: 1px;
          background-color: #eee;
        }
      }
      &:nth-child(2n + 1) {
        &:before {
          content: "";
          position: absolute;
          top: 100%;
          left: 12%;
          width: 88%;
          height: 1px;
          background-color: #eee;
        }
      }
      ._cnt-item-left {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        .index-box {
          border: 1px solid #00c356;
          border-radius: 50%;
          padding: 2px;
          margin-right: 0.1rem;
          .box-cnt {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 0.24rem;
            width: 0.32rem;
            height: 0.32rem;
            background: #00c356;
            border-radius: 50%;
            color: #fff;
          }
        }
        ._cnt-titl {
          font-size: 0.3rem;
        }
      }
      ._cnt-val {
        color: #ababb3;
      }
    }
  }
}
</style>

