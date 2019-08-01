<template>
  <div class="container">
    <headerTitle title="教练详情"></headerTitle>
    <!-- 教练基本信息 -->
    <div class="base_info">
      <img v-if="trainerMsg.user_info.avatar" :src="trainerMsg.user_info.avatar | imgContact" alt />
      <img v-else src="../../assets/img/default_avatar.jpg" alt />
      <ul class="text">
        <li>
          评分：
          <span>{{trainerMsg.user_info.number>0?trainerMsg.user_info.number:90}}分</span>
        </li>
        <li>
          姓名：
          <span>{{trainerMsg.user_info.name}}</span>
        </li>
        <li>
          编号：
          <span>{{trainer.user_id?'000'+trainer.user_id:'无编号'}}</span>
        </li>
        <li>
          性别：
          <span>{{trainerMsg.user_info.sex}}</span>
        </li>
      </ul>
    </div>
    <!-- 教练工作信息 -->
    <ul class="work_info">
      <li>
        当前级别：
        <span>{{trainerMsg.user_info.old_work_level}}</span>
      </li>
      <li>
        报考级别：
        <span>{{trainerMsg.user_info.work_level}}</span>
      </li>
      <li>
        工龄：
        <span>{{trainerMsg.user_info.work_years?trainerMsg.user_info.work_years:0}}年</span>
      </li>
      <li>
        报价/元：
        <input
          style="color:#F1594B;"
          placeholder="价格区间2000-5000"
          type="number"
          maxlength="7"
          v-model="trainerMsg.user_info.teach_price"
        />
      </li>
      <li>
        <!-- 教学时段： -->
        <p>教学时段： {{ trainerMsg.user_info.teach_time.join('、') }}</p>
        <select v-model="trainerMsg.user_info.teach_time" multiple dir="rtl">
          <option :value="opt" v-for="(opt,index) in dayStep" :key="index">{{opt}}</option>
        </select>
      </li>
      <li>
        教学方式：
        <select v-model="trainerMsg.user_info.teach_type" dir="rtl">
          <option :value="teachWay">{{teachWay}}</option>
        </select>
      </li>
      <li>
        教学区域：
        <select v-model="trainerMsg.user_info.teach_area" dir="rtl">
          <option :value="opt" v-for="(opt,index) in areaOptions" :key="index">{{opt}}</option>
        </select>
      </li>
    </ul>
    <!-- 教练证件信息 -->
    <ul class="cer_info work_info">
      <li>
        证件：
        <span>{{trainerMsg.user_info.card_number | formatCard}}</span>
      </li>
      <li>
        单位：
        <span>平台合作驾校</span>
      </li>
    </ul>
    <!-- 学员评论查看
    <div class="learn_record" :class="{'active':isShowComment}">
      <h2 @click="isShowComment=!isShowComment" class="flex_between">
        <span>学员评论</span>
        <i></i>
      </h2>
      <template v-if="stuComment.list.length>0">
        <p v-for="(comment,index) in stuComment.list" :key="index">{{index+1}}、{{comment.content}}</p>
        <p style="color:#999;text-align:center;font-size:12px;margin-top:30px;">无更多记录了~</p>
      </template>
      <p v-else style="color:#999;text-align:center;margin-top:.5rem;">暂无学员评论</p>
    </div> -->
    <div class="btns">
      <p @click="saveInfo">保存信息</p>
      <p @click="loginOut">退出登录</p>
    </div>
    <trainerFooter></trainerFooter>
  </div>
</template>

<script>
import headerTitle from "../../components/headerTitle";
import trainerFooter from "../../components/trainerFooter";
import api from "../../api/common.js";
import { getStore, removeStore } from "../../common/util.js";
import { parse } from "path";
export default {
  components: {
    headerTitle,
    trainerFooter
  },
  data() {
    return {
      trainerMsg: {
        user_info: {
          avator: ""
        }
      }, //当前教练信息
      dayStep: ["上午", "下午", "晚上"],
      areaOptions: [
        "昆明市-全城",
        "昆明市-市区",
        "昆明市-五华区",
        "昆明市-盘龙区",
        "昆明市-盘龙区",
        "昆明市-官渡区",
        "昆明市-西山区",
        "昆明市-呈贡区"
      ],
      teachWay: "一对二",
      canModifyInfo: {
        id: "",
        avatar: "",
        teach_price: "",
        teach_time: "",
        teach_type: "",
        teach_area: ""
      },
      stuComment: "", //学员评论
      isShowComment: false //是否展开学员评论
    };
  },
  async created() {
    this.trainer = JSON.parse(getStore("trainerInfo"));
    //获取教练详情
    this.trainerMsg = await api.getTrainerInfo(this.trainer.user_id);
    this.trainerMsg.user_info.teach_price = parseFloat(
      this.trainerMsg.user_info.teach_price
    );
    this.trainerMsg.user_info.teach_time = this.trainerMsg.user_info.teach_time.split(
      ","
    );
    //根据后端数据数据库的存储格式，对教学区域的格式进行处理
    if (
      this.trainerMsg.user_info.teach_area &&
      !this.trainerMsg.user_info.teach_area.includes("-")
    ) {
      this.trainerMsg.user_info.teach_area =
        "昆明市" +
        this.trainerMsg.user_info.teach_area.split("昆明市").join("-");
    }
    //获取学员评价
    this.stuComment = await api.getStudentComment(this.trainer.user_id);
    console.log(this.stuComment.list);
  },
  methods: {
    //点击保存
    saveInfo() {
      if (!this.trainerMsg.user_info.teach_time) {
        this.$toast("请选择教学时段");
        return false;
      }
      if (!this.trainerMsg.user_info.teach_type) {
        this.$toast("请选择教学方式");
        return false;
      }
      if (!this.trainerMsg.user_info.teach_area) {
        this.$toast("请选择教学区域");
        return false;
      }
      if (
        parseFloat(this.trainerMsg.user_info.teach_price) < 2000 ||
        parseFloat(this.trainerMsg.user_info.teach_price) > 5000
      ) {
        this.$toast("报价区间为2000至5000,请重新填写！");
        return false;
      }

      this.canModifyInfo = {
        id: this.trainer.user_id,
        avatar: this.trainerMsg.user_info.avatar,
        teach_price: this.trainerMsg.user_info.teach_price,
        teach_time: this.trainerMsg.user_info.teach_time.toString(),
        teach_type: this.trainerMsg.user_info.teach_type,
        teach_area: this.trainerMsg.user_info.teach_area
      };

      api.saveTrainerInfo(this.canModifyInfo).then(res => {
        console.log(res);
        if (res != "err") {
          this.$toast("信息更新成功！");
        }
      });
    },

    //退出登录
    loginOut() {
      removeStore("trainerInfo");
      removeStore("trainerMobile");
      setTimeout(() => {
        this.$router.push("/trainerLogin");
      }, 500);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.container {
  padding-bottom: 1.4rem;
}
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
    display: flex;
    justify-content: space-between;
    padding: 0 0.3rem;
    select,
    input {
      width: 40%;
    }
    select {
      // padding-right: 0;
      background: url("../../assets/img/right_arrow.png") no-repeat right center;
      background-size: 10px 14px;
    }
    input {
      text-align: right;
    }
  }
}

.btns {
  display: flex;
  margin-top: 0.4rem;
  width: 90%;
  height: 1rem;
  border-radius: 0.5rem;
  // background: red;
  margin-left: 5%;
  p {
    flex: 1;
    text-align: center;
    line-height: 1rem;
    color: #fff;
    font-size: 0.32rem;
    background: $color_red;
    &:first-child {
      color: $color_red;
      background: #fff;
      border-radius: 0.5rem 0 0 0.5rem;
    }
    &:last-child {
      border-radius: 0 0.5rem 0.5rem 0;
    }
  }
}
// 学员评价
.learn_record {
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
