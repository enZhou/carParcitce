import * as types from '@/store/mutation-types.js';
// import {userInfo} from "@/api/common";

export default {
    //封装倒计时
    countDownFun({
        commit,
        state
    }) {
        let intervalDown = setInterval(() => {
            if (state.countDown <= 0) {
                clearInterval(intervalDown);
                state.canSend = false;
                state.countDown = 60;
                return false;
            } else {
                state.countDown--;
            }
        }, 1000);

    }
}
