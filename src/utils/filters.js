import Vue from 'vue'
import Fns from './common'
import constant from './constant'
const filters = {
    // 空值
    isEmpty(val) {
        return val || '-'
    },
    // 小数
    tofix(val, digit) {
        let num = Number(val);
        if (num || num == 0) {
            return num.toFixed(digit) || ''
        }
    },
    //金额累加
    add(arr, key) {
        if (arr || Array.isArray(arr)) {
            let m = 0;
            arr.map(ceil => {
                m += (ceil[key] ? ceil[key] : 0) * 1;
            })
            return m.toFixed(2);
        } else {
            return false;
        }
    },
    // 千分号
    qf(num) {
        return (num * 1).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(/\.00$/, '')
    },
    // 手机号码 334
    phone334(phone) {
        let value = (phone + '').replace(/\D/g, '').substr(0, 11) // 不允许输入非数字字符，超过11位数字截取前11位
        let len = value.length
        if (len > 3 && len < 8) {
            value = value.replace(/^(\d{3})/g, '$1 ')
        } else if (len >= 8) {
            value = value.replace(/^(\d{3})(\d{4})/g, '$1 $2 ')
        }
        return value;
    },
    formatDate_(time,type){
        var date = new Date(time);
        return Fns.formatDate(date, type);
    },
    yhc_status(n){
        if(n == 0){
            return "待生产";
        }
        let status =  constant.receiveStatus.filter((item,i)=>{
            return n == item.value;
        });
        if(status.length>0){
            return status[0].name;
        }else{
            return "";
        }
    },
    yhc_source(n){
        let str = "";
        constant.source.map((item,i)=>{
            if(n == item.value){
                str = item.name;
            }
        });
        return str;
    },
    yhc_dlyType(n){
        let str = "";
        constant.deliveryType.map((item,i)=>{
            if(n == item.value){
                str = item.name;
            }
        });
        return str;
    },
    yhc_wayBill(n,list){
        let str = "";
        list.map((item,i)=>{
            if(n == item.code){
                str = item.name;
            }
        });
        return str;
    },
    yhc_toObj(b){
        let str = "";
        for(let i in b){
            str+=i;
            if(b[i]){
                str+=" : "+b[i];
            }
        }
        return str;
    }
    
}
export default (Vue) => {
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })

}