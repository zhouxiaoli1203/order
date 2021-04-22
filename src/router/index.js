import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
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
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '接单系统'
        },
        component: () =>import('../views/index.vue'),
        children:[{
                path: 'prod',
                name: 'prod',
                component: () =>import('../views/home/prod.vue'),
            },
            {
                path: 'order',
                name: 'order',
                component: () =>import('../views/home/order.vue'),
            }
        ]
    },
];
const router = new Router({routes});
router.beforeEach((to, from, next) => {
    if (to.query.token) {
        localStorage.setItem("token", to.query.token);
    }
    next();
});
export default router
