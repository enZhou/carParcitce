<template>
  <div class="container">
    <headerTitle title="我的学员"></headerTitle>
    <ul class="stu_list">
      <li
        v-for="(stu,index) in stuMsg.list"
        :key="index"
        @click="goToStuDetail(stu.student_detail,stu.pj_content)"
      >
        <h2>{{stu.student_nickname}}</h2>
        <p class="flex_between">
          <span>编号：{{stu.order_code}}</span>
          <span>
            状态：
            <b>{{stu.status|transStatus}}</b>
          </span>
        </p>
      </li>
      <li class="no_more">已经没有更多了</li>
    </ul>
    <trainerFooter></trainerFooter>
  </div>
</template>

<script>
import headerTitle from "../../components/headerTitle";
import trainerFooter from "../../components/trainerFooter";
import api from "../../api/common.js";
import { getStore } from "../../common/util";
export default {
  components: {
    headerTitle,
    trainerFooter
  },
  data() {
    return {
      stuMsg: ""
    };
  },
  async created() {
    let trainer = JSON.parse(getStore("trainerInfo"));
    console.log(trainer);
    this.stuMsg = await api.getStuList(trainer.user_id);
    console.log(this.stuMsg);
  },
  filters: {
    transStatus(statusId) {
      switch (statusId) {
        case 0:
          return "已预约";
          break;
        case 1:
          return "可签约";
          break;
        case 2:
          return "已签约";
          break;
      }
    }
  },
  methods: {
    //跳转学员详情
    goToStuDetail(stuDetail,content) {
      this.$router.push({
        path: "/stuDetail",
        query: {
          stuDetail,
          content
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.stu_list {
  margin-top: 0.4rem;
  height: calc(100vh - 1.4rem);
  background: #fff;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  li {
    padding: 0.24rem;
    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
    h2 {
      font-size: 0.3rem;
      font-weight: 800;
      margin-bottom: 0.2rem;
      background: url("../../assets/img/right_arrow.png") no-repeat right center;
      background-size: 0.2rem 0.3rem;
    }
    p {
      margin-top: 0.3rem;
      b {
        color: $color_blue;
      }
    }
  }
}
</style>
