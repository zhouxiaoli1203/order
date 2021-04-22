<template>
  <div class='prod-page'>
    <div class="search-head">
      <div class="fl drops">
        <el-dropdown>
          <span class="el-dropdown-link">
            订单状态<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>已驳回</el-dropdown-item>
            <el-dropdown-item >已下单</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            订单状态<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="x in cost.orderType" :key="x.value">{{x.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            订单状态<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="x in cost.orderStatus" :key="x.value">{{x.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="fr displayFl right-btns">
        <div class="search-input yhc-item">
          <el-input placeholder="订单号/客户姓名/联系方式"
                    class="input-with-select">
            <el-button slot="append">搜索</el-button>
          </el-input>
        </div>
        <div class="btn bgWhite export">导出</div>
      </div>
    </div>
    <div class="table-content">
      <ul class="list-items">
        <li class="list-card" v-for="x in 12" @click="renling">
          <div class="head">
            <h3>zheshiyitiao...</h3>
            <span class="yixiadan">已下单</span>
          </div>
          <div class="content">
            <p>创建：2021-01-21 13:22</p>
            <p>发货：2021-01-21 13:22</p>
          </div>
          <div class="footer">
            <span class="fl status blue">打印资料</span>
            <span class="fr icon"><img src="@/assets/img/jiantou.png" alt=""></span>
          </div>
        </li>
      </ul>
      <el-pagination class="yhc-pagination"
                     background
                     layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  components: {},
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    getList() {
      this.$post('post', this.baseUrl + '/operating/listOrders').then((res) => {
        if (res.code == 200) {
          this.orderList = res.data
        }
      })
    },
    renling(){
        let this_ = this;
        this_.confirm_pop("确定认领该条订单","认领").then(()=>{

        });
    }
  },
}
</script>
<style lang='less' scoped>
.search-head {
  height: 32px;
  margin-bottom: 18px;
  .yhc-item .el-input {
    line-height: 29px;
  }
  /deep/.el-input-group__append {
    color: #fff;
    background: #3551df;
  }
  .export {
    height: 30px;
    line-height: 16px;
    margin-left: 40px;
    color: #3551df;
  }
}
.table-content {
  padding: 24px;
  background: #fff;
}
.list-items {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .list-card {
    width: 274px;
    height: 149px;
    background: #ffffff;
    border-radius: 10px;
    padding: 16px 12px;
    box-shadow: 2px 3px 20px #ccc;
    margin:0 16px 20px 0;
    cursor: pointer;
    .head {
      display: flex;
      justify-content: space-between;
      h3 {
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
    }
    .content {
      margin: 8px 0 24px;
      p {
        font-size: 12px;
        color: #abaebb;
      }
    }
    .footer {
      clear: both;
      overflow: hidden;
      .icon img{
          width: 25px;
          height:25px;
      }
    }
  }
  .yixiadan{
      color:#35A3DF;
  }
  .yipohui{
      color:#FF8F1C;
  }
  .status{
width: 64px;
    height: 25px;
    line-height: 25px;
    border-radius: 4px;
    text-align: center;
    &.blue{
        color:#3A65FF;
        background-color:rgba(58,101,255,0.09);
    }
    &.red{
        color:#FF3333;
        background-color:rgba(255,51,51,0.09);
    }
  }
}
</style>
