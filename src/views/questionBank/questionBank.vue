<template>
  <div class="questionBank">
    <div class="bank-title">
      <p>选择题库类型</p>
    </div>
    <div class="bank-content">
      <div class="cnt_tab">
        <div class="cnt_tab_item" @click="changeType(0)">
          <span :class="bankType===0?'active':''">科目一</span>
        </div>
        <div class="cnt_tab_item" @click="changeType(1)">
          <span :class="bankType===1?'active':''">科目四</span>
        </div>
      </div>
      <div class="cnt_body_one" v-if="bankType==0">
        <p class="one_driverLicense_type">驾驶证类型</p>
        <div class="dlType_box">
          <div class="dlType_item">
            <div class="smallCar_img">
              <img src="../../assets/img/release.png" alt srcset />
            </div>
            <p>小车</p>
            <p>C1/C2/C3</p>
          </div>
          <div class="dlType_item">
            <div class="smallCar_img">
              <img src="../../assets/img/release.png" alt srcset />
            </div>
            <p>货车</p>
            <p>A2/B3</p>
          </div>
          <div class="dlType_item">
            <div class="smallCar_img">
              <img src="../../assets/img/release.png" alt srcset />
            </div>
            <p>客车</p>
            <p>A1/A3/B1</p>
          </div>
        </div>
      </div>
      <div class="cnt_body_four" v-if="bankType==1">科目四</div>
    </div>

    <stuFooter></stuFooter>
  </div>
</template>
<script>
import stuFooter from "../../components/stuFooter";
// import commonNav from "../../components/commonNav.vue";
export default {
  components: { stuFooter },
  data() {
    return {
      title: "驾考题库",
      bankType: 0, //科目类型
      showType: "tab"
    };
  },
  methods: {
    // 选择模式
    changeType(val) {
      let vm = this;
      vm.bankType = val;
    }
  }
};
</script>
<style scoped lang="scss">
.questionBank {
  .bank-title {
    padding: 0.3rem;
    background-color: #1b82d1;
    text-align: center;
    p {
      font-size: 0.4rem;
      color: #fff;
    }
  }
  .bank-content {
    .cnt_tab {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .cnt_tab_item {
        width: 50%;
        text-align: center;
        span {
          text-align: center;
          position: relative;
          display: inline-block;
          padding: 0.26rem;
          font-size: 0.28rem;
          font-weight: bold;
          color: #929292;
        }
        .active {
          color: #0f0f0f;

          &:before {
            content: "";
            position: absolute;
            top: 98.5%;
            left: 0;
            border: 1px solid red;
            border-radius: 2px;
            width: 100%;
          }
        }
      }
    }
    .cnt_body_one {
      padding: 0 0.3rem;
      .one_driverLicense_type {
        padding: 0.36rem 0;
      }
      .dlType_box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .dlType_item{
          background-color: #ccc;
          text-align: center;
          width: 30%;
        }
        .dlType_item:nth-child(2) {
          width: 40%;
          align-items: center;
          color: red;
          margin: 0 .2rem;
        }
      }
    }
  }
}
</style>

