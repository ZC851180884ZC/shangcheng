//vee-validate插件 ：表单验证区
import Vue from 'vue'
import Veevalidate, { Field } from 'vee-validate'
//中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(Veevalidate)

//表单验证
Veevalidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is:(field)=>`${field}必须与密码想同`
    },
    attributes:{
        phone:'手机号',
        code:'验证码',
        password:'密码',
        passwordre:'确认密码',
        isCheck:'协议',
    }
})