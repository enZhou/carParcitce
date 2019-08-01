import * as types from '@/store/mutation-types.js';

export default {
    [types.CHG_SEND_STATUS](state, status) {
        console.log(status);
        state.canSend = status;
    },
}
