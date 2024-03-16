<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
  }
}
</script>

<style lang="less">
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
body {
  box-sizing: border-box;
  margin: 0;
  // 配合meta声明viewport-fit=cover
  // 兼容 iOS < 11.2
  padding-top: constant(safe-area-inset-top);
  padding-left: constant(safe-area-inset-left);
  padding-right: constant(safe-area-inset-right);
  padding-bottom: constant(safe-area-inset-bottom);
  // 兼容 iOS >= 11.2
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
