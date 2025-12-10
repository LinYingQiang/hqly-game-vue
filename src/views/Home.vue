<script setup>
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import BottomNav from '@/components/BottomNav.vue'
import SlidingMenu from '@/components/SlidingMenu.vue'
import NumberTicker from '@/components/NumberTicker.vue'
import ContentArea from '@/components/ContentArea.vue'
import AuthPopup from '@/components/AuthPopup.vue'
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store'
import {useCategoryStore} from '@/store/category'

// 导入静态资源
import downloadLogoImg from '@/assets/images/download_logo.avif'
import logoImg from '@/assets/images/logo.avif'
import swipImg from '@/assets/images/swip.avif'
import iconDtPmdImg from '@/assets/images/icon/icon_dt_pmd.avif'
import iconDt1xxImg from '@/assets/images/icon/icon_dt_1xx.avif'
import bgPatternTile from '@/assets/bg_pattern_tile.png'
import cjc1StyleBg from '@/assets/images/cjc1_style_1_bg.avif'
import CunKuan from "@/components/CunKuan.vue";

// CSS v-bind 需要的计算属性
const bgPatternTileUrl = computed(() => `url(${bgPatternTile})`)
const cjc1StyleBgUrl = computed(() => `url(${cjc1StyleBg})`)

const router = useRouter()
const user = useUserStore()
const app = useAppStore()
const category = useCategoryStore()

const showCunkuan = ref(false)

const showBanner = ref(true)
const menuOpen = ref(false)
const mainRef = computed(() => (app.isMobile ? 'body' : '.pc-viewport'))
const authOpen = ref(false)
const authMode = ref('login')

function openAuth(mode = 'login') {
  authMode.value = mode
  authOpen.value = true
}

function onAuthSuccess(payload) {
  // payload: { type: 'login'|'register', username }
  // you can show a toast or perform actions; user store is already updated by AuthPopup
  console.log('auth success', payload)
}

function onDeposit() { 
  if (!user.loggedIn) {
      authMode.value = 'login'
      authOpen.value = true
      return
  }
  showCunkuan.value = true 
}

function getId(cat) {
  if (!cat) return ''
  if (cat.categoryId !== undefined && cat.categoryId !== null) return `cat-${cat.categoryId}`
  return `cat-${encodeURIComponent(String(cat.name || ''))}`
}

function scrollToCategory(cat) {
  const id = getId(cat)
  if (!id) return
  const el = document.getElementById(id)
  if (el) {
    // smooth scroll into view within nearest scrollable container
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function onSelectCategory(cat) {
  // called when side menu emits selection
  menuOpen.value = false
  // delay to allow popup close animation (optional)
  setTimeout(() => scrollToCategory(cat), 120)
}

onMounted(() => {
    category.fetchCategories()
})

function closeBanner() {
  showBanner.value = false
  try { localStorage.setItem('downloadBannerHidden', '1') } catch (e) { /* ignore */ }
}

function download() {
  try {
    router.push({ name: 'Download' })
  } catch (e) {
    // fallback
  }
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function onLogin() {
  // demo login — in real app replace with real auth flow
  user.login('DemoUser', 256)
}

function onLogout() {
  user.logout()
}
</script>

<template>
  <div class="home-page" :class="{ 'has-banner': showBanner }">
    <div class="top-bar">
      <div v-if="showBanner" class="download-banner">
        <div class="left-group">
          <van-icon name="cross" class="close-icon" @click="closeBanner" size="20" />
          <div class="logo-wrap">
            <img class="app-logo" :src="downloadLogoImg" alt="app logo" />
          </div>
        </div>
        <button class="download-btn" @click="download">立即下载</button>
      </div>

      <!-- header -->
      <header class="site-header">
        <div style="display: flex;align-items: center;;">
          <button class="menu-btn" @click="toggleMenu" aria-label="菜单">
            <span class="iconfont">&#xe910;</span>
          </button>
          <img class="site-logo" :src="logoImg" alt="site logo" />
        </div>

        <div class="right-area">
          <template v-if="user.loggedIn">
            <span class="balance">余额: ¥{{ user.balance }}</span>
            <button class="deposit-btn" @click="router.push({ name: 'Deposit' })">存款</button>
            <button class="logout-btn" @click="onLogout">退出</button>
          </template>
          <template v-else>
            <button class="deposit-btn" @click="openAuth('login')">登录</button>
            <button class="register-btn" @click="openAuth('register')">注册</button>
          </template>
        </div>
      </header>
    </div>

    <main class="page home content">
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>
                <img :src="swipImg" class="swipe-image">
            </van-swipe-item>
        </van-swipe>
        <!-- 通知消息栏 -->
        <van-notice-bar
            style="font-size: 0.875rem;margin-top: 5px;"
            left-icon="volume-o"
            speed="100"
            text="🔱欢迎莅临全球顶级娱乐中心【AG娱乐】919.AG✨品质铸造，成就不凡 💎我们承诺：为客户提供最安全，最公平的博弈游戏，最优秀的服务，每日打码闯关，每日救援金，每周救援金，每月救援金，更多活动详情尽在优惠中心。✅牢记网址不迷路【官网：919.AG】和【备用网址：9191.AG】收藏并添加到桌面。"
        >
            <template #left-icon>
                <img :src="iconDtPmdImg" style="width: 1.3rem;height: auto;">
            </template>
            <template #right-icon>
                <img :src="iconDt1xxImg" style="width: 1.8rem;height: auto;">
            </template>
        </van-notice-bar>
        <!-- 菜单栏：一行横向可滑动，图上字下 -->
         <div class="category-menu">
           <div class="category-row">
             <div class="category-item" v-for="cat in category.categories" :key="cat.id || cat.name" @click="scrollToCategory(cat)">
               <img v-if="cat.icon" :src="cat.icon" alt="" class="cat-img" />
               <div class="cat-name">{{ cat.name }}</div>
             </div>
           </div>
         </div>
         <!-- 广告栏 -->
          <div class="ad-bar">
            <NumberTicker :start="8155511.11" :end="8855511.11" :duration="59000" />
          </div>
         
         <!-- 内容区：按分类展示游戏 -->
         <ContentArea :categories="category.categories" />
          <!-- 底部 -->
           <div class="content-area">

           </div>
    </main>

    <!-- 底部导航栏 -->
    <BottomNav  @onDeposit="onDeposit"></BottomNav>
    <CunKuan v-model:show="showCunkuan"></CunKuan>

    <!-- 左侧菜单栏 -->
  <van-popup v-if="mainRef" v-model:show="menuOpen" style="position: absolute;height: 90vh;width: auto; background: #1c1e23;" :overlay-style="{position: 'absolute'}" position="left" :teleport="mainRef" :close-on-click-overlay="true">
    <SlidingMenu :categories="category.categories" @select="onSelectCategory"></SlidingMenu>
  </van-popup>
  <AuthPopup v-model:show="authOpen" :initialMode="authMode" @success="onAuthSuccess" />

  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  width: 100%;
  background: #212328 v-bind(bgPatternTileUrl) repeat;
  box-sizing: border-box;
}
.ad-bar {
    width: 90%;
    height: 6rem;
    background: v-bind(cjc1StyleBgUrl) no-repeat center center / cover;
    background-size: contain;
    margin: .8rem 0;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    border-radius: 10px;
    width: 100%;
    margin-top: 20px;
    padding: 0 .3rem;
}
.swipe-image {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 10px;
}
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 120;
  background: #1d1f24;
}

/* PC端顶部栏居中,宽度跟随内容区域 */
@media (min-width: 769px) {
  .top-bar {
    width: calc(100vh * 9 / 16);
    max-width: 100vw;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
}
.download-banner {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  background: rgba(29,31,36,0.98);
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.download-banner .close-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 15px;
  margin-right: 8px;
  cursor: pointer;
}
.left-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
.download-banner .logo-wrap {
  display: flex;
  align-items: center;
}
.download-banner .app-logo {
  height: 34px;
  object-fit: contain;
  display: block;
}
.close-icon {
  color: #666666;
  cursor: pointer;
}

.download-banner .download-btn {
  background: #f0c059;
  color: #fff;
  border: none;
  padding: 1px 8px;
  border-radius: 6px;
  height: 3vh;
  cursor: pointer;
  white-space: nowrap;
  flex: 0  auto;
  margin: auto 0;
}
/* /* .home-page.has-banner .content {
  padding: calc(64px + 56px + 24px) 16px 0 16px;
} */
.home-page .content {
  padding: 0 .3rem 0 .3rem;
  /* 为顶部固定栏预留空间: 5vh(header) */
  padding-top: 5vh;
  /* 为底部导航预留空间 */
  padding-bottom: calc(70px + env(safe-area-inset-bottom));
  padding-bottom: calc(70px + constant(safe-area-inset-bottom));
  height: 100vh;
  overflow: auto;
  scrollbar-width: none; /* Firefox  */
}
/* 当有下载横幅时,增加额外的 padding-top */
.home-page.has-banner .content {
  padding-top: calc(5vh + 44px);
} 
.content::webkit-scrollbar {
  width: 0;
}
.site-header {
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  background: #1d1f24;
  color: #fff;
}
.site-header .menu-btn {
  background: transparent;
  border: none;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  margin: auto 0;
}
.site-logo {
  height: 2rem;
  object-fit: contain;
  margin-left: .8rem;
}
.right-area { display: flex; align-items: center; gap: 8px; font-size: 0.875rem; }
.balance { color: #f0c059; font-weight: 600; }
.deposit-btn, .login-btn, .register-btn, .logout-btn {
  background: transparent;
  color: #F0C059;
  border: 1px solid #F0C059;
  padding: .3rem 1.8rem;
  border-radius: 6px;
  font-size: 0.875rem;
}
.deposit-btn { background: #f0c059; color: #874404; border: none; }
.side-menu { padding: 16px; color: #fff; }
.side-menu h3 { margin: 0 0 12px 0; }
.side-menu ul { list-style: none; padding: 0; margin: 0; }
.side-menu li { padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); cursor: pointer; }
.page { box-sizing: border-box; height: 100%; width: 100%; }
/* .home { display:flex; flex-direction:column; align-items:center; justify-content:center; } */
button { margin-top: auto 0; }

/* 分类横向滚动栏 */
.category-menu {
  margin-top: 12px;
  overflow-x: auto;
}
.category-menu::-webkit-scrollbar {
    width: 0;  /* 隐藏垂直滚动条 */
    height: 0; /* 隐藏水平滚动条 */
}
.category-row {
  display: flex;
  gap: .23rem;
  padding: 8px 0;
}
.category-item {
  flex: 0 0 60px; /* 固定宽度，防止换行 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.cat-img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 8px;
}
.cat-name {
  margin-top: 6px;
  font-size: 0.75rem;
  color: #68707B;
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 隐藏默认滚动条（可选，保留触控滚动） */
.category-menu::-webkit-scrollbar { height: 6px; }
.category-menu::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 3px; }
</style>
