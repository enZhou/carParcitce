import {
    axiosGet,
    axiosPost
} from '../common/request'

export const imgUrl = 'http://www.jiaoliantong.online/upload/';

export default {
    /* Common */
    //重置密码：获取验证码
    resetPwdGetCode(type, mobile, password) {
        return axiosPost(`sms/getFoundPasswordCode`, {
            type,
            mobile,
            password
        });
    },
    //重置密码：提交验证码
    submitNewPwd(type, mobile, password) {
        return axiosPost(`index/forgetPassword`, {
            type,
            mobile,
            password
        });
    },
    /****************学员接口******************/
    //发送验证码
    sendCode(mobile, password, type = 0) {
        return axiosPost(`sms/getRegisterCode`, {
            type,
            mobile,
            password
        });
    },
    //注册
    register(mobile, password) {
        return axiosPost(`index/register`, {
            mobile,
            password
        });
    },
    //登录
    login(type, mobile, password) {
        return axiosPost(`index/login`, {
            type,
            mobile,
            password
        });
    },
    //选择教练:教练列表
    getTrainerList(params) {
        return axiosPost(`index/coachMembers`, params);
    },
    //获取教练详情
    getTrainerDetail(id) {
        return axiosGet(`index/coachMemberDetail?id=${id}`);
    },
    //提交预约
    orderTrainer(stuId, coachId) {
        return axiosGet(`index/createOrder?student_id=${stuId}&coach_id=${coachId}`);
    },
    //获取个人中心的信息
    getPersonInfo(id, type = 0) {
        return axiosGet(`index/userInfo?id=${id}&type=${type}`);
    },
    //获取订单详情
    getOrderDetail(id) {
        return axiosGet(`index/orderDetail?id=${id}`);
    },
    //修改科目的状态
    modifyStatus(id, name, value) {
        return axiosGet(`index/orderFieldBtn?id=${id}&field_name=${name}&field_value=${value}`);
    },
    //评分
    evaluate(stuId, coachId, num) {
        return axiosGet(`index/addEvaluation?student_id=${stuId}&coach_id=${coachId}&number=${num}`);
    },
    //评价教练（文字）
    commentCoach(stuId, orderId, content) {
        return axiosGet(`index/addEvaluate?student_id=${stuId}&order_id=${orderId}&content=${content}`);
    },
    //添加学习记录
    addRecords(recordInfo) {
        return axiosPost(`index/createStudyRecord`, recordInfo);
    },
    //关于我们
    aboutUsInfo(type = 0) {
        return axiosGet(`index/IndexArticle?type=${type}`);
    },
    /****************教练接口******************/
    //教练登录
    trainerLogin(type, mobile, password) {
        return axiosPost(`index/login`, {
            type,
            mobile,
            password
        });
    },
    //学员列表
    getStuList(id) {
        return axiosGet(`index/getStudentList?id=${id}`);
    },
    //请求学员详情
    getStuDetail(coachId, stuId) {
        return axiosGet(`index/getStudentDetail?student_id=${stuId}&coach_id=${coachId}`);
    },
    //获取学员学习记录
    getLearnRecords(stuId) {
        return axiosGet(`index/getStudyRecord?id=${stuId}`);
    },
    //获取学员评价列表
    getStudentComment(coachId) {
        return axiosGet(`index/getEvaluate?coach_id=${coachId}`);
    },
    //教练点击签约
    signContract(coachId, stuId) {
        return axiosGet(`index/createSignContract?student_id=${stuId}&coach_id=${coachId}`);
    },
    //个人中心
    getTrainerInfo(id, type = 1) {
        return axiosGet(`index/userInfo?id=${id}&type=${type}`);
    },
    //保存个人信息
    saveTrainerInfo(trainerInfo) {
        return axiosPost(`index/updateUserInfo`, trainerInfo);
    },
    // 驾考题库首页数据
    getDrivingMain(id,type) {
        return axiosGet(`driving/main?user_id=${id}&type=${type}`);
    }


}
