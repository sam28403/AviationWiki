<template>
  <el-backtop :right="100" :bottom="100" />
  <el-container style="height: 100vh; border: 1px solid #dcdfe6;">

    <!-- Header -->
    <el-header height="60px" style="background: #409EFF; color: white; text-align: left; line-height: 60px;">
      <el-icon>
        <Promotion />
      </el-icon>
      <el-text size="large">Aviation Wiki</el-text>

    </el-header>

    <!-- 中部区域：Aside + Main -->
    <el-container>
      <!-- Aside -->
      <el-aside width="200px" style="background: #f5f7fa; padding: 20px;">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="1">Boeing</el-menu-item>
          <el-menu-item index="2">Airbus</el-menu-item>
          <el-menu-item index="3">COMAC</el-menu-item>
          <el-menu-item index="4">Airports</el-menu-item>
        </el-menu>
      </el-aside>

      <!-- Main -->
      <el-main style="padding: 20px; background: #ffffff;">
        <h1>Welcome to Aviation Wiki 👋👋👋</h1>
        <div class="card-list">
          <el-card style="width: 400px; height: 220px" shadow="hover">
            <div class="card">
              <img
                  src="../assets/Boeing.svg"
                  style="width: 150px; margin-right: 20px"
                  alt="0"/>
              <div>
                <h1>波音</h1>
                <el-link style="font-size: 18px">
                  <strong>查看最新内容</strong><el-icon class="el-icon--right"><icon-view /></el-icon>
                </el-link>
              </div>
            </div>
          </el-card>
          <el-card style="width: 400px; height: 220px" shadow="hover">
            <div class="card">
              <img
                  src="../assets/Airbus.png"
                  style="width: 150px; margin-right: 20px"
                  alt="0"/>
              <div>
                <h1>空中客车</h1>
                <el-link style="font-size: 18px">
                  <strong>查看最新内容</strong><el-icon class="el-icon--right"><icon-view /></el-icon>
                </el-link>
              </div>
            </div>
          </el-card>
          <el-card style="width: 400px; height: 220px" shadow="hover">
            <div class="card">
              <img
                  src="../assets/COMAC.svg"
                  style="width: 150px; margin-right: 20px"
                  alt="0"/>
              <div>
                <h1>中国商飞</h1>
                <el-link style="font-size: 18px">
                  <strong>查看最新内容</strong><el-icon class="el-icon--right"><icon-view /></el-icon>
                </el-link>
              </div>
            </div>
          </el-card>
          <el-card style="width: 400px; height: 220px" shadow="hover">
            <div class="card">
              <img
                  src="../assets/airport.png"
                  style="width: 150px; margin-right: 20px"
                  alt="0"/>
              <div>
                <h1>机场列表</h1>
                <el-link style="font-size: 18px">
                  <strong>查看最新内容</strong><el-icon class="el-icon--right"><icon-view /></el-icon>
                </el-link>
              </div>
            </div>
          </el-card>
        </div>
        <h1>热门内容</h1>
        <div class="card-list">
          <el-card style="width: 400px; height: 220px" shadow="always">
            <div class="card">
              <img
                  src="../assets/boeing.jpg"
                  style="width: 125px; margin-right: 20px"
                  alt="0"/>
              <div>
                <h1>Boeing 787</h1>
                <strong>最受乘客喜爱的飞机</strong>
                <br>
                💵USD 225,000,000
              </div>
            </div>
          </el-card>
          <el-card style="width: 400px; height: 220px" shadow="always">
            <div class="card">
              <img
                  src="../assets/Airbus/A380.jpg"
                  style="width: 110px; margin-right: 20px"
                  alt="0"/>
              <div>
                <h1>Airbus A380</h1>
                <strong>双层大飞机</strong>
                <br>
                💵USD 445,600,000
              </div>
            </div>
          </el-card>
          <el-card style="width: 400px; height: 220px" shadow="always">
            <div class="card">
              <img
                  src="../assets/HIA.svg"
                  style="width: 100px; margin-right: 20px"
                  alt="0"/>
              <div>
                <h1>萧山国际机场</h1>
                <p>杭州市，萧山区</p>
              </div>
            </div>
          </el-card>
          <el-card style="width: 400px; height: 220px" shadow="always">
            <div class="card">
              <img
                  src="../assets/sha.svg"
                  style="width: 100px; margin-right: 20px"
                  alt="0"/>
              <div>
                <h1>浦东国际机场</h1>
                <p>上海市，浦东新区</p>
              </div>
            </div>
          </el-card>
        </div>
        <h1>精选照片</h1>
        <el-carousel width="100%" height="800px" indicator-position="outside">
          <el-carousel-item v-for="(img, index) in images" :key="index">
            <img :src="img" alt="carousel image" style="width: 100%; object-fit: contain" />
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>

    <!-- Footer -->
    <el-footer height="40px" style="background: #f0f2f5; text-align: center; line-height: 40px;">
      © 2025 Sam-Lab Studio
    </el-footer>
  </el-container>
</template>


<style scoped>
.card {
  display: flex;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  gap: 20px;
  margin: 30px;
}

.carousel-item {
  color: #475669;
  opacity: 0.75;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(n) {
  background-color: #99a9bf;
}

.el-link {
  margin-right: 8px;
}

</style>

<script lang="ts" setup>
import {createApp} from 'vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from "../App.vue";
import {Promotion} from "@element-plus/icons-vue";
import { Edit, View as IconView } from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const imageModules = import.meta.glob('../assets/index/*.jpg', { eager: true })
const images = Object.values(imageModules).map(module => module.default)

</script>