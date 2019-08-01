import axios from 'axios'
import qs from 'qs'
import router from '../router'
import Vue from 'vue'
import Toast from '../components/toast/index'
Vue.use(Toast);



axios.defaults.timeout = 10000;
//环境配置
if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://www.jiaoliantong.online/demo/';
} else {
    axios.defaults.baseURL = 'http://www.jiaoliantong.online/demo/';
}

//http request拦截器
axios.interceptors.request.use(config => {
    // let user = JSON.parse(localStorage.getItem('user'));
    config.headers = {
        'Content-Type': 'application/json',
    };
    // if (user) {
    //     config.headers.token = user.token;
    // }
    return config;
}, err => {
    console.log("网络异常");
    return Promise.reject(err);
})

//http response拦截器
axios.interceptors.response.use(res => {
    if(res.data.code!=1){//异常情况
        Vue.prototype.$toast(res.data.msg,true);
        return 'err';
    }else{//成功结果
        return res.data.data;
    }
}, err => {
    return Promise.reject(err);
})


function axiosGet(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function axiosPost(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, {
                ...data
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}
export {
    axiosGet,
    axiosPost
}
