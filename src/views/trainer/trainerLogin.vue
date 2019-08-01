<template>
  <div style="width:100%;height:100vh;overflow:hidden;background:#fff;">
    <!-- <headerTitle title="登录"></headerTitle> -->
    <h2 class="title">教练登录</h2>
    <ul class="input_text">
      <li>
        <label for>手机号：</label>
        <input type="text" ref="mobile" v-model="mobile" placeholder="请输入手机号" maxlength="11" />
        <i class="clear" @click="clear('mobile')">&times;</i>
      </li>
      <li>
        <label for>密码：</label>
        <input type="password" ref="pwd" v-model="pwd" placeholder="请输入密码" maxlength="12" />
        <i class="clear" @click="clear('pwd')">&times;</i>
      </li>
    </ul>
    <button class="btn_com" @click="login">登录</button>
    <router-link class="resetPwd" :to="{path:'/resetPwd?type=1'}">忘记密码？</router-link>
  </div>
</template>

<script>
import headerTitle from "../../components/headerTitle";
import api from "../../api/common.js";
import { setStore } from "../../common/util.js";
import { setTimeout } from "timers";
export default {
  components: {
    headerTitle
  },
  data() {
    return {
      mobile: "", //手机号
      pwd: "" //密码
    };
  },
  created() {
    if (localStorage.getItem("trainerMobile")) {
      this.$router.push("/myStu");
    }
  },
  methods: {
    //清除手机号或者密码
    clear(type) {
      if (type == "mobile") {
        this.mobile = "";
        this.$nextTick(() => {
          this.$refs.mobile.focus();
        });
      } else {
        this.pwd = "";
        this.$nextTick(() => {
          this.$refs.pwd.focus();
        });
      }
    },
    //去登录
    login() {
      api.trainerLogin(1, this.mobile, this.pwd).then(res => {
        console.log(res);
        if (res != "err") {
          localStorage.setItem("trainerMobile", this.mobile);
          this.$toast("登录成功", true);
          setStore("trainerInfo", res);
          setTimeout(() => {
            this.$router.push("/myStu");
          }, 1500);
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.title {
  text-align: center;
  margin-top: 1rem;
  color: $color_red;
  font-size: 0.4rem;
  font-weight: 800;
  margin-bottom: 0.6rem;
  letter-spacing: 4px;
}
.input_text {
  padding: 0 0.3rem;
  li {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    border-radius: 4px;
    label {
      width: 1.2rem;
      line-height: 1rem;
    }
    input {
      flex: 1;
    }
  }
}
.btn_com {
  width: 92%;
  margin-left: 4%;
}
.resetPwd {
  display: block;
  color: $color_red;
  padding-right: 0.3rem;
  text-align: right;
}
.clear {
  width: 20px;
  height: 20px;
  background-color: #eee;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
}
</style>
