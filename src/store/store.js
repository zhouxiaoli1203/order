import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    //所有的数据都放在state中
    state:{
      currentIndex:"/index",
      publicHome:'',
      menuLeft:'',
      wutu_token:'',
      userId:'',
      userInfo:'',
      expCompany:[],
      noticeAudio:false,
      orderInfo:''
    },

    //操作数据，唯一的通道是mutations/*配置全局函数*/
    mutations:{
      setUserInfo(state, info){ //储存用户信息
        state.userInfo = info
        localStorage.setItem('userInfo',JSON.stringify(info))
      },
      setToken(state, token) {
        state.token = token
        localStorage.setItem('token',token)
      },
      setUserId(state, userId) {
        state.userId = userId 
        localStorage.setItem('userId',userId) //同步存储token至localStorage
      },
      setOrderInfo(state, info){ 
          console.log(info,111);
        state.orderInfo = info
        localStorage.setItem('orderInfo_jd',JSON.stringify(info))
      },
    },
    getters : {
      //获取token方法
      //判断是否有token,如果没有重新赋值，返回给state的token
      getToken(state) { 
        if (!state.token) {
          let token = localStorage.getItem('token')
          state.token = token?token:''
        }
        return state.token
      },
      getOrderInfo(state){ 
        console.log(state+'51')
        if (!state.orderInfo) {
          let info = JSON.parse(localStorage.getItem('orderInfo_jd'))
          console.log(info)
          state.orderInfo = info?info:''
        }
        return state.orderInfo
      },
    },

    //actions,可以来做异步操作，然后提交给mutations，而后再对state(数据)进行操作
    actions:{}
})