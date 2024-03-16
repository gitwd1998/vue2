<template>
  <div class="about-view">
    <button @click="chooseImage">chooseImage</button>
    <hr>
    图片列表
    <ol>
      <li v-for="(localId, index) in localIds" :key="localId">
        <my-img :localIds="localIds" :localId="localId" />
        <div style="flex: 1;"></div>
        <span @click="uploadImage(localId)">&#x2714;</span>
        <span @click="deleteImage(index)">&#x2718;</span>
      </li>
    </ol>
  </div>
</template>

<script>
import MyImg from '@/components/MyImg'
export default {
  name: 'AboutView',
  components: {
    MyImg
  },
  data() {
    return {
      localIds: []
    }
  },
  methods: {
    chooseImage() {
      window.wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.localIds = res.localIds || []
        }
      })
    },
    uploadImage(localId) {
      window.wx.uploadImage({
        localId,
        isShowProgressTips: 1,
        success: (res) => {
          console.log(res);
        }
      })
    },
    deleteImage(idnex) {
      this.localIds.splice(idnex, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.about-view {
  padding: 20px;
  font-size: 16px;
  ol {
    padding: 0;
    li {
      margin: 12px 0;
      display: flex;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
        background-color: #fafafa;
        border-radius: 8px;
        object-fit: contain;
      }
      span {
        margin: 10px;
      }
    }
  }
}
</style>
