<!-- 我的错题 -->
<template>
  <div>
    <!-- tab切换操作 -->
    <commonPage :active="active" :showType="showType" @changeModal="changeType">
      <template slot="content">
        <div class="question-content">
          <ul
            class="question-ul"
            id="question-ul"
            @touchstart="boxTouchStart"
            @touchmove="boxTouchMove"
            @touchend="boxTouchEnd"
          >
            <li class="question-item" v-for="(item,index) in pageDataList" :key="index">
              <question
                v-if="active === 'answer' && showQuestion"
                :currentData="item"
                :info="false"
                ref="question"
                @driveimgRead='driveimgRead'
              ></question>
              <question
                v-if="active === 'recite' && showQuestion"
                :currentData="item"
                :info="true"
                ref="question"
                @driveimgRead='driveimgRead'
              ></question>
            </li>
            <!-- <li class="question-item">
              <question
                v-if="active === 'answer' && showQuestion"
                :currentData="topicArr1"
                :info="false"
                ref="question"
              ></question>
              <question
                v-if="active === 'recite' && showQuestion"
                :currentData="topicArr1"
                :info="true"
                ref="question"
              ></question>
            </li>-->
          </ul>
          <!-- 底部操作等 -->
          <question-footer :del="true" :uncollected="true"></question-footer>
        </div>
      </template>
    </commonPage>
  </div>
</template>
<script>
import commonPage from "../../components/commonPage.vue";
import questionFooter from "../../components/questionFooter.vue";
import Question from "../../components/question.vue";
import api from "../../api/common.js";
import { getStore } from "../../common/util.js";
var INDEX = 0;
var PAGENUM = 10; // 每页条数
export default {
  components: {
    commonPage,
    questionFooter,
    Question
  },
  data() {
    return {
      active: "answer",
      showType: "tab",
      showQuestion: false,
      showItem: false,
      dataBase: {}, // 题目
      pageDataList: [], // 分页过后的数据
      userInfo: null, // 用户信息
      topicArr: new Object(), // 题目信息
      topicArr1: new Object(), // 题目信息
      movebox: null, // 可滑动容器
      slideItem: null, // 滑动块
      moveX: null, // 手指滑动的距离
      minMoveX: 40, // 最小滑动距离
      endX: null, //手指停止滑动时X轴坐标
      cout: 0, // 滑动计数器
      moveDir: null, // 滑动方向
      nodeWidth: null, // 滑块宽度
      startX: null, // 触摸的坐标
      itemLength: 0 // item个数ï
    };
  },
  async created() {
    const vm = this;
    vm.userInfo = JSON.parse(getStore("loginInfo"));
    if (Object.keys(vm.$route.query).length > 0) {
      api
        .getDrivingOrder(vm.userInfo.user_id, vm.$route.query.type)
        .then(res => {
          vm.dataBase = res;
          vm.setCurrentData(res.list, res.last_read_id, (data, data1) => {
            vm.topicArr = data;
            vm.topicArr1 = data1;
            vm.showItem = true;
            vm.showQuestion = true;
            setTimeout(() => {
              vm.initSlide();
            }, 20);
          });
        });
    }
  },
  mounted() {
    const vm = this;
  },
  methods: {
    //选择模式
    changeType(val) {
      let self = this;
      self.active = val;
    },
    // 处理数据
    setCurrentData(total, readId, callback) {
      const vm = this;
      let currentData = {};
      total.forEach((element, index) => {
        if (element.id === readId + "") {
          vm.setPageData(index);
          currentData = element;
        }
      });
      if (!currentData.id) {
        vm.setPageData(0);
        currentData = total[INDEX];
      }
      callback(currentData);
    },
    resetModal() {
      const vm = this;
      vm.$refs.question.resetType();
    },
    // 初始化滑动
    initSlide() {
      const vm = this;
      vm.movebox = document.querySelector(".question-ul"); //滑动对象
      vm.slideItem = vm.movebox.querySelectorAll(".question-item"); //滑动对象item
      // vm.itemLength = document.querySelector(".question-ul").children.length;
      vm.itemLength = PAGENUM;
      vm.nodeWidth = parseInt(
        window.getComputedStyle(vm.movebox.parentNode).width
      ); //滑动对象item的宽度
      vm.movebox.style.width = vm.nodeWidth * (vm.itemLength - 1) + "px"; //设置滑动盒子width
      for (var i = 0; i < vm.itemLength; i++) {
        vm.slideItem[i].style.width = vm.nodeWidth + "px"; //设置滑动item的width，适应屏幕宽度
      }
    },
    // 开始
    boxTouchStart(e) {
      const vm = this;
      var touch = e.touches[0]; //获取触摸对象
      vm.startX = touch.pageX; //获取触摸坐标
      vm.moveX = 0;
      vm.endX = parseInt(vm.cout * -vm.nodeWidth); //获取每次触摸时滑动对象X轴的偏移值
    },
    // 移动
    boxTouchMove(e) {
      const vm = this;
      var touch = e.touches[0];
      vm.moveX = touch.pageX - vm.startX; //手指水平方向移动的距离
      vm.movebox.style.webkitTransform =
        "translateX(" + (vm.endX + vm.moveX) + "px)"; //手指滑动时滑动对象随之滑动
    },
    // 滑动结束
    boxTouchEnd(e) {
      const vm = this;
      if (Math.abs(vm.moveX) <= 1) {
        return false;
      }
      vm.moveDir = vm.moveX < 0 ? true : false; //滑动方向大于0表示向左滑动，小于0表示向右滑动
      if (Math.abs(vm.moveX) < vm.minMoveX) {
        vm.movebox.style.webkitTransform = "translateX(" + vm.endX + "px)"; //手指滑动时滑动对象随之滑动
        return false;
      }
      if (vm.cout == 0 && vm.moveX > 0) {
        //刚开始第一次向左滑动时
        vm.movebox.style.webkitTransform = "translateX(" + 0 + "px)"; //手指滑动时滑动对象随之滑动
        return false;
      }
      if (vm.cout == vm.itemLength - 1 && vm.moveX < 0) {
        //滑动到最后继续向右滑动时
        vm.movebox.style.webkitTransform = "translateX(" + vm.endX + "px)"; //手指滑动时滑动对象随之滑动
        return false;
      }
      //手指向左滑动
      if (vm.moveDir) {
        if (vm.cout < vm.itemLength - 1) {
          console.error(vm.endX, vm.nodeWidth);
          vm.movebox.style.webkitTransform =
            "translateX(" + (vm.endX - vm.nodeWidth) + "px)";
          vm.cout++;
          INDEX++;
        }
        //手指向右滑动
      } else {
        //滑动到初始状态时返回false
        if (vm.cout == 0) {
          return false;
        } else {
          vm.movebox.style.webkitTransform =
            "translateX(" + (vm.endX + vm.nodeWidth) + "px)";
          vm.cout--;
          INDEX--;
        }
      }
    },
    // 设置分页数据
    setPageData(index) {
      const vm = this;
      INDEX = index;
      let pagingArr = new Array();
      for (let i = 0; i < PAGENUM; i++) {
        INDEX++;
        pagingArr.push(vm.dataBase.list[INDEX]);
      }
      vm.pageDataList = pagingArr;
      console.error(pagingArr);
    },
    // 保存阅读位置
    driveimgRead(questionId) {
      const vm = this;
      console.log(vm.$route.query)
      let params = {
        user_id: vm.userInfo.user_id,
        type: vm.$route.query.type,
        question_id: questionId,
        read_count: parseFloat(vm.$route.query.readCount)
      };
      console.log(params)
      api.getDrivingRead(params).then(res => {
        console.error(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.question-content {
  position: absolute;
  width: 100%;
  height: 85%;
  overflow: hidden;
  .question-ul {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 100%;
    .question-item {
      min-width: 375px;
      // float: left;
      // position: relative;
      // // width: 100%;
      // height: 100%;
    }
  }
}
</style>
