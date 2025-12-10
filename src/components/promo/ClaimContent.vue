<template>
  <div class="empty-wrap">
    <div class="empty-inner">
      <img :src="noneImg" alt="none" class="empty-img" />
      <div class="empty-text">暂无记录</div>
    </div>
  </div>
</template>

<script setup>
// 导入静态资源
import noneImg from '@/assets/images/icon/none.avif'
</script>

<style scoped>
.empty-wrap { width: 100%;height: 100%; display:flex; align-items:center; justify-content:center; height: calc(100vh - 56px); }
.empty-inner { text-align:center; color:#cbd3db }
.empty-img { width:96px; height:96px; object-fit:contain; opacity:0.9 }
.empty-text { margin-top:12px; font-size:16px; color:#fff }
</style>
