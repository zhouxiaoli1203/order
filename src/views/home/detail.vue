<template>
  <div class='detail-page'>
    <div class="page-title"><span class="gray-font">{{fromParam.from=="order"?"订单管理":"生产大厅"}} / </span>第一个标题</div>
    <div class="detail-form order-info">
      <div class="form-head">订单信息</div>
      <div class="form-content">
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">订单标题</label>
            <span class="form-span">不怕输才会赢</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">订单编号</label>
            <span class="form-span">Tf20211999932212333432</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">订单状态</label>
            <span class="form-span">已下单<i class="icon_warning fr"></i></span>
          </div>

        </div>
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">订单来源</label>
            <span class="form-span">淘宝</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">下单时间</label>
            <span class="form-span">2000年03月02日</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">订单类型</label>
            <span class="form-span">红色条幅</span>
          </div>
        </div>
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">下单员</label>
            <span class="form-span">张飞</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">下单手机号</label>
            <span class="form-span">18232922212</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-form prod-info">
      <div class="form-head">产品规格</div>
      <div class="form-content">
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">产品尺寸1</label>
            <span class="form-span">200*120mm</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">产品文件1</label>
            <span class="form-span"
                  style="width:145px;">文件标题</span>
            <span class="form-span-click">查看</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">产品数量</label>
            <span class="form-span">333</span>
          </div>

        </div>
        <div class="form-line clearfix">
          <div class="form-item">
            <label for="form-label">产品描述1</label>
            <span class="form-textarea">使用设计工具的好处在于，当这些项目材料同时呈现，能够帮助我们进行模式识别，并促进更多创新结合体的出现，这些是当资源隐藏分散在各种文件夹、笔记本和幻灯片里时难以实现的</span>
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
            <span class="form-span">融奇利</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">配送方式</label>
            <span class="form-span">邮寄</span>
          </div>
          <div class="form-item">
            <label for="form-label">配送地址</label>
            <span class="form-span">山西省忻州市代县长江街61号</span>
          </div>

        </div>
        <div class="form-line clearfix">
          <div class="form-item mr34">
            <label for="form-label">联系方式</label>
            <span class="form-span">13443982143</span>
          </div>
          <div class="form-item mr34">
            <label for="form-label">快递公司</label>
            <span class="form-span">中通快递</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-btns" v-if="fromParam.from=='prod'">
      <div class="btn btn-operate btn-blue"
           @click="reling">认领</div>
      <div class="btn btn-operate btn-orange"
           @click="bohui">驳回</div>
    </div>
    <div class="detail-btns" v-if="fromParam.from=='order'">
      <div class="btn btn-operate btn-blue" @click="openPop(1)">去生产</div>
      <div class="btn btn-operate btn-blue" @click="openPop(2)">完成生产</div>
      <div class="btn btn-operate btn-orange"@click="openPop(3)" >订单发货</div>
      <div class="btn btn-operate btn-red" @click="openPop(4)">退单</div>
      <div class="btn btn-operate btn-green"@click="openPop(5)" >完成</div>
      <div class="btn btn-operate btn-blue" @click="openPop(6)">返厂</div>
    </div>

    <!-- 以下是弹框部分 -->
    <!-- 驳回弹框 -->
    <Dialog ref="bohui"
            :config="bohuiconfig"
            :beforeClose="beforeClose"
            @close="resetForm">
             <div class="yhc-item">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </div>
    </Dialog>
    <!-- 提交发货弹框 -->
    <Dialog ref="fahuo"
            :config="fahuoconfig"
            :beforeClose="beforeClose"
            @close="resetForm" >
            <el-form>
                <el-form-item label="物流公司" class="yhc-item fahuoPop">
                    <el-select v-model="form.wuliu" placeholder="请选择物流" class="width100">
                    <el-option :label="x.name" :value="x.code" v-for="x in expCompany" :key="x.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="运单号" class="yhc-item fahuoPop">
                    <el-input type="text" v-model="form.danhao"></el-input>
                </el-form-item>
            </el-form>
    </Dialog>
    <!-- 退单弹框 -->
    <Dialog ref="tuidan"
            :config="tuidanconfig"
            :beforeClose="beforeClose"
            @close="resetForm">
             <div class="yhc-item">
                <el-input type="textarea" v-model="form.desc"></el-input>
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
      form:{desc:"",wuliu:"STO",danhao:""},
      expCompany:[],
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
        title: '驳回理由',
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
    let this_ = this;
    this_.fromParam = this_.$route.query;
    this_.getExpressCompany().then((res)=>{
        if(res.code == 200){
            this.expCompany = res.data;
        }
    });
    
  },
  mounted() {},
  methods: {
    reling() {
      this.confirm_pop('确定认领该条订单', '认领')
        .then(() => {
          console.log(1111)
        })
        .catch(() => {})
    },
    bohui() {
      
      this.$refs.bohui
        .open((cancel) => {
          // cancel();
          console.log('点击提交按钮了')
        })
        .then(() => {
          console.log(this.$refs.span)
        }) //这里就充分利用了open方法中返回的nextTick
    },
    openPop(n){
        switch (n){
            case 1:
               this.confirm_pop('该条订单是否去生产', '去生产')
            .then(() => {
            console.log(1111)
            })
            .catch(() => {}) 
            break;
            case 2:
                this.confirm_pop('确定该订单已完成生产？', '完成生产')
             .then(() => {
             console.log(1111)
             })
             .catch(() => {}) 
            break;
            case 3:
                this.$refs.fahuo
        .open((cancel) => {
          // cancel();
          console.log(this.form)
          console.log('点击提交按钮了')
        })
        .then(() => {
          console.log(this.$refs.span)
        }) //这里就充分利用了open方法中返回的nextTick
            break;
            case 4:
                 this.$refs.tuidan
        .open((cancel) => {
          // cancel();
          console.log(this.form)
          console.log('点击提交按钮了')
        })
        .then(() => {
          console.log(this.$refs.span)
        }) //这里就充分利用了open方法中返回的nextTick
            break;
            case 5:
                this.confirm_pop('该订单是否已完成', '已完成')
            .then(() => {
            console.log(1111)
            })
            .catch(() => {}) 
            break;
            case 6:
            break;
            case 7:
            break;
        }

    },
    beforeClose() {
      console.log('关闭前')
    },
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
/deep/.fahuoPop{
    .el-form-item__content{
        width: 100%;
    }
}
</style>
