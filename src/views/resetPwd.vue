<template>
  <div style="width:100%;height:100vh;overflow:hidden;background:#fff;">
    <!-- <headerTitle title="登录"></headerTitle> -->
    <h2 class="title">{{$route.query.type==0?'学员重置密码':'教练重置密码'}}</h2>
    <ul class="input_text">
      <li>
        <label for>手机号：</label>
        <input v-model="mobile" type="text" placeholder="请输入手机号" maxlength="11">
      </li>
      <li>
        <label for>验证码：</label>
        <input v-model="code" type="text" placeholder="请输入验证码" maxlength="6">
        <button v-if="!canSend" @click="getCode" class="code_text">获取验证码</button>
        <button v-else class="code_text">倒计时{{countDown}}s</button>
      </li>
      <li>
        <label for>密码：</label>
        <input v-model="pwd" type="password" placeholder="请输入密码" maxlength="12">
      </li>
      <li>
        <label for>确认密码：</label>
        <input v-model="pwd2" type="password" placeholder="请再次输入密码" maxlength="12">
      </li>
    </ul>
    <button class="btn_com" @click="resetPwd">重置</button>
  </div>
</template>

<script>
import headerTitle from "../components/headerTitle";
import { mapState, mapMutations, mapActions } from "vuex";
import api from "../api/common.js";
import { canSendCode, checkCode, checkPwd, trimBlank } from "../common/util.js";
import { setTimeout } from "timers";
export default {
  components: {
    headerTitle
  },
  data() {
    return {
      mobile: "", //手机号
      pwd: "", //密码
      pwd2: "", //再次确认密码
      code: "" //验证码
    };
  },
  computed: {
    ...mapState(["countDown", "canSend"])
  },
  created() {},
  methods: {
    ...mapMutations(["CHG_SEND_STATUS"]),
    ...mapActions(["countDownFun"]),
    //获取验证码
    getCode() {
      let msg = canSendCode(this.mobile);
      console.log(msg);
      if (msg != "ok") {
        this.$toast(msg, true);
        return false;
      } else {
        api
          .resetPwdGetCode(this.$route.query.type, this.mobile, this.pwd)
          .then(res => {
            console.log(res);
            if (res != "err") {
              this.$store.commit("CHG_SEND_STATUS", true);
              if (this.canSend) {
                this.$store.dispatch("countDownFun");
                this.$toast("验证码发送成功", true);
              }
            }
          });
      }
    },
    //重置
    resetPwd() {
      let msg = canSendCode(this.mobile);
      if (msg != "ok") {
        this.$toast(msg, true);
        return false;
      }
      if (this.code == "ok") {
        this.$toast("请填写验证码", true);
        return false;
      }
      if (this.pwd == "" && this.pwd2 == "") {
        this.$toast("请填写密码", true);
        return false;
      }
      if (this.pwd != this.pwd2) {
        this.$toast("两次密码填写不一致，请重新填写", true);
        return false;
      }
      api
        .submitNewPwd(this.$route.query.type, this.mobile, this.pwd)
        .then(res => {
          if (res!='err') {
            this.$toast("密码已重置", true);
            setTimeout(() => {
              this.$router.go(-1);
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
  letter-spacing: 2px;
}
.input_text {
  padding: 0 0.3rem;
  li {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    label {
      width: 1.4rem;
      line-height: 1rem;
      flex-shrink: 0;
    }
    button {
      background: transparent;
      color: $color_red;
      &.code_text {
        flex-shrink: 0;
        width: 2rem;
        text-align: right;
        // font-size: 12px;
      }
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
  padding-left: 0.3rem;
  text-align: left;
  position: relative;
  font-size: 0.3rem;
  top: -0.2rem;
}
</style>
