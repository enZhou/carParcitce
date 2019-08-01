<template>
  <div style="width:100%;height:100vh;overflow:hidden;background:#fff;">
    <!-- <headerTitle title="登录"></headerTitle> -->
    <h2 class="title">学员登录</h2>
    <ul class="input_text">
      <li>
        <label for>手机号：</label>
        <input type="text" ref="mobile" v-model="mobile" placeholder="请输入手机号" maxlength="11">
        <i class="clear" @click="clear('mobile')">&times;</i>
      </li>
      <li>
        <label for>密码：</label>
        <input type="password" ref="pwd" v-model="pwd" placeholder="请输入密码" maxlength="12">
        <i class="clear" @click="clear('pwd')">&times;</i>
      </li>
    </ul>
    <button class="btn_com" @click="login">登录</button>
    <p class="flex_between" style="padding:0 .3rem;">
      <router-link class="resetPwd" to="/regStu">注册</router-link>
      <router-link class="resetPwd" :to="{path:'/resetPwd?type=0'}">忘记密码？</router-link>
    </p>
  </div>
</template>

<script>
import headerTitle from "../components/headerTitle";
import api from "../api/common.js";
import { setStore } from "../common/util.js";
import { setTimeout } from "timers";
import { canSendCode, checkCode, checkPwd, trimBlank } from "../common/util.js";
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
    if (localStorage.getItem("stuMobile")) {
      this.$router.push("/chooseTrainer");
    }
  },
  methods: {
    //清除手机号或者密码
    clear(type){
      if(type=='mobile'){
        this.mobile='';
        this.$nextTick(()=>{
          this.$refs.mobile.focus();
        })
      }else{
        this.pwd='';
        this.$nextTick(()=>{
          this.$refs.pwd.focus();
        })
      }
    },
    //去登录
    login() {
      let msg = canSendCode(this.mobile);
      if (msg != "ok") {
        this.$toast(msg, true);
        return false;
      }
      msg = checkPwd(this.pwd);
      if (msg != "ok") {
        this.$toast(msg, true);
        return false;
      }
      api.login(0, this.mobile, this.pwd).then(res => {
        if (res != "err") {
          localStorage.setItem("stuMobile", this.mobile);
          this.$toast("登录成功", true);
          setStore("loginInfo", res);
          setTimeout(() => {
            this.$router.push("/chooseTrainer");
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
  text-align: right;
  font-size: 0.3rem;
  position: relative;
  top: -0.2rem;
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
