<template>
  <div class="container">
    <headerTitle title="个人中心"></headerTitle>
    <ul class="info">
      <li class="flex_between">
        <i>我的id</i>
        <span>{{msg.user_info.id}}</span>
      </li>
      <li class="flex_between" @click="goToDetail(msg.user_info.id)">
        <i>我的订单</i>
        <span class="right_arrow"></span>
      </li>
      <li class="flex_between" @click="goToResetPwd">
        <i>修改密码</i>
        <span class="right_arrow"></span>
      </li>
      <li class="flex_between">
        <i>投诉电话</i>
        <a :href="'tel:'+msg.user_info.complaint_telephone">{{msg.user_info.complaint_telephone}}</a>
      </li>
      <li class="flex_between">
        <i>客服电话</i>
        <a :href="'tel:'+msg.user_info.service_telephone">{{msg.user_info.service_telephone}}</a>
      </li>
    </ul>
    <button class="btn_com" style="margin-top:2rem;" @click="loginOut">退出登录</button>
    <stuFooter></stuFooter>
  </div>
</template>

<script>
import headerTitle from "../../components/headerTitle";
import stuFooter from "../../components/stuFooter";
import api from "../../api/common.js";
import { getStore, removeStore } from "../../common/util.js";
import { setTimeout } from "timers";
export default {
  components: {
    headerTitle,
    stuFooter
  },
  data() {
    return {
      msg: ""
    };
  },
  async created() {
    let stu = JSON.parse(getStore("loginInfo"));
    console.log(stu);
    if (stu) this.msg = await api.getPersonInfo(stu.user_id);
    else {
      this.$toast("无浏览权限，请登录！！！");
      this.$router.push("/login");
      return false;
    }
    console.log(this.msg);
  },
  methods: {
    //退出登录
    loginOut() {
      removeStore("loginInfo");
      removeStore("stuMobile");
      setTimeout(() => {
        this.$router.push("/login");
      }, 500);
    },

    //跳转修改密码
    goToResetPwd() {
      this.$router.push("/resetPwd?type=0"); //根据type判断角色，0：学员，1：教练
    },

    //跳转详情
    goToDetail(id) {
      this.$router.push(`/myOrder?uid=${id}`);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.tg {
  margin-top: 0.4rem;
  background: #fff;
}
.my_lg {
  line-height: 0.78rem;
  border-bottom: 1px solid #eee;
  font-size: 0.3rem;
  i {
    font-size: inherit;
  }
  a {
    color: $color_blue;
  }
  span {
    font-size: inherit;
    color: $color_blue;
  }
}
.info {
  @extend .tg;
  padding-left: 0.3rem;
  li {
    @extend .my_lg;
    padding-right: 0.3rem;
    .right_arrow {
      width: 0.2rem;
      height: 0.3rem;
      background: url("../../assets/img/right_arrow.png") no-repeat;
      background-size: 0.2rem 0.3rem;
    }
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
