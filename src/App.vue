<script setup>
import MainPage from './components/MainPage.vue'
</script>

<template>
  <el-main style="max-width: 100%;">
    <MainPage />
  </el-main>
</template>

<style scoped>
/* 移除 el-main 默认内边距 */
.el-main {
  padding: 0;
}
</style>

<style>
/* 全局清除 html 和 body 的空白 */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>