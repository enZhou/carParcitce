<!-- 模拟考试 -->
<template>
  <div>
    <commonPage ref="commonPage" :active="active" :showType="showType" @changeModal="changeType"></commonPage>
    <div class="question-content">
      <ul
        class="question-ul"
        @touchstart="boxTouchStart"
        @touchmove="boxTouchMove"
        @touchend="boxTouchEnd"
      >
        <li class="question-item" v-for="(item,index) in topicArr" :key="index">
          <question
            v-if="active === 'answer'"
            :topicInfo="item"
            :info="false"
            @yetTipicList="yetTipicList"
            :isShowErrExplain="isShowErrExplain"
            ref="question"
          ></question>
          <question
            v-if="active === 'recite'"
            :topicInfo="item"
            @yetTipicList="yetTipicList"
            :isShowErrExplain="isShowErrExplain"
            :info="true"
            ref="question"
          ></question>
        </li>
      </ul>
    </div>
    <!-- 底部操作 -->
    <question-footer
      ref="questionFooter"
      :submit="false"
      :uncollected="true"
      :del="true"
      @gotoIndex="gotoIndex"
      @httpCollection="httpCollection"
      @delClk="delClk"
    ></question-footer>
  </div>
</template>
<script>
import commonPage from "../../components/commonPage.vue";
import Question from "../../components/question.vue";
import questionFooter from "../../components/questionFooter.vue";
import questionDialog from "../../components/questionDialog.vue";
import api from "../../api/common.js";
import { getStore } from "../../common/util.js";
var INDEX = 0;
var PAGENUM = 0; // 每页条数
var SCORE = 0; // 分数
export default {
  components: {
    commonPage,
    Question,
    questionFooter,
    questionDialog
  },
  data() {
    return {
      active: "answer",
      showType: "tab",
      userInfo: null, // 用户信息
      topicArr: new Array(), // 题目信息
      changeAnswer: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        7: "12",
        8: "13",
        9: "14",
        10: "23",
        11: "24",
        12: "34",
        13: "123",
        14: "124",
        15: "134",
        16: "234",
        17: "1234"
      },
      movebox: null, // 可滑动容器
      slideItem: null, // 滑动块
      moveX: null, // 手指滑动的距离
      endX: null, //手指停止滑动时X轴坐标
      minMoveX: 40, // 最小滑动距离
      cout: 0, // 滑动计数器
      moveDir: null, // 滑动方向
      nodeWidth: null, // 滑块宽度
      startX: null, // 触摸的坐标
      itemLength: 0, // item个数
      readIndex: 0,
      answerList: [], // 已回答目录
      maxScore: 0, // 最佳成绩
      isShowErrExplain: false, // 错误详解
      saveShowErrExplain: false,
      userTopicInfo: {
        last_read_id: null, // 历史阅读位置题目id
        total: null, // 题目总数
        readIndex: null, // 当前阅读位置
        collection: null // 是否收藏
      }
    };
  },
  async created() {
    const vm = this;
    vm.initPage();
  },
  methods: {
    initPage() {
      let vm = this;
      vm.userInfo = JSON.parse(getStore("loginInfo"));
      vm.maxScore = vm.$route.query.score;
      if (Object.keys(vm.$route.query).length > 0) {
        api
          .getDrivingWrongList(vm.userInfo.user_id, vm.$route.query.type)
          .then(res => {
            if (res.list.length <= 0) {
              vm.$toast("暂无数据～", true);
              vm.$router.replace("/questionBank");
              return false;
            }
            vm.changeData(res.list, list => {
              PAGENUM = list.length;
              vm.topicArr = list;
              vm.topicArr.forEach(item => {
                item.changeAnswer = vm.changeAnswer[item.answer] + "";
              });
              vm.$nextTick(() => {
                vm.initSlide();
                vm.nextOne();
                vm.setCollection();
              });
            });
          });
      }
    },
    // 组装数据
    changeData(list, callback) {
      let newList = [];
      list.forEach(item => {
        newList.push({
          answer: item.question_info.answer,
          explains: item.question_info.explains,
          id: item.question_info.id,
          is_collection: item.question_info.is_collection,
          item1: item.question_info.item1,
          item2: item.question_info.item2,
          item3: item.question_info.item3,
          item4: item.question_info.item4,
          question: item.question_info.question,
          url: item.question_info.url
        });
      });
      callback && callback(newList);
    },
    //选择模式
    changeType(val) {
      let self = this;
      self.active = val;
      if (self.active === "recite") {
        self.isShowErrExplain = true;
      } else {
        self.isShowErrExplain = self.saveShowErrExplain;
      }
    },
    // 修改收藏状态
    httpCollection(type) {
      let vm = this;
      let isCollection = type === 0 ? false : true;
      let questionId = vm.topicArr[INDEX].id;
      vm.topicArr.forEach((element, index) => {
        if (element.id === questionId + "") {
          element.is_collection = isCollection;
        }
      });
      api
        .setCollection(
          vm.userInfo.user_id,
          vm.$route.query.type,
          questionId,
          type
        )
        .then(res => {
          vm.setCollection();
        });
    },
    // 设置是否已收藏
    setCollection() {
      let vm = this;
      vm.$refs.questionFooter.getCollection(
        vm.topicArr[INDEX].is_collection || false,
        vm.topicArr[INDEX].id
      );
    },
    // 移除错题
    delClk(id) {
      let vm = this;
      api
        .setDrivingClearWrong(vm.userInfo.user_id, vm.topicArr[INDEX].id)
        .then(res => {
          this.$toast("移除成功");
          vm.initPage();
        });
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
      vm.itemLength = PAGENUM;
      vm.nodeWidth = parseInt(
        window.getComputedStyle(vm.movebox.parentNode).width
      ); //滑动对象item的宽度
      vm.movebox.style.width = vm.nodeWidth * vm.itemLength + "px"; //设置滑动盒子width
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
    boxTouchEnd(e, type) {
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
          vm.movebox.style.webkitTransform =
            "translateX(" + (vm.endX - vm.nodeWidth) + "px)";
          vm.cout++;
          INDEX++;
        }
        //手指向右滑动
      } else {
        //滑动到初始状态时返回false
        if (INDEX <= 0) {
          INDEX = 0;
          vm.cout = 0;
        }
        if (vm.cout == 0) {
          vm.movebox.style.webkitTransform = "translateX(0px)";
          return false;
        } else {
          vm.movebox.style.webkitTransform =
            "translateX(" + (vm.endX + vm.nodeWidth) + "px)";
          vm.cout--;
          INDEX--;
        }
      }
      vm.nextOne();
    },
    // 跳转到某个题
    gotoIndex(id) {
      let vm = this;
      vm.topicArr.forEach((element, index) => {
        if (element.id === id + "") {
          vm.readIndex = index;
        }
      });
      vm.movebox.style.webkitTransform =
        "translateX(" + vm.readIndex * -vm.nodeWidth + "px)";
      vm.cout = vm.readIndex;
      INDEX = vm.readIndex;
      vm.$refs.questionFooter.setFootData(
        vm.topicArr.length,
        vm.topicArr,
        vm.readIndex
      );
    },
    nextOne() {
      let vm = this;
      vm.$refs.questionFooter.setFootData(
        vm.topicArr.length,
        vm.topicArr,
        INDEX
      );
      vm.$refs.questionFooter.getCollection(vm.topicArr[INDEX].is_collection === undefined?false:true, vm.topicArr[INDEX].id);
    },
    // 答题
    yetTipicList(id, qa, sa) {
      let vm = this;
      vm.isShowErrExplain = true; // 错误详解
      vm.topicArr.forEach((element, index) => {
        if (element.id === id + "") {
          if (qa + "" === sa + "") {
            vm.saveShowErrExplain = true;
            element.isAnswer = true;
          } else {
            vm.saveShowErrExplain = false;
            element.isAnswer = false;
          }
        }
      });
      vm.nextOne();
      if (qa + "" === sa + "") {
        SCORE++;
      }
      vm.answerList.push({
        question_id: id,
        question_answer: qa,
        submit_answer: sa
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
    transition: all 1s;
    .question-item {
      min-width: 320px;
    }
  }
}
.night {
  background-color: #333;
}
</style>