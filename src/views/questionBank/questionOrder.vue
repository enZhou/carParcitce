<!-- 顺序练习 -->
<template>
  <div>
    <!-- tab切换操作 -->
    <commonPage
      :active="active"
      :showType="showType"
      @changeModal="changeType"
      @changeInfo="changeInfo"
    >
      <template slot="content">
        <div
          class="question-content"
        >
          <swiper class="question-ul" :options="swiperOption" v-if="showSwpier">
            <!-- <swiper-slide v-for="(item, index) in pageDataList" :key="index"> -->
            <swiper-slide class="question-item">
              <question
                v-if="active === 'answer' && showQuestion"
                data-id="1"
                :currentData="pageDataList[qusetionIndex-1]"
                :info="false"
                ref="question"
                @driveimgRead="driveimgRead"
              ></question>
              <question
                v-if="active === 'recite' && showQuestion"
                data-id="1"
                :currentData="pageDataList[qusetionIndex-1]"
                :info="true"
                ref="question"
                @driveimgRead="driveimgRead"
              ></question>
            </swiper-slide>
            <swiper-slide class="question-item">
              <question
                v-if="active === 'answer' && showQuestion"
                data-id="1"
                :currentData="pageDataList[qusetionIndex]"
                :info="false"
                ref="question"
                @driveimgRead="driveimgRead"
              ></question>
              <question
                v-if="active === 'recite' && showQuestion"
                data-id="1"
                :currentData="pageDataList[qusetionIndex]"
                :info="true"
                ref="question"
                @driveimgRead="driveimgRead"
              ></question>
            </swiper-slide>
            <swiper-slide class="question-item">
              <question
                v-if="active === 'answer' && showQuestion"
                data-id="1"
                :currentData="pageDataList[qusetionIndex+1]"
                :info="false"
                ref="question"
                @driveimgRead="driveimgRead"
              ></question>
              <question
                v-if="active === 'recite' && showQuestion"
                data-id="1"
                :currentData="pageDataList[qusetionIndex+1]"
                :info="true"
                ref="question"
                @driveimgRead="driveimgRead"
              ></question>
            </swiper-slide>
          </swiper>
          <!-- 底部操作等 -->
          <question-footer ref="questionFooter" :del="true" :uncollected="true"></question-footer>
        </div>
      </template>
    </commonPage>
  </div>
</template>
<script>
import commonPage from "../../components/commonPage.vue";
import questionFooter from "../../components/questionFooter.vue";
import Question from "../../components/question.vue";
import test from "../../components/test.vue";
import Swiper from "swiper";
import api from "../../api/common.js"; // require styles
import Vue from "vue";
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

import { getStore } from "../../common/util.js";
import { constants } from "crypto";

import $ from "jquery";
var INDEX = 0;
var PAGENUM = 100; // 每页条数
export default {
  components: {
    commonPage,
    questionFooter,
    Question,
    swiper,
    swiperSlide,
    test
  },

  data() {
    return {
      active: "answer",
      showType: "tab",
      showQuestion: false,
      showItem: false,
      dataBase: {}, // 题目
      pageDataList: [], // 分页过后的数据
      qusetionIndex:2,
      showSwpier: false,
      swiperOption: {
        // 轮播配置
        loop: false, // 循环滚动
        centeredSlides: true,
        on: {
          slideChange: () => {
            console.log($(".question-ul"));
            // PAGENUM++
            // this.setPageData(PAGENUM,(data)=>{
            // this.pageDataList = data
            // });
            // let Profile = Vue.component({
            //   template:Question,
            //   data: () => {
            //     return {
            //       item: this.pageDataList[0]
            //     };
            //   }
            // });
            // new Profile().$mount(".qqqqq");
          },
          slideChangeTransitionEnd:function(){
            console.log(this.activeIndex);
          }
        }
      }
    };
  },
  async created() {
    const vm = this;
    vm.userInfo = JSON.parse(getStore("loginInfo"));
    if (Object.keys(vm.$route.query).length > 0) {
      if (Object.keys(vm.dataBase).length <= 0) {
        api
          .getDrivingOrder(vm.userInfo.user_id, vm.$route.query.type)
          .then(res => {
            vm.dataBase = res;
            vm.setCurrentData(res.list, res.last_read_id, data => {
              vm.pageDataList = data;
              vm.showSwpier = true;
              vm.showQuestion = true;
              vm.$refs.questionFooter.getFootData(res);
              // vm.initSlide();
            });
          });
      } else {
        // vm.initSlide();
      }
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
      let lock = true;
      total.forEach((element, index) => {
        if (element.id === readId + "") {
          lock = false;
          vm.dataBase.readIndex = index;
          vm.setPageData(index, data => {
            callback(data);
          });
        }
      });
      if (lock) {
        vm.dataBase.readIndex = 0;
        vm.setPageData(0, data => {
          callback(data);
        });
      }
    },
    changeSwiper() {
      console.log("12312");
    },
    resetModal() {
      const vm = this;
      vm.$refs.question.resetType();
    },
    // 设置分页数据
    setPageData(index, callback) {
      const vm = this;
      INDEX = index;
      let pagingArr = new Array();
      for (let i = 0; i < PAGENUM; i++) {
        INDEX++;
        pagingArr.push(vm.dataBase.list[INDEX]);
      }
      callback(pagingArr);
    },
    // 保存阅读位置
    driveimgRead(questionId) {
      const vm = this;
      console.log(vm.$route.query);
      let params = {
        user_id: vm.userInfo.user_id,
        type: vm.$route.query.type,
        question_id: questionId,
        read_count: parseFloat(vm.$route.query.readCount)
      };
      api
        .getDrivingRead(
          vm.userInfo.user_id,
          vm.$route.query.type,
          questionId,
          parseFloat(vm.$route.query.readCount) + vm.cout + 1
        )
        .then(res => {
          console.error(res);
        });
    },
    // 关闭试题详解
    changeInfo(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.question-content {
  position: absolute;
  width: 100%;
  height: 85%;
  overflow-y: hidden;
  .question-ul {
    height: 100%;
  }
}
</style>
