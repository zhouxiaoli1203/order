<template>
  <div>
    <div class="navLeft">
        <h2>兀兔印刷订单系统</h2>
        <div class="navMenu">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            router
            >
            <el-menu-item index="/prod">
                <i class="el-icon-s-claim"></i>
                <span slot="title">订单提交</span>
            </el-menu-item>
            <el-menu-item index="/order">
                <i class="el-icon-s-order"></i>
                <span slot="title">我的订单</span>
            </el-menu-item>
          </el-menu>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navLeft',
  data () {
    return {
      activeIndex:'',
    }
  },
  created(){
    this.activeIndex = this.$store.state.currentIndex;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index) {
      this.activeIndex = index;
      this.$store.state.currentIndex = index; //导航高亮
    },
    getPath () {  //解决浏览器后退导航高亮问题
      let href = this.$route.path
      let hrefUrl =  href.split('/')[1]
      this.activeIndex = '/'+ hrefUrl
      this.$store.state.currentIndex = '/'+ hrefUrl
    },

  },
  watch: {
    '$route': 'getPath'  //监听浏览器后退导航高亮问题
  }
  

}
</script>


<style lang="less" scoped>
  .navLeft{
    width: 200px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: #fff;
    z-index: 100;
    h2{
        line-height: 64px;
        text-align: center;
        color: #3551DF;
        font-size: 20px;
    }
  }
  //侧边导航栏
.navLeft{
    .navMenu{
        padding-top: 24px;
    }
    .el-menu{
        border: none;
    }
    .el-menu-item.is-active{
        background: #3551DF;
    }

    .el-menu-item{
        height: 68px;
        line-height: 68px;
        text-align: center;
        padding-left: 0 !important;
    }
    .el-menu-item.is-active{
        color: #fff;
    }

    .el-menu-item [class^=el-icon-]{
        margin-right: 10px;
    }
}
</style>
