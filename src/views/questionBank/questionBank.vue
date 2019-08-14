<template>
  <div class="questionBank">
    <div class="bank-title">
      <p>选择题库类型</p>
    </div>
    <div class="bank-content">
      <!-- 选择科目Tabs -->
      <div class="cnt_tab">
        <div class="cnt_tab_item" @click="changeType(0)">
          <span :class="bankType===0?'active':''">科目一</span>
        </div>
        <div class="cnt_tab_item" @click="changeType(1)">
          <span :class="bankType===1?'active':''">科目四</span>
        </div>
      </div>
      <div class="cnt_body_one">
        <!-- v-if="bankType==0" -->
        <!-- 驾驶证类型 -->
        <p class="one_driverLicense_type">驾驶证类型</p>
        <div class="dlType_box">
          <div class="dlType_item" :class="dlType===1?'active':''" @click="changeDlType(1)">
            <div class="item_Car_img">
              <img src="../../assets/img/car_type_c.png" alt srcset />
            </div>
            <p>小车</p>
            <p>C1/C2/C3</p>
          </div>
          <div class="dlType_item" :class="dlType===2?'active':''" @click="changeDlType(2)">
            <div class="item_Car_img">
              <img src="../../assets/img/car_type_zc.png" alt srcset />
            </div>
            <p>货车</p>
            <p>A2/B3</p>
          </div>
          <div class="dlType_item" :class="dlType===3?'active':''" @click="changeDlType(3)">
            <div class="item_Car_img">
              <img src="../../assets/img/car_type_zb.png" alt srcset />
            </div>
            <p>客车</p>
            <p>A1/A3/B1</p>
          </div>
        </div>
        <!-- 功能模块 -->
        <div class="func_box">
          <!-- 顺序练习 -->
          <div class="practice_box">
            <!-- 我的错题 -->
            <router-link class="errorTipic" :to="'/errorQuestion/?type='+getDataType+'&readCount='+dlData.read_count">
              <div class="error_img">
                <img src="../../assets/img/myError.png" alt srcset />
              </div>
              <p>我的错题</p>
            </router-link>

            <!-- 顺序练习 -->
            <div class="tipic_box">
              <ul class="tipic_ul">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <router-link class="tipic_round" :to="'/questionOrder/?type='+getDataType+'&readCount='+dlData.read_count">
                <div class="tipic_round_green">
                  <p>顺序练习</p>
                  <p>{{dlData.read_count || 0}}/{{dlData.total_count || 0}}</p>
                </div>
              </router-link>
            </div>

            <!-- 专项练习 -->
            <router-link class="topicsPecial_box" :to="'/specialPractice'">
              <!-- <div class="topicsPecial_box"> -->
              <div class="pecial_img">
                <img src="../../assets/img/myPractice.png" alt srcset />
              </div>
              <p>专项练习</p>
              <!-- </div> -->
            </router-link>
          </div>
          <!-- 模拟考试 -->
          <div class="exam_box">
            <!-- 我的错题 -->
            <router-link class="errorTipic" :to="'/questionCollect'">
              <div class="error_img">
                <img src="../../assets/img/myCollect.png" alt srcset />
              </div>
              <p>我的收藏</p>
            </router-link>
            <!-- 模拟考试 -->
            <div class="tipic_box">
              <ul class="tipic_ul">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div class="exam_round">
                <div class="tipic_round_purple">
                  <p>模拟考试</p>
                  <p>{{dlData.score || 0}}</p>
                </div>
              </div>
            </div>
            <!-- 专项练习 -->
            <div class="topicsPecial_box">
              <!-- <div class="pecial_img">
                <img src="../../assets/img/smallcar.png" alt srcset />
              </div>
              <p>专项练习</p>-->
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="cnt_body_four" v-if="bankType==1">科目四</div> -->
    </div>

    <stuFooter></stuFooter>
  </div>
</template>
<script>
import stuFooter from "../../components/stuFooter";
import api from "../../api/common.js";
import { getStore } from "../../common/util.js";
export default {
  components: { stuFooter },
  data() {
    return {
      title: "驾考题库",
      bankType: 0, //科目类型
      dlType: 1, // 驾驶证类型
      showType: "tab",
      practiceData: {}, // 首页总数据
      dlData: {
        result_msg: null,
        total_count: null,
        read_count: null,
        score: null
      }, // 驾驶证数据
      userInfo: null, // 用户信息
      getDataType:null, // 请求类型type
    };
  },
  async created() {
    const vm = this;
    vm.userInfo = JSON.parse(getStore("loginInfo"));
    if (vm.userInfo) {
      vm.getMainData(vm.userInfo.user_id);
    } else {
      this.$toast("无浏览权限，请登录！！！");
      this.$router.push("/login");
      return false;
    }
  },
  methods: {
    // 选择模式
    changeType(val) {
      let vm = this;
      vm.bankType = val;
      vm.getMainData(vm.userInfo.user_id);
      if(val ===1){
        vm.dlType = 1;
      }
    },
    // 选择驾驶证类型
    changeDlType(val) {
      const vm = this;
      if(vm.bankType == 1){
        return
      }
      vm.dlType = val;
      vm.getMainData(vm.userInfo.user_id);
    },
    /**
     * { number } 用户id
     */
    getMainData(id) {
      const vm = this;
      let type = null;
      if (vm.bankType === 0) {
        type = vm.dlType;
      } else if (vm.bankType === 1) {
        type = 4;
      }
      vm.getDataType = type;
      api.getDrivingMain(id, type).then(res => {
        vm.dlData = res;
      });
    },
    /**
     * { number } (科目一)驾驶证类型
     */
    setMainData(bankType, dlType) {
      const vm = this;
      if (Object.keys(vm.practiceData).length <= 0) {
        vm.dlData = {
          result_msg: null,
          total_count: null,
          read_count: null,
          score: null
        };
        return false;
      }
      if (bankType == 0) {
        switch (dlType) {
          case 1:
            vm.dlData = vm.practiceData.small_car;
            break;
          case 2:
            vm.dlData = vm.practiceData.goods_car;
            break;
          case 3:
            vm.dlData = vm.practiceData.passenger_car;
            break;
          default:
            vm.dlData = vm.practiceData.small_car;
        }
      } else if (bankType == 1) {
        vm.dlData = vm.practiceData.subject_four;
      }
    }
  }
};
</script>
<style scoped lang="scss">
.questionBank {
  padding-bottom: 1rem;
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
        padding: 0.3rem 0;
      }
      .dlType_box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .dlType_item {
          background-color: #f7f7f9;
          text-align: center;
          width: 32%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0.3rem;
          .item_Car_img {
            // width: 0.8rem;
            height: 0.45rem;
            margin-bottom: 0.2rem;
            img {
              height: 100%;
              width: auto;
            }
          }
          p {
            font-size: 80%;
            color: #9f9f9f;
          }
          p:nth-child(2) {
            margin-bottom: 0.05rem;
          }
        }
        .dlType_item:nth-child(2) {
          width: 36%;
          align-items: center;
          color: red;
          margin: 0 0.05rem;
        }
        .active {
          background-color: #cbeafe;
          p {
            color: #0195f7;
          }
        }
      }
      .func_box {
        .practice_box,
        .exam_box {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          height: 3rem;
          .errorTipic,
          .topicsPecial_box {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            height: 1.6rem;
            width: 1rem;
            .error_img,
            .pecial_img {
              width: 0.7rem;
            }
            p {
              font-size: 0.24rem;
            }
          }
          .tipic_box {
            margin: 0;
            padding: 0;
            position: relative;
            list-style: none;
            li {
              width: 1px;
              height: 3px;
              background: #ededed;
              position: absolute;
              top: -1.25rem;
              -webkit-transform-origin: center 1.25rem;
            }
            .tipic_ul {
              li:nth-of-type(1) {
                -webkit-transform: rotate(15deg);
              }
              li:nth-of-type(2) {
                -webkit-transform: rotate(30deg);
              }
              li:nth-of-type(3) {
                -webkit-transform: rotate(45deg);
              }
              li:nth-of-type(4) {
                -webkit-transform: rotate(60deg);
              }
              li:nth-of-type(5) {
                -webkit-transform: rotate(75deg);
              }
              li:nth-of-type(6) {
                -webkit-transform: rotate(90deg);
              }
              li:nth-of-type(7) {
                -webkit-transform: rotate(105deg);
              }
              li:nth-of-type(8) {
                -webkit-transform: rotate(120deg);
              }
              li:nth-of-type(9) {
                -webkit-transform: rotate(135deg);
              }
              li:nth-of-type(10) {
                -webkit-transform: rotate(150deg);
              }
              li:nth-of-type(11) {
                -webkit-transform: rotate(165deg);
              }
              li:nth-of-type(12) {
                -webkit-transform: rotate(180deg);
              }
              li:nth-of-type(13) {
                -webkit-transform: rotate(195deg);
              }
              li:nth-of-type(14) {
                -webkit-transform: rotate(210deg);
              }
              li:nth-of-type(15) {
                -webkit-transform: rotate(225deg);
              }
              li:nth-of-type(16) {
                -webkit-transform: rotate(240deg);
              }
              li:nth-of-type(17) {
                -webkit-transform: rotate(255deg);
              }
              li:nth-of-type(18) {
                -webkit-transform: rotate(270deg);
              }
              li:nth-of-type(19) {
                -webkit-transform: rotate(285deg);
              }
              li:nth-of-type(20) {
                -webkit-transform: rotate(300deg);
              }
              li:nth-of-type(21) {
                -webkit-transform: rotate(315deg);
              }
              li:nth-of-type(22) {
                -webkit-transform: rotate(330deg);
              }
              li:nth-of-type(23) {
                -webkit-transform: rotate(345deg);
              }
              li:nth-of-type(24) {
                -webkit-transform: rotate(360deg);
              }
              li:nth-of-type(3n + 3) {
                height: 5px;
                // background-color: #0195f7;
              }
              li:nth-of-type(6n) {
                height: 7px;
                // background-color: red;
              }
            }
            .tipic_round {
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              top: -0.9rem;
              left: -0.9rem;
              width: 1.8rem;
              height: 1.8rem;
              border-radius: 50%;
              box-shadow: 0px 0px 8px 2px #ddd;
              &:before {
                content: "";
                position: absolute;
                top: -0.12rem;
                right: 0.6rem;
                width: 4px;
                height: 4px;
                background-color: #00b482;
                border-radius: 50%;
              }
              .tipic_round_green {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                width: 1.6rem;
                height: 1.6rem;
                border-radius: 50%;
                background-color: #00b482;
                p {
                  overflow: hidden; //超出的文本隐藏
                  text-overflow: ellipsis; //溢出用省略号显示
                  white-space: nowrap; //溢出不换行
                  color: #fff;
                  &:nth-child(2) {
                    margin-top: 0.1rem;
                  }
                }
              }
            }
          }
        }
        .exam_box {
          .exam_round {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: -0.9rem;
            left: -0.9rem;
            width: 1.8rem;
            height: 1.8rem;
            border-radius: 50%;
            box-shadow: 0px 0px 8px 2px #ddd;
            &:before {
              content: "";
              position: absolute;
              top: -0.12rem;
              right: 0.6rem;
              width: 4px;
              height: 4px;
              background-color: #5e83eb;
              border-radius: 50%;
            }
            .tipic_round_purple {
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: center;
              width: 1.6rem;
              height: 1.6rem;
              border-radius: 50%;
              background-color: #5e83eb;
              p {
                overflow: hidden; //超出的文本隐藏
                text-overflow: ellipsis; //溢出用省略号显示
                white-space: nowrap; //溢出不换行
                color: #fff;
                &:nth-child(2) {
                  margin-top: 0.1rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

