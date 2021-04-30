// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/store'
import { yhcReq,baseUrl,loadURL } from './utils/http'
import constant from './utils/constant'
import './utils/directive' //阻止按钮同一时间内多次触发
//全局公用函数
import Fns from './utils/common'
Object.keys(Fns).forEach(key => {
    Vue.prototype[key] = Fns[key]
})
//全局的filter
import filters from './utils/filters'
filters(Vue);
// 样式
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.css'
import './assets/css/common.css'
import './assets/css/commonStyle.less'

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$post = yhcReq;
// Vue.prototype.baseUrl = baseUrl;
Vue.prototype.loadURL = loadURL;
Vue.prototype.cost = constant;
/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
