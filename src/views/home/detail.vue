<template>
  <div class='detail-page'
       v-if="details">
    <div class="page-title"><span class="gray-font cursor_p"
            @click="pathIndex"><i class="el-icon-back"></i>{{fromParam.from=="order"?"订单管理":"生产大厅"}}</span></div>
    <div class="detail-form order-info">
      <div class="form-head">订单信息</div>
      <div class="form-content">
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">订单标题</label>
            <input type="text"
                   class="form-span"
                   readonly
                   v-model="details.orderAttr.title">
          </div>
          <div class="form-item mr34">
            <label for="form-label">订单编号</label>
            <input type="text"
                   class="form-span"
                   readonly
                   v-model="details.orderCode">
          </div>
          <div class="form-item mr34">
            <label for="form-label">订单状态</label>
            <span class="form-span">{{details.status | yhc_status}}
              <el-tooltip v-if="details.status==1 && details.operationLogs.length>0"
                          class="item yhc-tooltip"
                          effect="dark"
                          :content="details.operationLogs[0].remark"
                          placement="top-start">
                <i class="icon_warning fr"></i>
              </el-tooltip>
              <span class="item fr cursor_p"
                    v-if="details.status==8"
                    @click="openFanchang"><i class="icon_warning fr"></i></span>
            </span>

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
            <label for="form-label">昵称</label>
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
           v-for="(y,index) in details.orderSkus" :class='{"borderBt":index != (details.orderSkus.length-1)}'>
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">产品尺寸{{index+1}}</label>
            <span class="form-span">{{(y.attributes.width/1000)}}*{{(y.attributes.height/1000)}}m</span>
          </div>
          <div class="form-item mr34" v-for="y_ in y.products">
            <label for="form-label">产品文件</label>
            <input type="text"
                   class="form-span"
                   readonly
                   v-model="y_.name"
                   style="width:145px;">
            <span class="form-span-click"
                  @click="lookBigImg(y_.img)">查看</span>
            <span class="form-span-click"
                  v-if="details.status == 2"
                  @click="download(y_)">下载</span>
          </div>
          <!-- <div class="form-item" v-if="details.orderAttr.skuId == 2||details.orderAttr.skuId == 5||details.orderAttr.skuId == 6">
            <label for="form-label">产品工艺{{index+1}}</label>
            <span class="form-span">
              <span class="overflowHd">{{y.attributes.crafts | yhc_toObj}}</span>
            </span>
          </div> -->
        </div>
        <div class="form-line clearfix" v-if="details.orderAttr.skuId != 4" style="margin-bottom:0;">
            <div class="form-item mr34" v-for="(i,key) in y.attributes.crafts">
                <label for="form-label" :class='{"redBold":key=="款数"}'>{{key}}{{index+1}}</label>
                <span class="form-span" :class='{"redBold":key=="款数"}'>
                   {{i}}
                </span>
          </div>
        </div>
        <div class="form-line clearfix" v-if="details.orderAttr.skuId == 4" style="margin-bottom:0;">
            <div class="form-item mr34" v-for="(i,key) in y.attributes.crafts">
                <label for="form-label">{{key}}{{index+1}}</label>
                <span class="form-span" v-if="!(key == '材料颜色' || key == '封面颜色')">
                    <span class="overflowHd">{{i}}</span>
                </span>
                <span class="form-span bg-trsp" v-if="key == '材料颜色' || key == '封面颜色'" >
                    <span class="colorDiv" :style="{background:i}"></span>
                </span>
          </div>
        </div>
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label" style="color:red;font-weight: bold;">产品数量{{index+1}}</label>
            <span class="form-span" style="color:red;font-weight: bold;">{{y.num}}</span>
          </div>
          <div class="form-item mr34"
               v-if="y.skuId != 7 && details.orderAttr.skuId != 4 && y.attributes">
            <label for="form-label">颜色</label>
            <span class="form-span">{{y.attributes.fontColor}}</span>
          </div>
          <div class="form-item"
               v-if="y.attributes.paper">
            <label for="form-label">材料选择{{index+1}}</label>
            <span class="form-span">
              {{y.attributes.paper}}
            </span>
          </div>
        </div>
        <div class="form-line clearfix">
          <div class="form-item width100">
            <label for="form-label">产品描述{{index+1}}</label>
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
                  style="width:400px;white-space: pre-wrap;"
                  v-if="details.orderAttr.deliveryType == 1 || details.orderAttr.deliveryType==2">{{details.orderAttr.receiptAddress}} {{details.orderAttr.receiptDetailAddress}}</span>
            <span class="form-span"
                  style="width:400px;white-space: pre-wrap;"
                  v-if="details.orderAttr.deliveryType == 3">{{details.orderAttr.pickUpAddress}}</span>
          </div>

        </div>
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">联系方式</label>
            <span class="form-span">{{details.orderAttr.receiptMobile}}</span>
          </div>
          <div class="form-item mr34"
               v-if="details.orderAttr.deliveryType != 3">
            <label for="form-label">快递公司</label>
            <span class="form-span">{{details.orderAttr.waybillCode | yhc_wayBill($store.state.expCompany)}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-form order-info">
      <div class="form-head">发货信息</div>
      <div class="form-content">
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">物流名称</label>
            <span class="form-span">{{details.expressCompanyName}}</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">物流单号</label>
            <span class="form-span">{{details.expressCode}}</span>
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
           @click="openPop(2)">下载</div>
      <div class="btn btn-operate btn-orange"
           @click="openPop(4)"
           v-if="details.status == 4">订单发货</div>
      <div class="btn btn-operate btn-blue"
           @click="openPop(6)"
           v-if="details.status == 6">同意退单</div>
      <div class="btn btn-operate btn-blue"
           @click="openPop(8)"
           v-if="details.status == 8">同意</div>
      <div class="btn btn-operate btn-red"
           @click="openPop(9)"
           v-if="details.status == 8">拒绝</div>
      <div class="btn btn-operate btn-blue_"
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
                       v-for="x in $store.state.expCompany"
                       :key="x.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运单号"
                      class="yhc-item fahuoPop displayFl">
          <!-- <div v-for="(x,index) in form.danhaos" :key="index"> -->
          <el-input type="text"
                    v-model="form.danhao"></el-input>
          <!-- <span class="el-icon-remove ml10"
                v-if="index != 0"
                style="font-size: 24px;"
                @click="delItem(x,index)"></span>
          <span class="el-icon-circle-plus ml10"
                style="font-size: 24px;"
                @click="addItem(x,index)"></span> -->
          <!-- </div> -->

        </el-form-item>
      </el-form>
    </Dialog>
    <!-- 退单弹框 -->
    <Dialog ref="fanchang"
            :config="fanchangconfig"
            :beforeClose="beforeClose"
            modal-append-to-body="false"
            @close="resetForm">
      <div class="yhc-item"
           v-if="details.orderBack">
        <div class="el-textarea__inner">{{details.orderBack.description}}</div>
      </div>
      <div class="shangchuan"
           v-if="fileList.length>0">
        <ul>
          <li v-for="(item,index) in fileList"
              :key="index">
            <!-- <img :src="item.url" alt="" class="img"> -->
            <el-image class="img"
                      z-index="3000"
                      :src="item"
                      :preview-src-list="fileList">
            </el-image>
          </li>
        </ul>
      </div>
    </Dialog>

    <!-- 查看大图 -->
    <el-image-viewer v-if="showViewer"
                     :on-close="closeViewer"
                     :url-list="[showViewerUrl]" />

  </div>
</template>

<script>
// 导入组件
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import Dialog from '@/components/dialog-pop'
export default {
  name: '',
  components: { ElImageViewer, Dialog },
  data() {
    return {
      showViewer: false, // 显示查看器
      details: '',
      form: { desc: '', wuliu: 'STO', danhao: ''},
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
      fanchangconfig: {
        // top: '20vh',
        width: '432px',
        title: '返厂理由',
        center: false,
        btnTxt: ['取消'],
      },
      fileList: [],
      fromParam: {},
      showViewerUrl: '',
    }
  },
  created() {
    let this_ = this
    this_.fromParam = this_.$route.query
    this_.getOrderInfo()
    this_.getExpressCompany()
  },
  mounted() {},
  methods: {
    // 跳转
    pathIndex() {
      this.$router.go(-1)
    },
    getOrderInfo() {
      let this_ = this
      this_
        .$post('post', '/order/getById', {
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
            .$post('post', '/operating/receiveOrder', {
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
          if (!this_.form.desc) {
            return this_.$message.error('请输入驳回理由')
          }
          this_
            .$post('post', '/operating/turnDownOrder', {
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
    openFanchang() {
      let this_ = this

      this_.$refs.fanchang
        .open((cancel) => {})
        .then(() => {
          let d_ = this.details.orderBack
          let arr = [],
            arr_ = []
          if (d_ && d_.pics != '') {
            arr = d_.pics.split(',')
            arr.map((item) => {
              arr_.push(this.loadURL + item)
            })
          }
          this.fileList = arr_

          return
        })
    },
    openPop(n) {
      switch (n) {
        case 2: //开始生产
          //   this.confirm_pop('该条订单是否开始生产', '开始生产')
          //     .then(() => {
          this.$post('post', '/order/downloadProdFile', {
            orderId: this.$route.query.id,
          }).then((res) => {
            if (res.code == 200) {
              this.getOrderInfo()
              console.log(this.loadURL)
              window.open(this.loadURL + res.data)
            }
          })
          // })
          // .catch(() => {})
          break
        case 3: //完成生产
          this.confirm_pop('确定该订单已完成生产？', '完成生产')
            .then(() => {
              let this_ = this
              this_
                .$post('post', '/order/doneProduction', {
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
                // let list = this_.form.danhaos;
                // let jud = false;
                // for(let i=0;i<list.length;i++){
                //     if(!list[i].danhao){
                //         jud = true;
                //         break;
                //     }
                // }
                // if(jud){
                //     return this_.$message({
                //     type: 'error',
                //     message: '运单号不可为空!',
                //     })
                // }
                if(!this_.form.danhao){
                     return this_.$message({
                    type: 'error',
                    message: '运单号不可为空!',
                    })
                }
                  this_
                    .$post('post', '/order/delivery', {
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
          this.confirm_pop('该订单是否同意退单', '确认提示')
            .then(() => {
              let this_ = this
              this_
                .$post('post', '/order/viaCancel', {
                  orderId: this_.$route.query.id,
                })
                .then((res) => {
                  if (res.code == 200) {
                    this_.$message({
                      type: 'success',
                      message: '同意退单!',
                    })
                    this_.getOrderInfo()
                  }
                })
            })
            .catch(() => {})
          break
        case 8: //返厂确认--同意
          this.confirm_pop('该订单是否同意返厂', '确认提示')
            .then(() => {
              let this_ = this
              this_
                .$post('post', '/order/viaBack', {
                  orderId: this_.$route.query.id,
                })
                .then((res) => {
                  if (res.code == 200) {
                    this_.$message({
                      type: 'success',
                      message: '同意返厂!',
                    })
                    this_.getOrderInfo()
                  }
                })
            })
            .catch(() => {})
          break
        case 9: //返厂确认--拒绝
          this.confirm_pop('该订单是否拒绝返厂', '确认提示')
            .then(() => {
              let this_ = this
              this_
                .$post('post', '/order/refuseBack', {
                  orderId: this_.$route.query.id,
                })
                .then((res) => {
                  if (res.code == 200) {
                    this_.$message({
                      type: 'success',
                      message: '拒绝返厂!',
                    })
                    this_.getOrderInfo()
                  }
                })
            })
            .catch(() => {})
          break
      }
    },
    addItem(x, ind) {
      if (this.form.danhaos.length > 1) {
        return this.$message.error('最多添加两条')
      }
      this.form.danhaos.push({ danhao: '' })
    },
    delItem(x, ind) {
      this.form.danhaos.splice(ind, 1)
    },
    download(x) {
      let this_ = this
      this_
        .$post('post', '/production/getDownloadUrl', {
          productCode: x.code,
        })
        .then((res) => {
          if (res.code == 200) {
            this_.$message({
              type: 'success',
              message: '文件下载成功!',
            })
            window.open(this.loadURL + res.data)
          }
        })
    },
    beforeClose() {},
    resetForm() {
      // 这里可以写重置表单的实现
      console.log(this.form)
    },

    // 大图预览
    lookBigImg(val) {
      if (val) {
        this.showViewer = true
        this.showViewerUrl = this.loadURL + val
      } else {
        this.$message({
          message: '该文件暂不支持预览哦！',
          type: 'warning',
        })
      }
    },

    // 关闭查看器
    closeViewer() {
      this.showViewer = false
      this.showViewerUrl = ''
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
  .gray-font {
    line-height: 24px;
  }
  .el-icon-back {
    font-size: 24px;
    margin-right: 10px;
    vertical-align: top;
  }
}
/deep/.fahuoPop {
  .el-form-item__content {
    width: 100%;
    display: flex;
    align-items: center;
  }
}

.shangchuan {
  margin-top: 10px;
  display: flex;
  align-items: center;
  ul {
    display: flex;
    align-items: center;
  }
  li {
    margin-right: 13px;
    position: relative;
    .img {
      width: 40px;
      height: 40px;
      border-radius: 6px;
      cursor: pointer;
    }
  }
}
</style>
