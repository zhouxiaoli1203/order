
/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import qs from 'qs';
import {Message} from 'element-ui';
import Vue from 'vue';
let url = window.location.href
let isApp, isWechat, yhcmessage;
// 错误拦截并上报，但是ajax请求promise异步异常无法捕获
// Vue.config.errorHandler = function(err, vm, info) {
//     console.error(err)

//     let stack = err.stack;
//     if (stack && stack.length > 500) {
//         stack = stack.substr(0, 500);
//     }
//     let jsLog = {
//         stack: stack,
//         url: window.location.href
//     };
//     jsLog.userAgent = navigator.userAgent;

//     yhcReq("post", "api/oa/commitJsException", jsLog);
// };

// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = 'https://api.yihuichuang.com/';
//     // isApp = /app.html/.test(url)
//     // isWechat = /weChat.html/.test(url)
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = 'https://api.yihuichuang.com/';
// } else if (process.env.NODE_ENV == 'testing') {
//     // isApp = /show_app/.test(url)
//     // isWechat = /show_h5/.test(url)
//     axios.defaults.baseURL = 'https://api.yihuichuang.com/';
// }

let token_invalid = false;
// yhcmessage = isApp || isWechat ? Toast : "错误";
yhcmessage = Message.error;
// 请求超时时间
axios.defaults.timeout = 15000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // config.headers.token = localStorage.getItem('token');
        // config.yhc_f_a = config[config.method == 'post' ? 'data' : 'params'].yhc_f_a;
        // delete config[config.method == 'post' ? 'data' : 'params'].yhc_f_a;
        if(localStorage.getItem('token')){
            config.headers.Authorization = "Bearer"+" "+localStorage.getItem('token');
        }
        if (config.method == 'post') {
            config.data =JSON.stringify(config.data);
        }
        return config;
    },
    error => {
        return Promise.error(error);
    });

// // 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code == 200) {
            token_invalid = false;
            return Promise.resolve(response);
        } else {
            yhcmessage(response.data.msg);
            //token失效的状态码
            if (response.data.code == '401') {
                if (!token_invalid) {
                    localStorage.removeItem('token');
                //    window.location.href="/login"
                }
                token_invalid = true;
            }
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        let tip = '';
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 400:
                    tip = '数据填写有误，请检查后重新填写';
                    break;
                default:
                    tip = '发生了未知错误，请联系客服人员帮助您解决'
            }
        } else {
            if (error.code == 'ECONNABORTED' && error.msg.indexOf('timeout') != -1) {
                tip = '请求超时，请稍后再试';
            } else {
                tip = '网络异常，请检查网络后再试！';
            }
        }
        yhcmessage(tip);
        return Promise.reject({
            data: { status: error.response && error.response.status || '500', msg: tip || '发生了未知错误，请联系客服人员帮助您解决' }
        });
    }
);
/**
 * 请求
 */
export function yhcReq(methods, url, params,yhc_f_a) {/*  */
    /*
    yhc_f_a分为两种：
    1.特殊状态码 类型为string 例如'205,206';
    2.是否需要catch 类型为boolean;
    */
    // 需要同时处理特殊code和catch错误时，yhc_f_a和needCatch都传
    return new Promise((resolve, reject) => {
        // params.yhc_f_a = typeof yhc_f_a === 'string' ? yhc_f_a : '';
        const r = methods == 'post' ? axios.post(url,params) : axios.get(url, { params: params });
        r.then(res => {
            resolve(res.data);
        }).catch(err => {
            
            console.log(`%c【Status Code:${err.data.status}, Message:${err.data.msg}${err.config&&err.config.url?', Request URL:'+err.config.url:''}】`, 'color: #ee0a24;font-size: 12px;font-weight: 400;');
            //业务代码需要catch 主要避免Uncaught (in promise)的错误报错
            // (needCatch || (typeof yhc_f_a === 'boolean' && yhc_f_a)) && reject(err);
        })
    });
}

// export const baseUrl = window.location.protocol + '//' + window.location.host
export const baseUrl = 'http://ga.timan.vip:8090/cms'