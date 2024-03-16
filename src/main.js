import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/plugins/sentry'
import 'lib-flexible'
import { getJsapiTicket } from '@/apis'


Vue.config.productionTip = false


getJsapiTicket().then((res) => {
  if (res.code === '000000') {
    const sha1 = require("crypto-js/sha1")
    const appId = process.env.VUE_APP_APPID
    const timestamp = parseInt(new Date().getTime() / 1000)
    const nonceStr = Math.random().toString(36)
    const jsapi_ticket = res.data
    const url = window.location.href
    const str = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${encodeURIComponent(url)}`
    const signature = sha1(str).toString()
    window.wx.config({
      debug: process.env.NODE_ENV === 'development',
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData', 'updateAppMessageShareData', 'openLocation', 'getLocation']
    })
  }
})

window.wx.ready(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

window.wx.error((err) => {
  console.error("window.wx.error", err)
})
