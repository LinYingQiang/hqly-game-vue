<script setup>
// App root simply renders the adaptive layout which in turn renders router views
import MobilePcWrapper from './layout/MobilePcWrapper.vue'
</script>

<template>
  <div id="app-root">
    <MobilePcWrapper>
      <router-view />
    </MobilePcWrapper>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #68707b;
}
html {
  /* 设置基准字体大小 - 移动端 */
  font-size: 16px;
}
/* PC端使用更大的基准字体,因为容器较小 */
html[data-isdesktop="1"] {
  font-size: 18px;
}
html body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  /* 防止iOS双击/手势缩放 */
  touch-action: manipulation;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  /* 移动端键盘弹出时保持固定高度 */
  position: fixed;
}
#app-root {
  width: 100%;
  height: 100%;
}

/* 确保 router-view 的容器不会影响布局 */
/* #app-root > * {
  width: 100%;
  height: 100%;
} */

/* 防止输入框聚焦时自动放大 - iOS Safari */
input[type="text"],
input[type="password"],
input[type="number"],
input[type="tel"],
input[type="email"],
input[type="search"],
textarea,
select {
  font-size: 16px !important;
  /* iOS 会在字体小于16px时自动放大 */
}


@font-face {
  font-family: 'iconfont';
  src: url('/src/assets/font_5du1nh9jled/iconfont.ttf') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}



</style>

<!-- local components imported via automatic component resolution or explicit import isn't required in script setup when using <router-view> inside -->
