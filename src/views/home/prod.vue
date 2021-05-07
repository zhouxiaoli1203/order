<template>
  <div class='prod-page'>
    <div class="search-head">
      <div class="fl drops">
        <!-- <el-select class="yhc-select"
                   v-model="isStatus"
                   placeholder="订单状态"
                   clearable
                   @change="changeSearch(1)">
          <el-option v-for="x in cost.prodStatus"
                     :key="x.value"
                     :label="x.name"
                     :value="x.value">
          </el-option>
        </el-select> -->
        <el-select class="yhc-select"
                   v-model="isType"
                   placeholder="订单类型"
                   clearable
                   @change="changeSearch(2)">
          <el-option v-for="x in cost.orderType"
                     :key="x.value"
                     :label="x.name"
                     :value="x.value">
          </el-option>
        </el-select>
        <el-select class="yhc-select"
                   v-model="isTime"
                   placeholder="时间选择"
                   clearable
                   @change="changeSearch(3)"
                   :disabled="!dropVisiable">
          <el-option v-for="x in cost.orderStatus"
                     :key="x.value"
                     :label="x.name"
                     :value="x.value">
          </el-option>
        </el-select>
        <div class="yhc-item yhc-date"
             style="width:226px">

          <el-date-picker v-model="isDate"
                          type="daterange"
                          @change="changeDate"
                          :default-time="['00:00:00', '23:59:59']"
                          range-separator="至"
                          start-placeholder="开始日期"
                          :disabled="timeDisabled"
                          end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="fr displayFl right-btns">
        <div class="search-input yhc-item">
          <el-input placeholder="订单号/客户姓名/联系方式"
                    class="input-with-select"
                    v-model="searchValue"
                    @keyup.enter.native="searchData">
            <el-button slot="append"
                       @click="searchData">搜索</el-button>
          </el-input>
        </div>
        <div class="btn bgWhite export"
             @click="openExport">导出</div>
      </div>
    </div>
    <div class="table-content">
      <div v-if="orderList.length>0">
        <ul class="list-items">
          <li class="list-card"
              v-for="x in orderList"
              @click="goDetail(x)">
            <div class="list-card-head">
              <span class="font-style">创建：{{x.createTime}}</span>
              <span class="status-font btn-blue_">{{x.status=='0'?"待生产":""}}</span>
            </div>

            <div class="part-line"></div>
            <div class="list-card-title">
              <h3 :title="x.orderAttr.title">{{x.orderAttr.title}}</h3>
            </div>
            <!-- <div class="content">
                <p><img src="@/assets/img/fahuo.png" alt="" style="margin-right:8px;"><span style="color:#3551DF;">{{x.deliveryTime}}</span></p>
            </div> -->
            <div class="footer">
              <span class="fl status-card"
                    :class='{"blue":(x.orderAttr.goodsName=="打印"||x.orderAttr.goodsName=="通用"),"red":x.orderAttr.goodsName=="条幅","yellow":x.orderAttr.goodsName=="旗帜"}'>{{x.orderAttr.goodsName}}</span>
              <span class="fl rules">{{(x.orderSkus[0].attributes.width/1000)}}*{{(x.orderSkus[0].attributes.height/1000)}}m</span>
              <span class="fl rules">{{x.orderSkus[0].attributes.fontColor}}</span>
              <span class="fr prods" v-if="x.orderSkus.length>1">
                <i class="prods-mark">{{x.orderSkus.length}}</i>
              </span>
            </div>
          </li>
        </ul>
        <el-pagination class="yhc-pagination"
                       background
                       layout="prev, pager, next"
                       :page-size="10"
                       :current-page="current"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="total">
        </el-pagination>

      </div>
      <div class="noCont"
           v-else
           v-cloak>
        <img :src="noOrder"
             alt="">
        <p>暂无订单</p>
      </div>
    </div>
    <el-dialog class="yhc-dialog"
               title="导出"
               :visible.sync="exportVisible"
               width="432px">
      <div class="yhc-item yhc-date">

        <el-date-picker v-model="exportDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="exportVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="exportVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <audio class="notice-audio"
           controls="controls"
           ref="audio"
           style="display:none"
           @ended="audioEnd">
      <source type="audio/ogg"
              :src="resData.questionAudio">
    </audio>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      timer: null,
      showNotice: false,
      isStatus: undefined,
      isType: undefined,
      isTime: undefined,
      isDate: '',
      searchValue: undefined,
      current: 1,
      total: 0,
      totalChange: '',
      orderList: [],
      dropVisiable: true,
      timeDisabled: false,
      exportVisible: false,
      exportDate: '',
      form: { desc: '' },
      noOrder: require('../../assets/img/noOrder.png'),
      resData: {
        questionAudio: 'https://api.gundongyongheng.com/clock.mp3', // 音频
      },
      oldParams: {},
    }
  },
  components: {},
  created() {
    let xinxi = this.$store.getters.getOrderInfo
    if (xinxi) {
      this.isType = xinxi.isType
      this.isTime = xinxi.isTime
      this.isDate = xinxi.isDate
      this.searchValue = xinxi.searchValue
      this.current = xinxi.current
      this.dropVisiable = xinxi.dropVisiable
      this.timeDisabled = xinxi.timeDisabled

      this.getList(xinxi)
    } else {
      this.getList()
    }
    this.getChange()
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getChange()
    }, 5000)
  },
  methods: {
    handlePlayAudio() {
      this.$refs.audio.play() // 这里使用了audio的原生开始播放事件,同样不加on, 并使用ref获取dom
    },
    audioEnd() {
      this.showNotice = false
    },
    getChange() {
      this.$post('post', '/operating/pageOrders', {
        pageNum: 1,
        pageSize: 10,
      }).then((res) => {
        if (res.code == 200) {
          this.totalChange = res.data.total
        }
      })
    },
    changeSearch(n) {
      if (n == 3) {
        if (this.isTime) {
          this.isDate = ''
          this.timeDisabled = true
        } else {
          this.timeDisabled = false
        }
      }
      this.current = 1
      this.getList()
    },
    changeDate() {
      if (this.isDate) {
        this.dropVisiable = false
        this.isTime = undefined
      } else {
        this.dropVisiable = true
      }
      this.current = 1
      this.getList()
    },
    searchData() {
      this.getList()
    },
    getList(p_) {
      let this_ = p_ ? p_ : this
      let params = {
        pageNum: this_.current || 1,
        pageSize: 10,
        skuId: this_.isType,
        // status: this_.isStatus,
        keyword: this_.searchValue,
      }
      if (this_.dropVisiable && this_.isTime) {
        params['timeType'] = this_.isTime
      }
      if (
        this_.isDate &&
        this.formatDateYMDhms(this_.isDate[0]) &&
        this.formatDateYMDhms(this_.isDate[1])
      ) {
        params['startDate'] = this.formatDateYMDhms(this_.isDate[0])
        params['endDate'] = this.formatDateYMDhms(this_.isDate[1])
      }

      console.log(params)
      for (let i in params) {
        if (params[i] == '' || params[i] == undefined) {
          delete params[i]
        }
      }
      this.$post('post', '/operating/pageOrders', params).then((res) => {
        if (res.code == 200) {
          this.orderList = res.data.rows
          // this_.current = res.data.num
          this.total = res.data.total
        }
      })
    },
    handleSizeChange(val) {
      this.size = val
      // 当pageSize发生变化后需重新查询列表
      this.getList()
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.current = val
      let {
        current,
        isType,
        isTime,
        isDate,
        dropVisiable,
        searchValue,
        timeDisabled,
      } = this
      // 当currentPage发生变化后需重新查询列表
      this.$store.commit('setOrderInfo', {
        current,
        isType,
        isTime,
        isDate,
        dropVisiable,
        searchValue,
        timeDisabled,
        timeDisabled,
      })
      this.getList()
    },
    openExport() {
      //   let this_ = this
      //   this_.exportVisible = true
      //   this_.exportDate = ''
      this.$message({
        message: '该功能正在开发，敬请期待哦！',
        type: 'warning',
      })
    },
    goDetail(x) {
      let {
        current,
        isType,
        isTime,
        isDate,
        dropVisiable,
        searchValue,
        timeDisabled,
      } = this
      this.$store.commit('setOrderInfo', {
        current,
        isType,
        isTime,
        isDate,
        dropVisiable,
        searchValue,
        timeDisabled,
      })
      this.$router.push({
        //核心语句
        path: '/index/prod/detail', //跳转的路径
        query: {
          from: 'prod',
          id: x.id,
          //路由传参时push和query搭配使用 ，作用时传递参数
        },
      })
    },
  },
  watch: {
    totalChange: {
      handler: function (val, oldval) {
        console.log(oldval)
        if (oldval !== '' && val != oldval) {
          this.showNotice = true
        }

        // console.log('修改后',val,'修改前',oldval);
      },
    },
    showNotice: {
      handler: function (val, old) {
        if (val) {
          this.handlePlayAudio()
        }
      },
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
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
    border: 1px;
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
    width: 360px;
    // height: 210px;
    background: #ffffff;
    border-radius: 10px;
    padding: 16px 12px;
    box-shadow: 2px 3px 20px #ccc;
    margin: 0 16px 20px 0;
    cursor: pointer;
    .list-card-head {
      display: flex;
      justify-content: space-between;
      .font-style {
        font-size: 14px;
        color: #333;
      }
    }
    .list-card-title {
      margin-bottom: 16px;
      h3 {
        font-size: 16px;
        font-weight: 500;
        color: #333;
        white-space: normal;
        width: 100%;
        height: 42px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    .status-font {
      padding: 2px 8px;
      border-radius: 4px;
      color: #fff;
      height: 24px;
      line-height: 20px;
      text-align: center;
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
      //   overflow: hidden;
      span.rules {
        padding: 4px 8px;
        line-height: 20px;
        background-color: rgba(53, 81, 223, 0.04);
        color: #3551df;
        text-align: center;
        border-radius: 4px;
        margin-left: 16px;
      }
      span.prods {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        position: relative;
        background: url('../../assets/img/buy_icon.png') no-repeat center center;
        i.prods-mark {
          position: absolute;
          top: -10px;
          right: -5px;
          display: inline-block;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ff3333;
          color: #fff;
          text-align: center;
          line-height: 16px;
          font-size: 12px;
          font-style: normal;
        }
      }
    }
  }
  .yixiadan {
    color: #35a3df;
  }
  .yipohui {
    color: #ff8f1c;
  }
  .status {
    width: 64px;
    height: 25px;
    line-height: 25px;
    border-radius: 4px;
    text-align: center;
    &.blue {
      color: #3a65ff;
      background-color: rgba(58, 101, 255, 0.09);
    }
    &.red {
      color: #ff3333;
      background-color: rgba(255, 51, 51, 0.09);
    }
  }
}
</style>
