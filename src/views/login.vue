<template>
  <div class='loginPage'>
      <div class="login-pop">
          <div class="juxing">兀兔印刷接单系统</div>
              <div class="form-title">账号登录</div>
          <el-form >
              <el-form-item class="yhc-item mb40">
                <el-input v-model="form.account" placeholder="账号" ></el-input>
              </el-form-item>
              <el-form-item class="yhc-item">
                <el-input v-model="form.pwd" placeholder="密码" show-password ></el-input>
              </el-form-item>
              <el-button  type="primary" class="width100" @click="submit">登录</el-button>
          </el-form>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'loginPage',
  data(){
    return {
        form:{
            account:"",
            pwd:""
        }
    }
  },
  components: {},
  created(){
      localStorage.removeItem("token");
  },
  mounted(){},
  methods: {
      submit(){
          if(!this.form.account || !this.form.pwd){
              return this.$message.error("请输入正确账号和密码");
          }
          let data={
               "password": this.form.pwd,
                "username": this.form.account,
          }
          axios.post(this.baseUrl+"/login",data).then((res)=>{
             if(res.data.code == 200){
                  localStorage.setItem("token", res.data.token);
                // this.$store.state.token = res.data.token;
                     this.$router.push({  //核心语句
                        path:'/index/prod',   //跳转的路径
                        query:{}
                    })
                    
              }
          });
        //   this.$post("post",this.baseUrl+"/login",data,"uneedAuthor").then((res)=>{
              
        //   });
       
      }
  }
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
        padding: 52px 60px;
        .juxing{
            position: absolute;
            top:-28px;
            left: 140px;
            width: 180px;
            height: 57px;
            background: url(../assets/img/juxing.png) no-repeat center center;
            font-size: 16px;
            font-weight: 500;
            line-height: 57px;
            text-align: center;
            color: #fff;

        }
        .form-title{
            font-size: 24px;
            font-weight: 500;
            color: #333333;
            line-height: 33px;
            margin-bottom: 32px;
        }
    }
}
</style>
