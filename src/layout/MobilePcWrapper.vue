<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAppStore } from '../store'

const store = useAppStore()
const isMobile = ref(false)

function detectMobile() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  const mobileUa = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua)
  const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches
  return mobileUa || coarse
}

function update() {
  isMobile.value = detectMobile()
  // keep store in sync
  try { store.setMobile(isMobile.value) } catch (e) { /* ignore if store not ready */ }
  // set html attributes so global CSS can apply "contain" layout on desktop
  try {
    const html = document.documentElement
    if (!isMobile.value) {
      html.setAttribute('data-ui-contain', '1')
      html.setAttribute('data-isdesktop', '1')
      // set dark theme attribute when app store has theme=dark
      try { if (store.theme === 'dark') html.setAttribute('data-theme', 'dark') } catch (e) {}
    } else {
      html.removeAttribute('data-ui-contain')
      html.removeAttribute('data-isdesktop')
      try { html.removeAttribute('data-theme') } catch (e) {}
    }
  } catch (e) { /* ignore when no DOM available */ }
}

let ro
onMounted(() => {
  update()
  window.addEventListener('resize', update)
  // optionally observe orientation changes
  window.addEventListener('orientationchange', update)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', update)
  window.removeEventListener('orientationchange', update)
  try {
    const html = document.documentElement
    html.removeAttribute('data-ui-contain')
    html.removeAttribute('data-isdesktop')
  } catch (e) { /* ignore */ }
})
</script>

<template>
  <div class="wrapper-root">
    <div v-if="isMobile" class="mobile-root">
      <slot />
    </div>
    <div v-else class="pc-root">
      <div class="pc-viewport">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper-root {
  height: 100%;
  width: 100%;
}
/* 移动端和PC端背景均为暗色 */
.mobile-root {
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  /* 防止键盘弹出时改变视口高度 */
  position: relative;
  background: #202329;
}
.pc-root {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #313843;
  overflow: hidden;
}
.pc-viewport {
  /* Portrait (9:16) container. Height limited by viewport. */
  height: 100vh;
  width: calc(100vh * 9 / 16); /* 根据高度计算宽度,保持9:16比例 */
  max-width: 100vw; /* 防止超出屏幕宽度 */
  background: #1d1f24;
  overflow: auto; /* 改为auto,允许内容滚动 */
  transform-origin: center center;
  position: relative;
  flex-shrink: 0; /* 防止在 flex 容器中收缩 */
  left: -50%;
  transform: translateX(50%);
  /* 移除 margin,使用 flex 布局已经居中 */
}

/* If viewport height would make width exceed window width, shrink to fit by using max-height */
/* @media (max-aspect-ratio: 9/16) {
  .pc-viewport {
    width: 100vw;
    height: calc(100vw * (16 / 9));
  }
} */

/* 确保子元素占满容器高度和宽度 */
.pc-viewport > * {
  min-height: 100%;
  width: 100%;
}

</style>
