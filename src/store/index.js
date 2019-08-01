import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './actions'


Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        countDown: 60, //登录注册模块：发送信息，倒计时60s
        canSend: false, //登录注册模块：是否可以发送验证码，默认不可以
    },
    actions, // 根级别的 action
    mutations, // 根级别的 mutations
})
