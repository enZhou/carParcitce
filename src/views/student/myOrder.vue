<template>
  <div class="container" :class="{'no_scroll':recordIsShow}">
    <headerTitle title="订单详情"></headerTitle>
    <p style="line-height:1rem;padding-left:.3rem;background:#fff;font-size:.32rem;">
      教练编号：
      <b style="font-size:.32rem;color:#F1594B;">{{orderDetail.member.teach_code}}</b>
    </p>
    <!-- 科目一二三四、是否获得驾照、评分 -->
    <ul class="can_modify_info">
      <li class="warning">科目状态一旦选择，无法回改，请慎重选择</li>
      <li class="flex_between">
        <label for>科目一</label>
        <select
          v-model="orderDetail.member.subject_one_status"
          @change="changeStu('subject_one_status',orderDetail.member.subject_one_status)"
          dir="rtl"
          :class="[{'color_blue':orderDetail.member.subject_one_status==2},{'color_red':orderDetail.member.subject_one_status==1},{'color_gray':orderDetail.member.subject_one_status==0}]"
        >
          <option :value="index" v-for="(opt,index) in learnStatus" :key="index">{{opt}}</option>
        </select>
      </li>
      <li class="flex_between">
        <label for>科目二</label>
        <select
          v-model="orderDetail.member.subject_two_status"
          @change="changeStu('subject_two_status',orderDetail.member.subject_two_status)"
          dir="rtl"
          :class="[{'color_blue':orderDetail.member.subject_two_status==2},{'color_red':orderDetail.member.subject_two_status==1},{'color_gray':orderDetail.member.subject_two_status==0}]"
        >
          <option :value="index" v-for="(opt,index) in learnStatus" :key="index">{{opt}}</option>
        </select>
      </li>
      <li class="flex_between">
        <label for>科目三</label>
        <select
          v-model="orderDetail.member.subject_three_status"
          @change="changeStu('subject_three_status',orderDetail.member.subject_three_status)"
          dir="rtl"
          :class="[{'color_blue':orderDetail.member.subject_three_status==2},{'color_red':orderDetail.member.subject_three_status==1},{'color_gray':orderDetail.member.subject_three_status==0}]"
        >
          <option :value="index" v-for="(opt,index) in learnStatus" :key="index">{{opt}}</option>
        </select>
      </li>
      <li class="flex_between">
        <label for>科目四</label>
        <select
          v-model="orderDetail.member.subject_four_status"
          @change="changeStu('subject_four_status',orderDetail.member.subject_four_status)"
          dir="rtl"
          :class="[{'color_blue':orderDetail.member.subject_four_status==2},{'color_red':orderDetail.member.subject_four_status==1},{'color_gray':orderDetail.member.subject_four_status==0}]"
        >
          <option :value="index" v-for="(opt,index) in learnStatus" :key="index">{{opt}}</option>
        </select>
      </li>
      <li class="flex_between" v-if="orderDetail.member.subject_four_status==2">
        <label for>是否取得驾照</label>
        <select
          v-model="orderDetail.member.is_get_certificate"
          @change="changeStu('is_get_certificate',orderDetail.member.is_get_certificate)"
          dir="rtl"
          :class="[{'color_blue':orderDetail.member.is_get_certificate==1},{'color_gray':orderDetail.member.is_get_certificate==0}]"
        >
          <option :value="index" v-for="(isGet,index) in cerStatus" :key="index">{{isGet}}</option>
        </select>
      </li>
      <li class="flex_between" v-if="orderDetail.member.is_get_certificate==1">
        <label for>评分</label>
        <select
          v-model="orderDetail.member.number"
          @change="evaluate(orderDetail.member.number)"
          dir="rtl"
        >
          <option :value="grade" v-for="(grade,index) in grades" :key="index">{{grade}}分</option>
        </select>
      </li>
    </ul>
    <div class="learn_records" v-if="orderDetail.member.number">
      <p class="flex_between" style="border-bottom:1px solid #eee;">
        <label>进行评价</label>
        <span
          @click="submitComment"
          style="display:flex;align-items:center;color:#F58D1E;font-weight:800;"
        >提交评价</span>
      </p>
      <!-- 评价 -->
      <textarea
        v-model="comment"
        style="width:100%;padding:10px 0;"
        rows="2"
        cols="2"
        placeholder="请对教练进行评价（40字以内）"
      ></textarea>
    </div>
    <!-- 学习记录相关信息 -->
    <div class="learn_records">
      <p class="flex_between">
        <label>学习记录</label>
        <span
          @click="addRecords"
          style="display:flex;align-items:center;color:#F58D1E;font-weight:800;"
        >
          添加
          <img src="../../assets/img/release.png" alt>
        </span>
      </p>
      <!-- 记录 -->
      <ul>
        <li
          v-for="(records,index) in orderRecords.list"
          :key="index"
        >{{index+1}}、{{records.date}} {{records.time}}:{{records.content}}</li>
        <li style="color:#999;text-align:center;font-size:12px;margin-top:30px;">无更多记录了~</li>
      </ul>
    </div>
    <!-- 添加学习记录 -->
    <div class="record_shade" v-if="recordIsShow" @click="recordIsShow=false">
      <div class="inner_box" @click.stop>
        <h2>添加学车记录</h2>
        <ul class="can_modify_info">
          <li class="flex_between">
            <label for>学车日期</label>
            <input v-model="recordInfo.date" type="date" placeholder="请选择学车日期">
          </li>
          <li class="flex_between">
            <label for>学车时段</label>
            <select v-model="recordInfo.time" dir="rtl">
              <option v-for="(step,index) in dayStep" :key="index" :value="step">{{step}}</option>
            </select>
          </li>
          <li class="flex_between">
            <label for>学车内容</label>
            <input
              v-model="recordInfo.content"
              type="text"
              placeholder="请输入学车内容（30字以内）"
              maxlength="30"
            >
          </li>
        </ul>
        <button class="btn_com" @click="confirmAdd">确认添加</button>
      </div>
    </div>
    <!-- 弹出遮罩层 -->
    <div class="shadow_box" v-if="shadeBoxShow">
      <div class="content_box">
        <h2>提示</h2>
        <p>状态一旦选择，无法回改，请慎重选择</p>
        <ul>
          <li @click="isConfirm('no')">取消</li>
          <li @click="isConfirm('yes')">确定</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import headerTitle from "../../components/headerTitle";
import api from "../../api/common.js";
export default {
  components: {
    headerTitle
  },
  data() {
    return {
      learnStatus: ["未开始", "学习中", "已完成"],
      cerStatus: ["未获得", "已获得"],
      grades: ["40", "50", "60", "70", "80", "90", "100"],
      dayStep: ["上午", "下午", "晚上"],
      recordIsShow: false,
      shadeBoxShow: false, //遮罩层是否显示，默认不显示
      comment: "", //对于教练的评价
      orderDetail: {
        member: {
          is_get_certificate: 0,
          number: null,
          order_code: "",
          status: "",
          subject_four_status: 0,
          subject_one_status: 0,
          subject_three_status: 0,
          subject_two_status: 0,
          teach_code: ""
        }
      }, //预定详情
      orderRecords: [], //学习记录
      recordInfo: {
        id: "",
        date: "",
        time: "",
        content: ""
      }
    };
  },
  async created() {
    this.getDetail();
    //获取学习记录
    this.orderRecords = await api.getLearnRecords(this.$route.query.uid);
    console.log(this.orderRecords);
  },
  methods: {
    async getDetail() {
      //请求详情
      this.orderDetail = await api.getOrderDetail(this.$route.query.uid);
      this.comment = this.orderDetail.member.pj_content;
      //复制一份详情信息，用于以后回置数据
      this.orderDetailBak = { ...this.orderDetail.member };
      this.orderDetail.member.number = parseInt(this.orderDetail.member.number);
    },
    //添加学习记录
    addRecords() {
      this.recordIsShow = true;
    },

    //选择状态
    changeStu(name, id) {
      this.shadeBoxShow = true;
      this.name = name;
      this.id = id;
    },

    //提交评价
    submitComment() {
      api
        .commentCoach(
          this.$route.query.uid,
          this.orderDetail.member.id,
          this.comment
        )
        .then(res => {
          if (res != "err") {
            this.$toast("评价成功");
          }
        });
    },

    //是否确认进行修改
    isConfirm(type) {
      if (type == "yes") {
        api
          .modifyStatus(this.$route.query.uid, this.name, this.id)
          .then(res => {
            console.log(res);
            if (res == "err") {
              this.$set(
                this.orderDetail.member,
                name,
                this.orderDetailBak[name]
              );
            } else {
              this.$toast("修改成功");
            }
          });
      } else {
        this.getDetail();
      }
      this.shadeBoxShow = false;
    },
    //进行评价
    evaluate(num) {
      api
        .evaluate(this.$route.query.uid, this.orderDetail.member.coach_id, num)
        .then(res => {
          console.log(res);
          if (res != "err") {
            this.$toast("评分成功");
          } else {
            console.log(this.orderDetailBak.number);
            this.$set(
              this.orderDetail.member,
              "number",
              parseInt(this.orderDetailBak.number)
            );
          }
        });
    },
    //确认添加
    async confirmAdd() {
      this.recordInfo.id = this.$route.query.uid;
      if (!this.recordInfo.date) {
        this.$toast("请选择学车日期");
        return false;
      }
      if (!this.recordInfo.time) {
        this.$toast("请选择学车时段");
        return false;
      }
      if (!this.recordInfo.content) {
        this.$toast("请输入学车内容");
        return false;
      }
      await api.addRecords(this.recordInfo).then(res => {
        if (res != "err") {
          this.$toast("记录添加成功");
          this.recordIsShow = false;
        }
      });
      if (!this.recordIsShow)
        this.orderRecords = await api.getLearnRecords(this.$route.query.uid);
      this.recordInfo = {
        id: "",
        date: "",
        time: "",
        content: ""
      };
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
.no_scroll {
  height: 100vh;
  overflow: hidden;
}
.warning {
  padding-left: 26px;
  background: url("../../assets/img/warning.png") no-repeat left center;
  background-size: 20px;
  color: #fcaf46;
}
.can_modify_info {
  margin-top: 0.42rem;
  background: #fff;
  padding: 0 0.3rem;
  li {
    line-height: 1rem;
    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
    label {
      font-size: 0.32rem;
      width: 100px;
      flex-shrink: 0;
    }
    select {
      flex: 1;
      direction: rtl;
      background: url("../../assets/img/right_arrow.png") no-repeat right center;
      background-size: 10px 14px;
    }
    select option {
      direction: rtl;
    }
  }
}

//学习记录
.learn_records {
  margin-top: 0.4rem;
  padding: 0 0.3rem;
  background: #fff;
  p {
    // background: url("../../assets/img/arrow_on.png") no-repeat right center;
    background-size: 16px 16px;
    height: 1rem;
    font-size: 0.32rem;
    display: flex;
    align-items: center;
  }
  img {
    width: 20px;
    height: 20px;
    margin-left: 0.2rem;
  }
  ul {
    border-top: 1px solid #eee;
    padding: 0.4rem 0;
    min-height: calc(100vh - 8.9rem);
    // overflow-y: scroll;
    li {
      line-height: 1.4;
      text-indent: -1.4em;
      margin: 0.2rem 0;
      margin-left: 1.4em;
    }
  }
}
//添加学习记录
.record_shade {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);

  .inner_box {
    width: 100vw;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #fff;
    animation: fadeIn 0.3s;
    h2 {
      line-height: 1rem;
      font-size: 0.32rem;
      border-bottom: 1px solid #eee;
      padding-left: 0.3rem;
      font-weight: 800;
    }
    ul {
      margin-top: 0;
      li {
        label {
          font-size: 0.28rem;
        }
        &:last-child {
          border-bottom: 1px solid #eee;
        }
        input {
          flex: 1;
          text-align: right;
        }
        input[type="date"] {
          background: url("../../assets/img/calender.png") no-repeat right
            center;
          background-size: 16px 16px;
          text-align: right;
        }
      }
    }
    .btn_com {
      width: 92%;
      margin-left: 4%;
      font-size: 0.32rem;
    }
  }
}
.shadow_box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  animation: fadeIn 0.3s;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  .content_box {
    margin: auto;
    width: 80%;
    height: 3rem;
    background: #fff;
    border-radius: 4px;
    > h2 {
      line-height: 0.7rem;
      text-align: center;
      background: $color_red;
      color: #fff;
      border-radius: 4px 4px 0 0;
    }
    > p {
      line-height: 1.5rem;
      color: #999;
      font-size: 0.3rem;
      text-align: center;
      color: $color_red;
    }
    > ul {
      display: flex;
      > li {
        flex: 1;
        text-align: center;
        line-height: 0.8rem;
        border-top: 1px solid #eee;
        &:last-child {
          background: $color_red;
          color: #fff;
          border-color: $color_red;
          border-radius: 0 0 4px 0;
        }
      }
    }
  }
}

@keyframes fadeIn {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
