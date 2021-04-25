const Fns={
    getExpressCompany(){
       return this.$post("get",this.baseUrl+"/order/listExpressCompany")
    },
    confirm_pop(cnt,title){
        return new Promise((resolve, reject) => {
            this.$confirm(cnt, title?title:"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback:function(action, instance){
                    // instance.close
                    // function(action, instance)，action 的值为'confirm', 'cancel'或'close', instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法
                    action == "confirm"?resolve(true):instance.close;
                }
              })
        })
    },
}
export default Fns