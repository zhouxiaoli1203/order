<template>
  <div class='index-page'>
    <div class="left-nav">
      <div class="title">兀兔印刷接单系统</div>
      <ul class="menu">
        <li v-for="(x,index) in menus"
            class="cursor_p"
            :class='[{"active":x.id == currentInd},`icon_${x.value}`]'
            @click="changeMenu(x)">
          {{x.name}}
        </li>
      </ul>
    </div>
    <div class="head-nav">
      <div class="headLeft">
        <span class="down cursor_p">条幅设计器下载</span>
        <div class="img cursor_p"
             v-clickoutside="handleClose">
          <img :src="headOrder"
               alt=""
               @click="checkpop = !checkpop">
          <div class="logs-pop"
               v-show="checkpop">
            <div class="head"><span>操作日志</span><span>X</span></div>
            <div class="log-div">
              <ul>
                <li v-for="x in 10">
                  <p class="log-date">2021-12-30</p>
                  <p class="log-info">的，积分哈萨克东方红 </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="img cursor_p"
             @click="msgVisible = true">
          <img :src="headNoctice"
               alt="">
          <span class="mark">40</span>

        </div>
        <div class="info">
          <p @click="passwordPorp = true">奋斗的阿花 &nbsp/</p>
          <span class="cursor_p"
                @click="signOut">&nbsp退出</span>
        </div>
      </div>
    </div>
    <div class="right-content main">
      <router-view />
    </div>
    <!-- 修改密码弹出层 -->
    <section class="publicPorp passwordPorp"
             v-show="passwordPorp">
      <h2 v-show="unEdit">修改密码</h2>
      <div class="eidt-complete t_a_c"
           v-show="!unEdit">
        <img src="@/assets/img/duigou.png"
             alt=""
             width="44px"
             height="44px">
        <div style="margin-top:16px;">修改完成</div>
      </div>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               class="demo-ruleForm"
               :hide-required-asterisk="true"
               v-show="unEdit">
        <el-form-item label="原密码"
                      prop="oldPassword"
                      class="yhc-item">
          <el-input v-model="ruleForm.oldPassword"
                    placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码"
                      prop="newPassword"
                      class="yhc-item">
          <el-input v-model="ruleForm.newPassword"
                    placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="editBtn width100"
                     type="primary"
                     @click.passive="submitForm('ruleForm')"
                     v-button>修改</el-button>
        </el-form-item>
      </el-form>
    </section>
    <div class="mask"
         @click="LognClose"
         v-show="passwordPorp"></div>

    <el-dialog class="yhc-dialog"
               title="系统消息"
               :visible.sync="msgVisible"
               width="936px">
      <div class="yhc-item">
        <ul class="mes-ul">
          <li v-for="x in 10">
            <p class="date">2021-12-13</p>
            <p class="info">您有一有退单信息，请立即查看</p>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      currentInd: "/prod",
      headOrder: require('../assets/img/headOrder.png'),
      headNoctice: require('../assets/img/headNoctice.png'),
      ruleForm: {
        newPassword: '',
        oldPassword: '',
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
      },
      passwordPorp: false,
      msgVisible: false,
      checkpop: false,
      unEdit: true,
      menus: [
        { name: '生产大厅', id: '/prod', value: 'ting', path: '/index/prod' },
        { name: '订单管理', id: '/order', value: 'order', path: '/index/order' },
      ],
    }
  },
  components: {},
  created() {
      this.getPath ();
    // let token = this.$store.state.token
    // localStorage.setItem('token', token)
  },
  mounted() {},
  methods: {
    changeMenu(x) {
      this.currentInd = x.id;
      this.$store.state.currentIndex = x.id;
      this.$router.push({
        //核心语句
        path: x.path, //跳转的路径
        query: {
          //路由传参时push和query搭配使用 ，作用时传递参数
        },
      }).catch(err => {
  // 重复点击相同的url
})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            newPassword: this.ruleForm.newPassword,
            oldPassword: this.ruleForm.oldPassword,
          }
          this.$post(
            'post',
            this.baseUrl + '/system/user/profile/updatePwd',
            data
          ).then((res) => {
            if (res.code == 200) {
              this.unEdit = false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 关闭登录注册弹框
    LognClose() {
      this.passwordPorp = false
    },
    signOut() {
      localStorage.removeItem('token')
      this.$router.push({
        //核心语句
        path: '/', //跳转的路径
        query: {
          //路由传参时push和query搭配使用 ，作用时传递参数
        },
      })
    },
    handleClose() {
      this.checkpop = false
    },
    getPath () {  //解决浏览器后退导航高亮问题
      let href = this.$route.path
      let hrefUrl =  href.split('/')[2]
      this.currentInd = '/'+ hrefUrl
      this.$store.state.currentIndex = '/'+ hrefUrl
    },
  },
  watch: {
    '$route': 'getPath'  //监听浏览器后退导航高亮问题
  }
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
    .title {
      padding: 18px 16px;
      font-size: 20px;
      color: #3551df;
      font-weight: 500;
      margin-bottom: 26px;
    }
    .menu {
      display: flex;
      flex-direction: column;
      > li {
        width: 100%;
        height: 68px;
        line-height: 68px;
        color: #333;
        font-size: 14px;
        position: relative;
        padding-left: 85px;
        &::before {
          position: absolute;
          top: 25px;
          left: 50px;
          width: 16px;
          height: 16px;
          content: '';
        }
        &.icon_ting::before {
          background: url('../assets/img/icon_ting_.png') no-repeat center
            center;
        }
        &.icon_order::before {
          background: url('../assets/img/icon_order.png') no-repeat center
            center;
        }
        &:hover,
        &.active {
          background-color: #3551df;
          color: #fff;
          &.icon_ting::before {
            background: url('../assets/img/icon_ting.png') no-repeat center
              center;
          }
          &.icon_order::before {
            background: url('../assets/img/icon_order_.png') no-repeat center
              center;
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
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 100;

    .downNum {
      width: 191px;
      height: 32px;
      background: #fff3f3;
      border-radius: 8px;
      text-align: center;
      line-height: 32px;
      color: #ff4545;
    }

    .headLeft {
      display: flex;
      align-items: center;

      .down {
        width: 146px;
        height: 32px;
        background: #3551df;
        border-radius: 8px;
        text-align: center;
        line-height: 32px;
        color: #fff;
        margin-right: 56px;
      }

      .img {
        width: 32px;
        height: 32px;
        position: relative;
        margin-left: 24px;

        > img {
          width: 100%;
          height: 100%;
        }

        span.mark {
          position: absolute;
          width: 23px;
          height: 23px;
          background: #ff3333;
          border-radius: 50%;
          text-align: center;
          line-height: 23px;
          font-size: 12px;
          color: #fff;
          top: -7px;
          right: -5px;
        }
      }

      .info {
        display: flex;
        align-items: center;
        margin-left: 40px;
        p {
          color: #333;
          cursor: pointer;
        }
        span {
          color: #999;
        }
        span:hover {
          color: #ff3333;
        }
      }
    }
  }
  .right-content {
    width: calc(100% - 200px);
    height: 100%;
    margin-left: 200px;
    margin-top: 64px;
    padding: 18px 24px 24px 24px;
  }
  .passwordPorp {
    padding: 24px 33px;
    background: #fff;
    min-width: 242px;
    max-width: 460px;
    max-height: 420px;
    .demo-ruleForm {
      width: 394px;
    }
    h2 {
      font-size: 24px;
      color: #333;
      margin-bottom: 24px;
    }
    .editBtn {
      margin-top: 52px;
    }
  }
}
.mes-ul {
  display: flex;
  flex-direction: column;
  > li {
    &:hover {
      background-color: #f9f7f7;
    }
    text-align: left;
    cursor: pointer;
    padding: 10px 0 10px 10px;
    border-top: 1px solid #999;
    &:first-child {
      border-top: 0;
    }
    p.date {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }
    p.info {
      font-size: 16px;
      color: #333;
      font-weight: 500;
    }
  }
}
.logs-pop {
  width: 318px;
  // height: 410px;
  background: #fff;
  padding: 20px 12px;
  position: absolute;
  top: 32px;
  right: -150px;
  box-shadow: 0 0 40px 0 #ddd;
  .head {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    .close{
        width: 25px;
    text-align: center;
    cursor: pointer;
    }
  }
  .log-div {
    height: 370px;
    overflow: hidden;
    > ul {
      width: 296px;
      height: 370px;
      overflow: auto;
    }
    ul > li {
      padding: 10px 5px;
      &:hover {
        background: #f9f7f7;
      }
      .log-date{
          color:#999;
      }
    }
  }
}
</style>
