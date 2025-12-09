<template>
  <nav class="bottom-nav" :class="{ 'is-pc': isPc }">
    <div
      v-for="item in navItems"
      :key="item.name"
      :class="['nav-item', { active: $route.name === item.route }]"
      @click="goTo(item.route)"
    >
      <van-icon :name="item.icon" :color="$route.name === item.route ? activeColor : defaultColor" size="24" />
      <span :style="{ color: $route.name === item.route ? activeColor : defaultColor }">{{ item.label }}</span>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

const activeColor = '#FFD600'
const defaultColor = '#FFD600'

const navItems = [
  { name: 'home', label: '首页', icon: 'wap-home-o', route: 'Home' },
  { name: 'promo', label: '优惠', icon: 'point-gift-o', route: 'Promo' },
  { name: 'deposit', label: '存款', icon: 'pending-payment', route: 'Deposit' },
  { name: 'service', label: '客服', icon: 'service-o', route: 'MessageCenter' },
  { name: 'user', label: '我的', icon: 'user-o', route: 'User' },
]

const emit = defineEmits(['onDeposit'])

const isPc = ref(false)
function detectPc() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  return !(/Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua))
}
onMounted(() => {
  isPc.value = detectPc()
})

function goTo(routeName) {
  if (routeName === 'Deposit') {
    console.log('emit onDeposit')
    emit('onDeposit')
    return
  }
  if (route.name !== routeName) {
    router.push({ name: routeName })
  }
}
</script>

<style scoped>
/* 默认移动端全屏宽度 */
.bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* 使用固定高度 + 安全区域,避免 vh 在移动端的问题 */
  height: auto;
  min-height: 60px;
  background: #1d1f24;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.12);
  z-index: 100;
  width: 100%;
  /* 增加底部安全区域,确保不被浏览器工具栏遮挡 */
  padding: 8px 0;
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  /* 兼容旧版本的写法 */
  padding-bottom: calc(8px + constant(safe-area-inset-bottom));
}
/* PC 竖屏居中时,宽度跟随 .pc-viewport */
.bottom-nav.is-pc {
  /* PC端使用固定高度 */
  height: 8vh;
  padding: 0;
  padding-bottom: 0;
  /* 限制宽度为9:16比例 */
  width: calc(100vh * 9 / 16);
  max-width: 100vw;
  /* 居中显示 */
  left: 50%;
  right: auto;
  transform: translateX(-50%);
}
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    color: white;
    cursor: pointer;
    transition: color 0.2s;
  }
  .nav-item.active {
    color: #FFD600;
  }
</style>
