<template>
  <div class="container">
    <headerTitle title="教练详情"></headerTitle>
    <!-- 教练基本信息 -->
    <div class="base_info">
      <img v-if="trainerMsg.member.avatar" :src="trainerMsg.member.avatar | imgContact" alt />
      <img v-else src="../../assets/img/default_avatar.jpg" alt />
      <ul class="text">
        <li>
          评分：
          <span>{{trainerMsg.member.number==0||trainerMsg.member.number=='无评分'?90:trainerMsg.member.number}}分</span>
        </li>
        <li>
          姓名：
          <span>{{trainerMsg.member.name}}</span>
        </li>
        <li>
          编号：
          <span>{{trainerMsg.member.teach_code}}</span>
        </li>
        <li>
          性别：
          <span>{{trainerMsg.member.sex}}</span>
        </li>
      </ul>
    </div>
    <!-- 教练工作信息 -->
    <ul class="work_info">
      <li>
        当前级别：
        <span>{{trainerMsg.member.old_work_level}}</span>
      </li>
      <li>
        工龄：
        <span>{{trainerMsg.member.work_years?trainerMsg.member.work_years:0}}年</span>
      </li>
      <li>
        报价：
        <span
          style="color:#F1594B;"
        >￥{{trainerMsg.member.teach_price?trainerMsg.member.teach_price:0}}</span>
      </li>
      <li>
        教学时段：
        <span v-if="trainerMsg.member.teach_time">{{trainerMsg.member.teach_time}}</span>
        <span v-else style="color:#999">暂无</span>
      </li>
      <li>
        教学方式：
        <span v-if="trainerMsg.member.teach_type">{{trainerMsg.member.teach_type}}</span>
        <span v-else style="color:#999">暂无</span>
      </li>
      <li>
        教学区域：
        <span v-if="trainerMsg.member.teach_area">{{trainerMsg.member.teach_area}}</span>
        <span v-else style="color:#999">暂无</span>
      </li>
    </ul>
    <!-- 教练证件信息 -->
    <ul class="cer_info work_info">
      <li>
        证件：
        <span>{{trainerMsg.member.card_number | formatCard}}</span>
      </li>
      <li>
        单位：
        <span>平台合作驾校</span>
      </li>
    </ul>
    <!-- 学员评论查看 -->
    <div class="stu_comment" :class="{'active':isShowComment}">
      <h2 @click="isShowComment=!isShowComment" class="flex_between">
        <span>学员评论</span>
        <i></i>
      </h2>
      <template v-if="stuComment.list&&stuComment.list.length>0">
        <p v-for="(comment,index) in stuComment.list" :key="index">{{index+1}}、{{comment.content}}</p>
        <p style="color:#999;text-align:center;font-size:12px;margin-top:30px;">无更多记录了~</p>
      </template>
      <p v-else style="color:#999;text-align:center;margin-top:.5rem;">暂无学员评论</p>
    </div>
    <button class="btn_com" @click="orderRightNow">立即预约</button>
  </div>
</template>

<script>
import headerTitle from "../../components/headerTitle";
import api from "../../api/common.js";
import { getStore } from "../../common/util.js";
import { setTimeout } from "timers";
export default {
  components: {
    headerTitle
  },
  data() {
    return {
      trainerMsg: {
        member: {
          avator: ""
        }
      }, //当前教练信息
      stuComment: "", //学员评论
      isShowComment: false //是否展开学员评论
    };
  },
  async created() {
    //获取教练详情
    this.trainerMsg = await api.getTrainerDetail(this.$route.query.id);
    //获取学员评价
    this.stuComment = await api.getStudentComment(this.$route.query.id);
    console.log(this.stuComment.list);
  },
  methods: {
    //预约教练
    orderRightNow() {
      let stu = JSON.parse(getStore("loginInfo"));
      api.orderTrainer(stu.user_id, this.$route.query.id).then(res => {
        if (res != "err") {
          this.$toast("预约成功！");
          setTimeout(() => {
            this.$router.push(`/myOrder?uid=${stu.user_id}`);
          }, 1500);
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.tg {
  margin-top: 0.24rem;
  background: #fff;
}
.my_lg {
  line-height: 0.78rem;
  border-bottom: 1px solid #eee;
  font-size: 0.3rem;
  span {
    font-size: inherit;
    color: $color_blue;
  }
}

//基本信息
.base_info {
  width: 100%;
  margin-top: 0.4rem;
  background: #fff;
  display: flex;
  padding-bottom: 0.5rem;
  > img {
    width: 2.5rem;
    height: 2.94rem;
    border-radius: 4px;
    margin: 0.24rem 0.3rem;
    margin-bottom: 0;
    background: gray;
  }
  .text {
    flex: 1;
    li {
      @extend .my_lg;
    }
  }
}
//工作信息
.work_info {
  @extend .tg;
  li {
    @extend .my_lg;
    padding-left: 0.3rem;
  }
}
// 学员评价
.stu_comment {
  width: 100%;
  background: #fff;
  margin-top: 0.24rem;
  h2 {
    font-size: 0.3rem;
    line-height: 0.8rem;
    font-weight: 400;
    padding: 0 0.3rem;
    border-bottom: 1px solid #eee;
    i {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url("../../assets/img/right_arrow.png") no-repeat 98% center;
      background-size: 10px 14px;
      transition: transform 0.3s;
    }
  }
  p {
    font-size: 0.3rem;
    line-height: 1.4;
    text-indent: -1.4em;
    margin: 0.2rem 0;
    margin-left: 1.4em;
    padding-left: 0.3rem;
    display: none;
  }
  &.active {
    padding-bottom: 0.42rem;
    > h2 {
      i {
        transform: rotate(90deg);
      }
    }
    > p {
      display: block;
    }
  }
}
</style>
