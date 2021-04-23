<template>
  <div class='detail-page'>
      <div class="page-title"><span class="gray-font">{{fromParam.from=="order"?"订单管理":"生产大厅"}} / </span>第一个标题</div>
      <div class="detail-form order-info">
          <div class="form-head">订单信息</div>
          <div class="form-content">
              <div class="form-line clearfix">
                 <div class="form-item mr34">
                    <label for="form-label">订单编号</label>
                    <span class="form-span">Tf20211999932212333432</span>
                 </div>
                 <div class="form-item mr34">
                    <label for="form-label">订单状态</label>
                    <span class="form-span">已下单<i class="icon_warning fr"></i></span>
                 </div>
                 <div class="form-item">
                    <label for="form-label">订单来源</label>
                    <span class="form-span">淘宝</span>
                 </div>
                  
              </div>
              <div class="form-line clearfix">
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
                 <div  class="form-item mr34">
                    <label for="form-label">产品文件1</label>
                    <span class="form-span" style="width:145px;">文件标题</span>
                    <span class="form-span-click">查看</span>
                 </div>
                 <div  class="form-item mr34">
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
      <div class="detail-btns">
          <div class="btn btn-blue">认领</div>
          <div class="btn btn-orange">驳回</div>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return {
        fromParam:{}
    }
  },
  components: {},
  created(){
      let this_ = this;
      this_.fromParam = this_.$route.query;
  },
  mounted(){},
  methods: {}
}
</script>
<style lang='less' scoped>
.detail-page{
    padding-bottom: 46px;
}
.page-title{
    font-size: 14px;
    margin: 0 0 24px 0;
}
</style>
