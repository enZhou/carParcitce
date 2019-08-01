<template>
  <div class="container">
    <headerTitle :title="msg.student_nickname+'学车详情'"></headerTitle>
    <ul class="stuInfo">
      <li>
        订单id：
        <b>{{msg.id}}</b>
      </li>
      <li v-if="msg.status==2">
        订单状态：
        <b>{{msg.status==2?'已签约':''}}</b>
      </li>
      <template v-if="msg.status==2">
        <li>
          证件：
          <b>{{msg.student_card_number}}</b>
        </li>
        <li>
          电话：
          <a :href="'tel:'+msg.student_mobile">{{msg.student_mobile}}</a>
        </li>
      </template>
      <li v-if="msg.status==1" style="display:flex;justify-content: center;">
        <button class="btn_com signContract" @click="signContract">点击签约</button>
      </li>
    </ul>
    <!-- 完成情况 -->
    <div class="complete_acc">
      <ul>
        <li>科目一</li>
        <li>科目一</li>
        <li>科目二</li>
        <li>科目三</li>
        <li>科目四</li>
        <li>驾驶证</li>
      </ul>
      <ul class="num">
        <li
          :class="[{'color_blue':msg.subject_one_status==2},{'color_red':msg.subject_one_status==1},{'color_gray':msg.subject_one_status==0}]"
        >1</li>
        <li
          :class="[{'color_blue':msg.subject_two_status==2},{'color_red':msg.subject_two_status==1},{'color_gray':msg.subject_two_status==0}]"
        >2</li>
        <li
          :class="[{'color_blue':msg.subject_three_status==2},{'color_red':msg.subject_three_status==1},{'color_gray':msg.subject_three_status==0}]"
        >3</li>
        <li
          :class="[{'color_blue':msg.subject_four_status==2},{'color_red':msg.subject_four_status==1},{'color_gray':msg.subject_four_status==0}]"
        >4</li>
        <li
          :class="[{'color_blue':msg.is_get_certificate==1},{'color_gray':msg.subject_one_status==0}]"
        >5</li>
      </ul>
      <ul class="status">
        <li
          :class="[{'color_blue':msg.subject_one_status==2},{'color_red':msg.subject_one_status==1},{'color_gray':msg.subject_one_status==0}]"
        >{{msg.subject_one_status==2?'已完成':msg.subject_one_status==1?'学习中':'未完成'}}</li>
        <li
          :class="[{'color_blue':msg.subject_two_status==2},{'color_red':msg.subject_two_status==1},{'color_gray':msg.subject_two_status==0}]"
        >{{msg.subject_two_status==2?'已完成':msg.subject_two_status==1?'学习中':'未完成'}}</li>
        <li
          :class="[{'color_blue':msg.subject_three_status==2},{'color_red':msg.subject_three_status==1},{'color_gray':msg.subject_three_status==0}]"
        >{{msg.subject_three_status==2?'已完成':msg.subject_three_status==1?'学习中':'未完成'}}</li>
        <li
          :class="[{'color_blue':msg.subject_four_status==2},{'color_red':msg.subject_four_status==1},{'color_gray':msg.subject_four_status==0}]"
        >{{msg.subject_four_status==2?'已完成':msg.subject_four_status==1?'学习中':'未完成'}}</li>
        <li
          :class="[{'color_blue':msg.is_get_certificate==1},{'color_gray':msg.subject_one_status==0}]"
        >{{msg.is_get_certificate==1?'已获得':'未获得'}}</li>
      </ul>
    </div>
    <!-- 学习记录 -->
    <div class="learn_record">
      <h2>学习记录</h2>
      <template v-if="recordsList.length>0">
        <p
          v-for="(records,index) in recordsList"
          :key="index"
        >{{index+1}}、{{records.date}} {{records.time}}:{{records.content}}</p>
        <p style="color:#999;text-align:center;font-size:12px;margin-top:30px;">无更多记录了~</p>
      </template>
      <p v-else style="color:#999;">暂无学习记录</p>
    </div>
    <!-- 学员评价 -->
    <div class="learn_record">
      <h2>学员评价</h2>
      {{$route.query.content}}
    </div>
  </div>
</template>

<script>
import api from "../../api/common.js";
import headerTitle from "../../components/headerTitle";
export default {
  components: { headerTitle },
  data() {
    return {
      recordsList: [] //学习记录
    };
  },
  async created() {
    //获取学员详情:接口有问题，从上个页面拿取的数据
    //   this.msg=await api.getStuDetail(this.$route.query.coachId,this.$route.query.stuId);
    this.msg = this.$route.query.stuDetail;
    console.log(this.msg);

    //获取学员学习记录
    let result = await api.getLearnRecords(this.msg.student_id);
    this.recordsList = result.list;
    console.log(this.recordsList);
  },
  methods: {
    //点击签约
    signContract() {
      api.signContract(this.msg.coach_id, this.msg.student_id).then(res => {
        console.log(res);
        if (res != "err") {
          this.$toast("签约成功");
          this.$router.go(-1);
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.color_gray {
  color: gray;
}
.color_red {
  color: $color_red;
}
.color_blue {
  color: $color_blue;
}
//点击签约
.signContract {
  margin: 0;
  background: #f58d1e;
}
.stuInfo {
  width: 100%;
  background: #fff;
  padding: 0.42rem 0.3rem;
  li {
    color: #999;
    font-size: 0.34rem;
    &:not(:last-child) {
      margin-bottom: 0.3rem;
    }
    a,
    b {
      color: $color_blue;
      font-size: inherit;
      font-weight: normal;
    }
  }
}
.complete_acc {
  background: #fff;
  margin-top: 0.24rem;
  padding: 0.6rem 0;
  > ul {
    display: flex;
    justify-content: space-around;
    &:not(:last-child) {
      margin-bottom: 0.4rem;
    }
    &.num {
      li {
        width: 0.4rem;
        line-height: 0.4rem;
        border-radius: 50%;
        background: #f4f1f4;
        text-align: center;
        position: relative;
        &:not(:first-child)::before {
          content: "";
          display: block;
          width: calc((100vw - 0.4rem * 8) / 4);
          // width:100vw;
          height: 1px;
          background: #f4f1f4;
          position: absolute;
          top: 0.2rem;
          left: calc((-100vw + 0.4rem * 8) / 4);
        }
        &.color_red {
          background: $color_red;
          color: #fff;
          &:not(:first-child)::before {
            background: $color_red;
          }
        }
        &.color_blue {
          background: $color_blue;
          color: #fff;
          &:not(:first-child)::before {
            background: $color_blue;
          }
        }
      }
    }
    &.status {
      li {
        &.active {
          color: $color_blue;
        }
      }
    }
  }
}
.learn_record {
  width: 100%;
  // height: calc(100vh - 7.1rem);
  background: #fff;
  margin-top: 0.24rem;
  padding: 0.42rem 0.3rem;
  h2 {
    font-size: 0.36rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }
  p {
    font-size: 0.3rem;
    line-height: 1.4;
    text-indent: -1.4em;
    margin: 0.2rem 0;
    margin-left: 1.4em;
  }
}
</style>
