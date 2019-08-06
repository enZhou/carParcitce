import Vue from 'vue'
import Router from 'vue-router'

// 按需（懒）加载（vue实现）
/*************公共页面***************/
//登录
const login = () => import('../views/login');
//重置密码
const resetPwd = () => import('../views/resetPwd');
/*************学员模块***************/
//学员注册
const regStu = () => import('../views/student/regStu')
//选择教练
const chooseTrainer = () => import('../views/student/chooseTrainer')
//教练详情
const trainerDetail = () => import('../views/student/trainerDetail');
//个人中心
const ownCenter = () => import('../views/student/ownCenter');
//我的订单
const myOrder = () => import('../views/student/myOrder');
//关于我们
const aboutUs = () => import('../views/student/aboutUs');
const aboutUs1 = () => import('../views/student/aboutUs1');
/*************教练模块***************/
//登录
const trainerLogin = () => import('../views/trainer/trainerLogin');
//我的学员
const myStu = () => import('../views/trainer/myStudent.vue');
//教练个人中心
const trainerCenter = () => import('../views/trainer/trainerCenter.vue');
// 学员详情
const stuDetail = () => import('../views/trainer/stuDetail.vue');


Vue.use(Router)

let base = `${process.env.BASE_URL}` // 动态获取二级目录

const router = new Router({
    base: base,
    routes: [{
            path: '/',
            component: chooseTrainer
        }, {
            path: '/login',
            component: login
        },
        {
            path: '/trainerLogin',
            component: trainerLogin
        }, {
            path: '/resetPwd',
            component: resetPwd
        }, {
            path: '/regStu',
            component: regStu
        },{
            path: '/chooseTrainer',
            component: chooseTrainer
        }, {
            path: '/trainerDetail',
            component: trainerDetail
        },
        {
            path: '/ownCenter',
            component: ownCenter
        },
        {
            path: '/myOrder',
            component: myOrder
        },
        {
            path: '/aboutUs',
            component: aboutUs
        }, {
            path: '/aboutUs1',
            component: aboutUs1
        },{
            path: '/myStu',
            component: myStu
        },
        {
            path: '/trainerCenter',
            component: trainerCenter
        },
        {
            path: '/stuDetail',
            component: stuDetail
        },
        // 驾考题库
        {
            path: '/questionBank',
            name: 'questionBank',
            component: () => import('../views/questionBank/questionBank.vue'),
        },
        // 我的错题
        {
            path: '/errorQuestion',
            name: 'errorQuestion',
            component: () => import('../views/questionBank/errorQuestion.vue'),
        },
        // 模拟考试
        {
            path: '/mockExam',
            name: 'mockExam',
            component: () => import('../views/questionBank/mockExam.vue'),
        },
        // 模拟考试-成绩
        {
            path: '/examScores',
            name: 'examScores',
            component: () => import('../views/questionBank/examScores.vue'),
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
});

router.beforeEach((to, from, next) => {
    // 做些什么，通常权限控制就在这里做哦

    // 必须写next()哦，不然你的页面就会白白的，而且不报错，俗称"代码下毒"
    next();
});

export default router;
