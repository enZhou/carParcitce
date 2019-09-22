<!-- 顺序练习 -->
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
                v-if="active === 'answer'"
                :topicInfo="item"
                :info="false"
                :isShowErrExplain="isShowErrExplain"
                ref="question"
                @driveimgRead="driveimgRead"
              ></question>
              <question
                v-if="active === 'recite'"
                :topicInfo="item"
                :isShowErrExplain="isShowErrExplain"
                :info="true"
                ref="question"
                @driveimgRead="driveimgRead"
              ></question>
            </li>
          </ul>
        </div>
      </template>
    </commonPage>
    <!-- 底部操作 -->
    <question-footer
      ref="questionFooter"
      :submit="false"
      :uncollected="true"
      @gotoIndex="gotoIndex"
      @httpCollection="httpCollection"
    ></question-footer>
  </div>
</template>
<script>
import commonPage from "../../components/commonPage.vue";
import questionFooter from "../../components/questionFooter.vue";
import Question from "../../components/question.vue";
import test from "../../components/test.vue";
import api from "../../api/common.js"; // require styles
import { setStore, getStore, removeStore } from "../../common/util.js";
import $ from "jquery";
var INDEX = 0;
var PAGENUM = 50; // 每页条数
export default {
  components: {
    commonPage,
    questionFooter,
    Question,
    test
  },

  data() {
    return {
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
      active: "answer",
      showType: "tab",

      movebox: null, // 可滑动容器
      slideItem: null, // 滑动块
      moveX: null, // 手指滑动的距离
      endX: null, //手指停止滑动时X轴坐标
      minMoveX: 40, // 最小滑动距离
      cout: 0, // 滑动计数器
      moveDir: null, // 滑动方向
      nodeWidth: null, // 滑块宽度
      startX: null, // 触摸的坐标
      isShowErrExplain: false, // 错误详解
      pageDataList: [], // 分页过后的数据
      topicCacheData: [], // 缓存数据
      userTopicInfo: {
        last_read_id: null, // 历史阅读位置题目id
        total: null, // 题目总数
        readIndex: null, // 当前阅读位置
        collection: null // 是否收藏
      },
      saveShowErrExplain: false,
      oldAnswer: "" //老答案
    };
  },
  async created() {
    const vm = this;
    vm.initPage(true);
  },
  mounted() {
    const vm = this;
  },
  methods: {
    initPage(type) {
      let vm = this;
      vm.userInfo = JSON.parse(getStore("loginInfo"));
      vm.topicCacheData = JSON.parse(
        getStore(`${vm.userInfo.user_id}vehicleList${vm.$route.query.type}`)
      );
      if (type) {
        if (Object.keys(vm.$route.query).length > 0) {
          api
            .getDrivingOrder(vm.userInfo.user_id, vm.$route.query.type)
            .then(res => {
              if (!vm.topicCacheData || vm.topicCacheData.length <= 0) {
                vm.topicCacheData = res.list;
                setStore(
                  `${vm.userInfo.user_id}vehicleList${vm.$route.query.type}`,
                  res.list
                );
              }
              vm.userTopicInfo = {
                last_read_id: res.last_read_id,
                total: res.total
              };
              vm.setCurrentData(
                vm.topicCacheData,
                vm.userTopicInfo.last_read_id,
                data => {
                  vm.pageDataList = data;
                  vm.$nextTick(() => {
                    vm.initSlide();
                    vm.movebox.style.webkitTransform =
                      "translateX(" + vm.cout * -vm.nodeWidth + "px)"; //手指滑动时滑动对象随之滑动
                  });
                }
              );
              vm.$refs.questionFooter.setFootData(
                vm.userTopicInfo.total,
                vm.topicCacheData,
                vm.userTopicInfo.readIndex
              );
              vm.setCollection();
            });
        }
      } else {
        vm.setCurrentData(
          vm.topicCacheData,
          vm.userTopicInfo.last_read_id,
          data => {
            vm.pageDataList = data;
          }
        );
      }
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
    boxTouchEnd(e) {
      const vm = this;
      if (Math.abs(vm.moveX) <= 1) {
        return false;
      }
      if (Math.abs(vm.moveX) < vm.minMoveX) {
        vm.movebox.style.webkitTransform = "translateX(" + vm.endX + "px)"; //手指滑动时滑动对象随之滑动
        return false;
      }
      vm.moveDir = vm.moveX < 0 ? true : false; //滑动方向大于0表示向左滑动，小于0表示向右滑动
      if (vm.cout == 0 && vm.moveX > 0) {
        console.log("继续向左");
        if (INDEX <= 0) {
          vm.cout = 0;
        } else {
          if (INDEX - PAGENUM < 0) {
            INDEX = PAGENUM;
            if (vm.userTopicInfo.readIndex <= 0) {
              vm.cout = 0;
            } else {
              vm.cout = PAGENUM - 1;
            }
          } else {
            INDEX -= PAGENUM;
            vm.cout = PAGENUM - 1;
          }
          if (vm.userTopicInfo.readIndex <= 0) {
            vm.userTopicInfo.readIndex = 0;
          } else {
            vm.userTopicInfo.readIndex--;
          }
        }
        this.setPageData(INDEX, data => {
          this.pageDataList = data;
        });
        //刚开始第一次向左滑动时
        vm.movebox.style.webkitTransform =
          "translateX(" + vm.cout * -vm.nodeWidth + "px)"; //手指滑动时滑动对象随之滑动
        vm.movebox.style.transition = "all .2s";
        vm.setCollection();
        return false;
      }
      if (vm.cout == vm.itemLength - 1 && vm.moveX < 0) {
        if (INDEX <= vm.topicCacheData.length - PAGENUM) {
          INDEX += PAGENUM;
        } else {
          INDEX = vm.topicCacheData.length - PAGENUM;
        }
        this.setPageData(INDEX, data => {
          this.pageDataList = data;
        });
        vm.cout = 0;
        console.log("继续向you");
        //滑动到最后继续向右滑动时
        vm.movebox.style.webkitTransform =
          "translateX(" + vm.cout * -vm.nodeWidth + "px)"; //手指滑动时滑动对象随之滑动
        vm.movebox.style.transition = "all .2s";

        return false;
      }
      //手指向左滑动
      if (vm.moveDir) {
        console.log("下一条");
        if (vm.cout < vm.itemLength - 1) {
          vm.movebox.style.webkitTransform =
            "translateX(" + (vm.endX - vm.nodeWidth) + "px)";
          vm.movebox.style.transition = "all 1s";
          vm.cout++;
          vm.userTopicInfo.readIndex++;
        }
        //手指向右滑动
      } else {
        console.log("上一条");
        if (vm.cout == 0) {
          vm.movebox.style.webkitTransform = "translateX(0px)";

          return false;
        } else {
          vm.movebox.style.webkitTransform =
            "translateX(" + (vm.endX + vm.nodeWidth) + "px)";

          vm.movebox.style.transition = "all 1s";
          vm.cout--;

          if (INDEX <= 0) {
            INDEX = 0;
          } else {
            INDEX--;
          }
          if (vm.userTopicInfo.readIndex <= 0) {
            vm.userTopicInfo.readIndex = 0;
          } else {
            vm.userTopicInfo.readIndex--;
          }
        }
      }
      vm.setCollection();
    },

    //选择模式
    changeType(val) {
      let vm = this;
      vm.active = val;
      if (vm.active === "recite") {
        vm.isShowErrExplain = true;
      } else {
        vm.isShowErrExplain = vm.saveShowErrExplain;
      }
    },
    // 处理数据
    setCurrentData(list, readId, callback) {
      const vm = this;
      let lock = true;
      list.forEach((element, index) => {
        if (element.id === readId + "") {
          lock = false;
          vm.userTopicInfo.readIndex = index;
          INDEX = parseInt(index / PAGENUM) * PAGENUM;
          vm.cout = index % PAGENUM < 0 ? 0 : index % PAGENUM;
          vm.setPageData(INDEX, data => {
            callback(data);
          });
        }
      });
      if (lock) {
        vm.userTopicInfo.readIndex = 0;
        vm.setPageData(0, data => {
          callback(data);
        });
      }
    },
    resetModal() {
      const vm = this;
      vm.$refs.question.resetType();
    },
    // 设置分页数据
    setPageData(index, callback) {
      const vm = this;
      let _index = index;
      let pagingArr = new Array();
      let forIndex = null;
      for (let i = 0; i < PAGENUM; i++) {
        vm.topicCacheData[_index].changeAnswer =
          vm.changeAnswer[vm.topicCacheData[_index].answer] + "";
        pagingArr.push(vm.topicCacheData[_index]);
        _index++;
      }
      callback(pagingArr);
    },
    // 保存阅读位置
    driveimgRead(questionId, answer) {
      const vm = this;
      vm.isShowErrExplain = true;
      let params = {
        user_id: vm.userInfo.user_id,
        type: vm.$route.query.type,
        question_id: questionId,
        read_count: parseFloat(vm.$route.query.readCount)
      };
      let isAnswer = false;
      vm.topicCacheData.forEach((element, index) => {
        if (element.id === questionId + "") {
          vm.userTopicInfo.readIndex = index;
          vm.saveShowErrExplain = true;
          vm.userTopicInfo.is_collection = element.is_collection;
          element.isRead = true;
          if (element.answer === answer + "") {
            isAnswer = true;
          } else {
            vm.setDrivingWrong(questionId);
          }
        }
      });
      removeStore(`${vm.userInfo.user_id}vehicleList${vm.$route.query.type}`);
      setStore(
        `${vm.userInfo.user_id}vehicleList${vm.$route.query.type}`,
        vm.topicCacheData
      );

      api
        .getDrivingRead(
          vm.userInfo.user_id,
          vm.$route.query.type,
          questionId,
          parseFloat(vm.$route.query.readCount) + vm.cout + 1
        )
        .then(res => {
          vm.$refs.questionFooter.setFootData(
            vm.userTopicInfo.total,
            vm.topicCacheData,
            vm.userTopicInfo.readIndex
          );
        });
    },
    // 跳转到某个题
    gotoIndex(index) {
      let vm = this;
      vm.setCurrentData(vm.topicCacheData, index, data => {
        vm.pageDataList = data;
        vm.movebox.style.webkitTransform =
          "translateX(" + vm.cout * -vm.nodeWidth + "px)"; //手指滑动时滑动对象随之滑动
      });
      vm.setCollection();

      vm.$refs.questionFooter.setFootData(
        vm.userTopicInfo.total,
        vm.topicCacheData,
        vm.userTopicInfo.readIndex
      );
    },
    // 设置是否已收藏
    setCollection() {
      let vm = this;
      vm.$refs.questionFooter.getCollection(
        vm.topicCacheData[vm.userTopicInfo.readIndex].is_collection,
        vm.topicCacheData[vm.userTopicInfo.readIndex].id
      );
      vm.$refs.questionFooter.setFootData(
        vm.userTopicInfo.total,
        vm.topicCacheData,
        vm.userTopicInfo.readIndex
      );
    },
    // 修改收藏状态
    httpCollection(type) {
      let vm = this;
      let isCollection = type === 0 ? false : true;
      let questionId = vm.topicCacheData[INDEX].id;
      vm.topicCacheData[
        vm.userTopicInfo.readIndex
      ].is_collection = isCollection;
      removeStore(`${vm.userInfo.user_id}vehicleList${vm.$route.query.type}`);
      setStore(
        `${vm.userInfo.user_id}vehicleList${vm.$route.query.type}`,
        vm.topicCacheData
      );
      api
        .setCollection(
          vm.userInfo.user_id,
          vm.$route.query.type,
          vm.userTopicInfo.readIndex,
          type
        )
        .then(res => {
          vm.setCollection();
        });
    },
    //提交错题
    setDrivingWrong(questionId) {
      let vm = this;
      api
        .setDrivingWrong(vm.userInfo.user_id, vm.$route.query.type, questionId)
        .then(res => {});
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
    // transition: all 1s;
    .question-item {
      width: 100%;
      min-width: 320px;
    }
  }
}
.night {
  background-color: #333;
}
</style>
