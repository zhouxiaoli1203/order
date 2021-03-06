import store from '@/store/store'
const Fns={
    getExpressCompany(){
       this.$post("get","/order/listExpressCompany").then((res)=>{
        if(res.code == 200){
            store.state.expCompany = res.data;
        }
       });
    },
    formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : Fns.padLeftZero(str));
            }
        }
        return fmt;
    },
    padLeftZero(str) {
        return ('00' + str).substr(str.length);
    },
    formatDateYMDhms(date){
        let date_ = new Date(date);
        return Fns.formatDate(date_,'yyyy-MM-dd hh:mm:ss');
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
    getColor(name){
        var color = "";
        switch (name){
            case "打印":
            case "通用下单":
                color = "blue"
                break;
            case "红色条幅":
                 color = "red"
                break;
            case "彩色条幅":
                 color = "caise"
                break;
            case "旗帜":
                 color = "yellow"
                break;
            case "喷绘":
                color = "lineRed"
                break;
            case "户外精喷":
                color = "hwjp"
                break;
            case "户内写真":
                color = "xiezhen"
                break;
            case "户外写真":
                color = "xiezhen"
                break;
            case "UV卷材写真":
                color = "xiezhen"
                break;
            case "绶带":
                color = "xiezhen"
                break;
        }
        return color;
    },
}
export default Fns