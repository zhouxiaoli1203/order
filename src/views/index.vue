<template>
  <div class='index-page'>
    <div class="left-nav">
        <div class="title">兀兔印刷接单系统</div>
        <ul class="menu">
            <li v-for="(x,index) in menus" :class='[{"active":x.id == currentInd},`icon_${x.value}`]' @click="changeMenu(x.id)">
                {{x.name}}
            </li>
        </ul>
    </div>
    <div class="head-nav"></div>
    <div class="right-content">
        <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
        currentInd:1,
        menus:[
            {name:"生产大厅",id:"1",value:"ting"},
            {name:"订单管理",id:"2",value:"order"},
            ],
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
      changeMenu(ind){
this.currentInd = ind;
      }
  },
}
</script>
<style lang='less' scoped>
.index-page {
  width: 100%;
  height: 100%;
  background: #f5f6fa;
  min-width: 1440px;
  overflow: auto;
  .left-nav {
    width: 200px;
    height: 100%;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    .title{
        padding: 18px 16px;
        font-size: 20px;
        color: #3551DF;
        font-weight: 500;
        margin-bottom: 26px;
    }
    .menu{
        display: flex;
        flex-direction: column;
        >li{
            width: 100%;
            height: 68px;
            line-height: 68px;
            color:#333;
            font-size: 14px;
            position: relative;
            padding-left:85px;
            &::before{
                position: absolute;
                top: 25px;
                left: 50px;
                width: 16px;
                height: 16px;
                content:"";
            }
            &.icon_ting::before{
                background:url("../assets/img/icon_ting_.png") no-repeat center center;
            }
            &.icon_order::before{
                background:url("../assets/img/icon_order.png") no-repeat center center;
            }
            &:hover,&.active{
                background-color:#3551DF;
                color:#fff;
                    &.icon_ting::before{
                        background:url("../assets/img/icon_ting.png") no-repeat center center;
                    }
                    &.icon_order::before{
                        background:url("../assets/img/icon_order_.png") no-repeat center center;
                    }
            }

        }
        
    }
  }
  .head-nav {
    width: calc(100% - 200px);
    height: 64px;
    padding: 22px 24px 22px 0;
    background: #fff;
    position: fixed;
    top: 0;
    right: 0;
  }
  .right-content {
    width: calc(100% - 200px);
    height: 100%;
    margin-left: 200px;
    margin-top: 64px;
    padding: 18px 24px 24px 24px;
  }
}
</style>
