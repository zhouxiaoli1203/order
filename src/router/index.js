import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login', // 默认
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登录'
            },
            component: () =>import('../views/login.vue'),
        },
    ]
})
