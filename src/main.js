// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/store'
import { yhcReq,baseUrl } from './utils/http'
import './assets/css/base.css'
import './assets/css/common.css'

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$post = yhcReq;
Vue.prototype.baseUrl = baseUrl;
/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
