<template>
  <div class='detail-page'
       v-if="details">
    <div class="page-title"><span class="gray-font">{{fromParam.from=="order"?"订单管理":"生产大厅"}} / </span>{{details.orderAttr.title}}</div>
    <div class="detail-form order-info">
      <div class="form-head">订单信息</div>
      <div class="form-content">
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">订单标题</label>
            <span class="form-span">{{details.orderAttr.title}}</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">订单编号</label>
            <span class="form-span">{{details.orderCode}}</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">订单状态</label>
            <span class="form-span">{{details.status | yhc_status}}<i class="icon_warning fr"
                 v-if="details.status==1"></i></span>
          </div>

        </div>
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">订单来源</label>
            <span class="form-span">{{details.source | yhc_source}}</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">下单时间</label>
            <span class="form-span">{{details.createTime}}</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">订单类型</label>
            <span class="form-span">{{details.orderAttr.goodsName}}</span>
          </div>
        </div>
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">下单员</label>
            <span class="form-span">{{details.customerNickName}}</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">下单手机号</label>
            <span class="form-span">{{details.customerMobile}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-form prod-info"
         v-if="details.orderSkus">
      <div class="form-head">产品规格</div>
      <div class="form-content"
           v-for="y in details.orderSkus">
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">产品尺寸1</label>
            <span class="form-span">{{y.crafts.width}}*{{y.crafts.height}}mm</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">产品文件1</label>
            <span class="form-span"
                  style="width:145px;">{{y.crafts.productName}}</span>
            <span class="form-span-click">查看</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">产品数量</label>
            <span class="form-span">{{y.num}}</span>
          </div>

        </div>
        <div class="form-line clearfix">
          <div class="form-item width100">
            <label for="form-label">产品描述1</label>
            <span class="form-textarea">{{y.remark}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-form order-info">
      <div class="form-head">客户信息</div>
      <div class="form-content">
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">客户姓名</label>
            <span class="form-span">{{details.orderAttr.receiptName}}</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">配送方式</label>
            <span class="form-span">{{details.orderAttr.deliveryType | yhc_dlyType}}</span>
          </div>
          <div class="form-item">
            <label for="form-label">配送地址</label>
            <span class="form-span"
                  style="width:400px;"
                  v-if="details.orderAttr.deliveryType == 1 || details.orderAttr.deliveryType==2">{{details.orderAttr.receiptAddress}} {{details.orderAttr.receiptDetailAddress}}</span>
            <span class="form-span"
                  style="width:400px;"
                  v-if="details.orderAttr.deliveryType == 3">{{details.orderAttr.pickUpAddress}}</span>
          </div>

        </div>
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">联系方式</label>
            <span class="form-span">{{details.orderAttr.receiptMobile}}</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">快递公司</label>
            <span class="form-span">{{details.orderAttr.waybillCode}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-btns"
         v-if="fromParam.from=='prod' && details.status == 0">
      <div class="btn btn-operate btn-blue"
           @click="reling">认领</div>
      <div class="btn btn-operate btn-orange"
           @click="bohuiFun">驳回</div>
    </div>
    <div class="detail-btns"
         v-if="fromParam.from=='order'">
      <div class="btn btn-operate btn-blue"
           @click="openPop(2)"
           v-if="details.status == 2">开始生产</div>
      <div class="btn btn-operate btn-orange"
           @click="openPop(4)"
           v-if="details.status == 4">订单发货</div>
      <div class="btn btn-operate btn-red"
           @click="openPop(6)"
           v-if="details.status == 6">同意退单</div>
      <div class="btn btn-operate btn-blue"
           @click="openPop(8)"
           v-if="details.status == 8">同意</div>
      <div class="btn btn-operate btn-red"
           @click="openPop(9)"
           v-if="details.status == 8">拒绝</div>
      <div class="btn btn-operate btn-blue"
           @click="openPop(3)"
           v-if="details.status == 3 || details.status == 6 || details.status == 9">完成生产</div>
    </div>

    <!-- 以下是弹框部分 -->
    <!-- 驳回弹框 -->
    <Dialog ref="bohui"
            :config="bohuiconfig"
            :beforeClose="beforeClose"
            :autoClose=false
            @close="resetForm">
      <div class="yhc-item">
        <el-input type="textarea"
                  v-model="form.desc"></el-input>
      </div>
    </Dialog>
    <!-- 提交发货弹框 -->
    <Dialog ref="fahuo"
            :config="fahuoconfig"
            :autoClose=false
            :beforeClose="beforeClose"
            @close="resetForm">
      <el-form>
        <el-form-item label="物流公司"
                      class="yhc-item fahuoPop">
          <el-select v-model="form.wuliu"
                     placeholder="请选择物流"
                     class="width100">
            <el-option :label="x.name"
                       :value="x.code"
                       v-for="x in expCompany"
                       :key="x.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运单号"
                      class="yhc-item fahuoPop">
          <el-input type="text"
                    v-model="form.danhao"></el-input>
        </el-form-item>
      </el-form>
    </Dialog>
    <!-- 退单弹框 -->
    <Dialog ref="tuidan"
            :config="tuidanconfig"
            :beforeClose="beforeClose"
            @close="resetForm">
      <div class="yhc-item">
        <el-input type="textarea"
                  v-model="form.desc"></el-input>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '@/components/dialog-pop'
export default {
  name: '',
  data() {
    return {
      details: '',
      form: { desc: '', wuliu: 'STO', danhao: '' },
      expCompany: [],
      bohuiconfig: {
        // top: '20vh',
        width: '432px',
        title: '驳回理由',
        center: false,
        btnTxt: ['取消', '确认'],
      },
      fahuoconfig: {
        // top: '20vh',
        width: '432px',
        title: '订单发货',
        center: false,
        btnTxt: ['取消', '确认'],
      },
      tuidanconfig: {
        // top: '20vh',
        width: '432px',
        title: '退单理由',
        center: false,
        btnTxt: ['取消', '确认'],
      },
      fromParam: {},
    }
  },
  components: { Dialog },
  created() {
    let this_ = this
    this_.fromParam = this_.$route.query
    this_.getOrderInfo()
    this_.getExpressCompany().then((res) => {
      if (res.code == 200) {
        this_.expCompany = res.data
      }
    })
  },
  mounted() {},
  methods: {
    getOrderInfo() {
      let this_ = this
      this_
        .$post('post', this_.baseUrl + '/order/getById', {
          orderId: this_.$route.query.id,
        })
        .then((res) => {
          if (res.code == 200) {
            this_.details = res.data
          }
        })
    },
    reling() {
      let this_ = this
      this.confirm_pop('确定认领该条订单', '认领')
        .then(() => {
          this_
            .$post('post', this_.baseUrl + '/operating/receiveOrder', {
              orderId: this_.$route.query.id,
            })
            .then((res) => {
              if (res.code == 200) {
                this.$message({ type: 'success', message: '认领成功!' })
                this.getOrderInfo()
              }
            })
        })
        .catch(() => {})
    },
    bohuiFun() {
      let this_ = this

      this_.$refs.bohui
        .open((cancel) => {
          this_
            .$post('post', this_.baseUrl + '/operating/turnDownOrder', {
              orderId: this_.$route.query.id,
              remark: this_.form.desc,
            })
            .then((res) => {
              if (res.code == 200) {
                this.$message({ type: 'success', message: '驳回成功!' })
                this.getOrderInfo()
                cancel()
              }
            })
        })
        .then(() => {
          console.log(this.form.dec)
        }) //这里就充分利用了open方法中返回的nextTick
    },
    openPop(n) {
      switch (n) {
        case 2: //开始生产
          this.confirm_pop('该条订单是否开始生产', '开始生产')
            .then(() => {
              let this_ = this
              this_
                .$post('post', this_.baseUrl + '/order/downloadProdFile', {
                  orderId: this_.$route.query.id,
                })
                .then((res) => {
                    this_.getOrderInfo()
                })
            })
            .catch(() => {})
          break
        case 3: //完成生产
          this.confirm_pop('确定该订单已完成生产？', '完成生产')
            .then(() => {
                let this_ = this
                this_
                  .$post('post', this_.baseUrl + '/order/doneProduction', {
                    orderId: this_.$route.query.id,
                  })
                  .then((res) => {
                    if (res.code == 200) {
                        this_.$message({
                      type: 'success',
                      message: '完成生产!',
                    })
                      this_.getOrderInfo()
                    }
                  })
            })
            .catch(() => {})
          break
        case 4: //订单发货
          let this_ = this
          this_.$refs.fahuo
            .open((cancel) => {
              this_
                .$post('post', this_.baseUrl + '/order/delivery', {
                  orderId: this_.$route.query.id,
                  companyCode: this_.form.wuliu,
                  waybillCode: this_.form.danhao,
                })
                .then((res) => {
                  if (res.code == 200) {
                    this_.$message({
                      type: 'success',
                      message: '订单发货成功!',
                    })
                    this_.getOrderInfo()
                    cancel()
                  }
                })
            })
            .then(() => {
              console.log(this.$refs.span)
            }) //这里就充分利用了open方法中返回的nextTick
          break
        case 6: //退单
          this.$refs.tuidan
            .open((cancel) => {
              // cancel();
              console.log(this.form)
              console.log('点击提交按钮了')
            })
            .then(() => {
              console.log(this.$refs.span)
            }) //这里就充分利用了open方法中返回的nextTick
          break
        case 8: //返厂确认--同意
          this.confirm_pop('该订单是否同意返厂', '确认提示')
            .then(() => {
              console.log(1111)
            })
            .catch(() => {})
          break
        case 9: //返厂确认--拒绝
          this.confirm_pop('该订单是否拒绝返厂', '确认提示')
            .then(() => {
              console.log(1111)
            })
            .catch(() => {})
          break
      }
    },
    beforeClose() {},
    resetForm() {
      // 这里可以写重置表单的实现
      console.log(this.form)
    },
  },
}
</script>
<style lang='less' scoped>
.detail-page {
  padding-bottom: 46px;
}
.page-title {
  font-size: 14px;
  margin: 0 0 24px 0;
}
/deep/.fahuoPop {
  .el-form-item__content {
    width: 100%;
  }
}
</style>
