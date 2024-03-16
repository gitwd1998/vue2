<template>
  <div class="home-view">
    <CountTo id="copyBox" :decimals="4" prefix="¥" :startVal="0.00" :endVal="count" :duration="2000" />
    <button @click="copy(count)">复制</button>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  name: 'HomeView',
  components: {
    CountTo
  },
  data() {
    return {
      count: new Date().getTime() / 1000
    }
  },
  methods: {
    copy(value) {
      let copyInput = document.createElement("input")
      document.body.appendChild(copyInput)
      copyInput.style.display = "none"
      copyInput.value = value
      copyInput.select()
      let bool = document.execCommand("copy")
      bool && alert("复制成功：" + value)
      console.info(document.execCommand("paste"))
      copyInput.remove()
    }
  }
}
</script>

<style>
.home-view {
  padding: 10px;
  font-size: 20px;
}
</style>
