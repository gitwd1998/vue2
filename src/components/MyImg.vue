<template>
  <img class="my-img" :src="src" :alt="alt" @click="previewImage">
</template>

<script>
export default {
  name: 'MyImg',
  props: {
    localIds: {
      type: Array,
      default: () => ([])
    },
    localId: String,
    alt: String,
    preview: {
      type:Boolean,
      default: true
    }
  },
  data() {
    return {
      src: ''
    }
  },
  created() {
    console.log(this.localId && /iphone/i.test(window.navigator.userAgent) && window.__wxjs_is_wkwebv);
    if (this.localId && /iphone/i.test(window.navigator.userAgent) && window.__wxjs_is_wkwebv) window.wx.getLocalImgData({
      localId: this.localId,
      success: (res) => {
        this.src = res.localData
      }
    })
    else this.src = this.localId
  },
  methods: {
    previewImage() {
      this.preview && window.wx.previewImage({
        current: this.localId,
        urls: this.localIds
      })
    }
  }
}
</script>
