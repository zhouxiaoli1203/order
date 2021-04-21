<template>
  <div class='loginPage'>
      <div class="login-pop">
          <div class="juxing"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'loginPage',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style lang='less' scoped>
.loginPage{
    width: 100%;
    height: 100%;
    background-image: url("../assets/img/bg.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    .login-pop{
        width: 460px;
        height: 394px;
        background: #FFFFFF;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -197px 0 0 -230px;
        .juxing{
            position: absolute;
            top:-28px;
            left: 140px;
            width: 180px;
            height: 57px;
            background: url(../assets/img/juxing.png) no-repeat center center;
        }
    }
}
</style>
