<template>
  <v-app>
    <v-app-bar>
      <!-- v-container讓東西不要太分開 -->
      <v-container class="d-flex align-center">
        <v-app-bar-title>番茄鐘</v-app-bar-title>
        <v-btn prepend-icon="mdi-home" to="/">首頁</v-btn>
        <v-btn prepend-icon="mdi-format-list-bulleted" to="/list">事項</v-btn>
        <v-btn prepend-icon="mdi-cog" to="/settings">設定</v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
      <!-- Component => 代指目前路由應該顯示的元件 -->
      <router-view v-slot="{ Component }">
        <!-- keep-alive => 保持被包住的元件不會被銷毀
             使用include指定只有index這個元件不被銷毀-->
        <keep-alive include="index">
          <!-- <component></component> 是動態元件
               is = 要使用的元件 -->
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>
