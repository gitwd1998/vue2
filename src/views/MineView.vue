<template>
  <div class="mine">
    <div>
      <img :src="user.headimgurl" alt="">
    </div>
    <div>昵称：{{ user.nickname }}</div>
    <div>性别：{{ ['未知', '男', '女'][user.sex]}}</div>
    <div>地区：{{ user.country }} / {{ user.province }} / {{ user.city }}</div>
    <div>openid：{{ user.openid }}</div>
    <div>unionid：{{ user.unionid }}</div>
  </div>
</template>

<script>
import { getUserInfo } from '@/apis'

export default {
  name: 'MineView',
  data() {
    return {
      user: {}
    }
  },
  computed: {
    code() {
      return this.$route.query.code
    }
  },
  created() {
    if (this.code) {
      this.getUserInfo()
    } else {
      this.redirectPage()
    }
  },
  methods: {
    redirectPage() {
      const href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.VUE_APP_APPID}&redirect_uri=${encodeURIComponent(location.origin + location.pathname)}&response_type=code&scope=snsapi_userinfo&state=STATE&forcePopup=true#wechat_redirect`
      alert(href)
      window.location.href = href
    },
    getUserInfo() {
      getUserInfo({ code: this.code }).then((res) => {
        if (res.code === '000000') {
          this.user = res?.data;
        } else {
          console.log(res)
        }
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>