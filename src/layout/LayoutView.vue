<template>
  <div class="layout">
    <div class="layout-view">
      <router-view></router-view>
    </div>
    <div class="layout-operate">
      <div :class="['layout-operate-item', { 'is-actived': item.key === $route.name }]" v-for="item in menuList" :key="item.key" @click="changeMenu(item)">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layoutView',
  data() {
    return {
      menuList: [
        { key: 'home', name: '首页' },
        { key: 'about', name: '关于' },
        { key: 'mine', name: '我的' }
      ]
    }
  },
  methods: {
    changeMenu(item) {
      if (item.key === this.$route.name) return
      this.$router.replace({ name: item.key })
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  .layout-view {
    flex: 1;
    overflow: auto;
  }
  .layout-operate {
    position: relative;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    &::before {
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      top: 0;
      height: 1px;
      transform-origin: top center;
      transform: scaleY(0.5);
      background-color: tomato;
    }
    .layout-operate-item {
      width: 30%;
      text-align: center;
      &.is-actived {
        color: tomato;
      }
    }
  }
}
</style>