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
            <div class="head">
              <h3>{{x.orderAttr.title}}</h3>
              <span class="yixiadan">{{x.status==0?"待生产":"已驳回"}}</span>
            </div>
            <div class="content">
              <p>创建：{{x.createTime}}</p>
              <p>发货：{{x.deliveryTime}}</p>
            </div>
            <div class="footer">
              <span class="fl status"
                    :class='{"blue":x.orderAttr.goodsName=="打印","red":x.orderAttr.goodsName=="条幅"}'>{{x.orderAttr.goodsName}}</span>
              <span class="fr icon"><img src="@/assets/img/jiantou.png"
                     alt=""></span>
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
        timer:null,
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
        questionAudio:
          'https://api.gundongyongheng.com/clock.mp3', // 音频
      },
    }
  },
  components: {},
  created() {
    this.getList()
    this.getChange()
  },
  mounted() {
   this.timer =  setInterval(() => {
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
      this.$post('post', this.baseUrl + '/operating/pageOrders', {
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
      this.getList()
    },
    changeDate() {
      if (this.isDate) {
        this.dropVisiable = false
        this.isTime = undefined
      } else {
        this.dropVisiable = true
      }
      this.getList()
    },
    searchData() {
      this.getList()
    },
    getList() {
      let this_ = this
      let params = {
        pageNum: this_.current,
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
        this_.formatDateYMDhms(this_.isDate[0]) &&
        this_.formatDateYMDhms(this_.isDate[1])
      ) {
        params['startDate'] = this_.formatDateYMDhms(this_.isDate[0])
        params['endDate'] = this_.formatDateYMDhms(this_.isDate[1])
      }
      for (let i in params) {
        if (params[i] == '' || params[i] == undefined) {
          delete params[i]
        }
      }
      this_
        .$post('post', this_.baseUrl + '/operating/pageOrders', params)
        .then((res) => {
          if (res.code == 200) {
            this_.orderList = res.data.rows
            this_.current = res.data.num
            this_.total = res.data.total
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
      // 当currentPage发生变化后需重新查询列表
      this.getList()
    },
    openExport() {
      let this_ = this
      this_.exportVisible = true
      this_.exportDate = ''
    },
    goDetail(x) {
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
    clearInterval(this.timer);        
    this.timer = null;
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
    width: 274px;
    height: 149px;
    background: #ffffff;
    border-radius: 10px;
    padding: 16px 12px;
    box-shadow: 2px 3px 20px #ccc;
    margin: 0 16px 20px 0;
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
      .icon img {
        width: 25px;
        height: 25px;
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
