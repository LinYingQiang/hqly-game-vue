<template>
  <div class="user-page">
    <van-nav-bar left-arrow @click-left="onBack">
      <template #right>
        <span>
          <svg width="1.5rem" height="1.5rem" fill="#f0c059" class="" viewBox="0 0 40 40">
            <rect id="54205c265e589710c2470c9f2e84aea5-comomn_s_icon___60_60" data-name="comomn / s icon _ 60*60" width="40" height="40" opacity="0"></rect>
            <path id="54205c265e589710c2470c9f2e84aea5-icon_dt_1kf" d="M16.151,30.015A2.721,2.721,0,0,1,13.682,28.5h-2.4a4.541,4.541,0,0,1-4.643-4.421v-.735H6.2a1.365,1.365,0,0,1-1.4-1.329V11.878c0-.016.011-.027.019-.04A12.419,12.419,0,0,1,17.328,0,12.419,12.419,0,0,1,29.842,11.836a.08.08,0,0,1,.019.042V22.009a1.363,1.363,0,0,1-1.4,1.329H23.9a1.363,1.363,0,0,1-1.395-1.329v-8.89A1.363,1.363,0,0,1,23.9,11.789h2.578a9.165,9.165,0,0,0-18.3,0h2.578a1.363,1.363,0,0,1,1.4,1.329v8.89a1.363,1.363,0,0,1-1.4,1.329H8.879v.74a2.354,2.354,0,0,0,2.406,2.291h2.382a2.728,2.728,0,0,1,2.485-1.541h2.364a2.595,2.595,0,1,1,0,5.186Zm15.488-9.423V14.534a.508.508,0,0,1,.6-.493,2.923,2.923,0,0,1,2.426,2.826v1.391a2.923,2.923,0,0,1-2.426,2.826.5.5,0,0,1-.1.009.51.51,0,0,1-.506-.5Zm-29.215.493A2.923,2.923,0,0,1,0,18.259V16.869a2.923,2.923,0,0,1,2.426-2.827.508.508,0,0,1,.6.493v6.058a.506.506,0,0,1-.6.493Z" transform="translate(2.667 4.992)"></path>
          </svg>
        </span>
        <span style="margin-left: .8rem;">
          <svg width="1.5rem" height="1.5rem" fill="#f0c059" class="" viewBox="0 0 40 40">
            <rect id="70e90dcc2b3a442cee5dffef640f0ae2-comomn_m_icon___60_60" data-name="comomn / m icon _ 60*60" width="40" height="40" opacity="0"></rect>
            <path id="70e90dcc2b3a442cee5dffef640f0ae2-路径_16899" data-name="路径 16899" d="M15.334,30.667A15.333,15.333,0,0,1,4.491,4.491,15.333,15.333,0,0,1,30.667,15.334a15.193,15.193,0,0,1-3.128,9.282c.692,1.029,1.754,2.938,1.092,4.144a1.289,1.289,0,0,1-1.237.612,8.926,8.926,0,0,1-3.6-1.247A15.263,15.263,0,0,1,15.334,30.667Zm7.893-18a2.76,2.76,0,1,0,2.76,2.76A2.763,2.763,0,0,0,23.227,12.667Zm-7.893,0a2.76,2.76,0,1,0,2.76,2.76A2.763,2.763,0,0,0,15.334,12.667Zm-7.907,0a2.76,2.76,0,1,0,2.76,2.76A2.763,2.763,0,0,0,7.427,12.667Z" transform="translate(4.667 4.667)"></path>
          </svg>
        </span>
      </template>
    </van-nav-bar>

    <AuthPopup v-model:show="showAuth" :initialMode="authMode" @success="onAuthSuccess" />
    
    <CunKuan v-model:show="showCunkuan"></CunKuan>

    <div class="user-card">
      <img class="avatar" :class="{ 'logged-in': user.loggedIn }" :src="avatarSrc" alt="avatar" />
      <div class="user-info">
        <template v-if="!user.loggedIn">
          <div class="hint">请先登录或注册</div>
        </template>
        <template v-else>
          <div class="username">{{ user.username }}<CopyIcon 
            color="#f0c059"
            style="width: 1rem; height: 1rem; color: #f0c059; cursor: pointer; margin-left: .3rem;display: inline;" 
            @click="() => { 
              navigator.clipboard.writeText(userId); 
              van.Toast.success('用户ID已复制到剪贴板'); 
            }"
          />
          </div>
          <div class="meta">ID: {{ userId }} <CopyIcon 
            color="#f0c059"
            style="width: 1rem; height: 1rem; color: #f0c059; cursor: pointer; margin-left: .3rem;display: inline;" 
            @click="() => { 
              navigator.clipboard.writeText(userId); 
              van.Toast.success('用户ID已复制到剪贴板'); 
            }"
          /><span class="sep">|</span>             
            <div class="banlance">
                <img :src="cnyIcon" class="yue-icon">
                <span class="number">0.00</span>
                <span class="iconfont" style="font-size: 0.8125rem;color: #f0c059;cursor: pointer;">&#xe644;</span>
            </div>
          </div>
        </template>
      </div>
      <div class="auth-actions">
        <template v-if="!user.loggedIn">
          <button class="btn login" @click="doLogin">登录</button>
          <button class="btn register" @click="doRegister">注册</button>
        </template>
        <template v-else>
        </template>
      </div>
    </div>

    <div class="quick-actions">
      <div class="qa-item" @click="onWithdraw">
        <van-icon name="coupon" style="font-size: 1.6rem;color: #f0c059;"/><div class="qa-label">提现</div>
      </div>
      <div class="qa-item" @click="onDeposit">
        <!-- <van-icon name="pending-payment" style="font-size: 1.6rem;color: #f0c059;" /> -->
        <img :src="cunkuanImg" style="width: 1.6rem; height: 1.6rem;" alt="cunkuan" />
        <div class="qa-label">存款</div>
      </div>
    </div>

    <div v-if="user.loggedIn" class="vip-section" >
      <div class="vip-card">
        <img class="vip-bg" :src="vipBgdwImg" alt="vip" />
        <div class="vip-left">
          <div class="vip-icon">0</div>
          <div class="g-container">
              <div class="g-progress">0.00/6000.00</div>
          </div>
        </div>
        <div class="vip-right" style="width: 60%;">
          <div style="font-size: 1rem;flex: 4;align-items: center;">晋级奖金：8.00</div>
          <div style="font-size: .9rem;flex: 2;">晋级VIP需再投注6000.00</div>
        </div>
      </div>
    </div>

    <div class="cells">
      <van-cell-group  :border="false" style="background: none;border: none;">
        <van-cell :border="false" is-link @click="goTo('recover')">
          <template #icon>
            <van-icon name="search" color="#f0c059" />
          </template>
          <template #title>找回余额</template>
        </van-cell>
        <van-cell :border="false" is-link @click="goTo('records')" value="明细、投注、报表">
          <template #icon>
            <van-icon name="records-o" color="#f0c059" />
          </template>
          <template #title>我的记录</template>
        </van-cell>
        <van-cell :border="false" is-link @click="goTo('withdraw-manage')">
          <template #icon>
            <van-icon name="pending-payment" color="#ea4e3d" />
          </template>
          <template #title>提现管理</template>
        </van-cell>
      </van-cell-group>

      <van-cell-group :border="false" style="margin-top:18px;background: none;border: none;">
        <van-cell :border="false" is-link @click="goTo('Share')">
          <template #icon>
            <van-icon name="share-o" color="#f0c059" />
          </template>
          <template #title>分享赚钱</template>
          <template #value>
            <span style="font-size: 1.1rem;color: #f0c059;">月入百万</span>
          </template>
        </van-cell>

        <van-cell :border="false" is-link @click="goTo('MessageCenter')">
          <template #icon>
            <van-icon name="question-o" color="#f0c059" />
          </template>
          <template #title>常见问题</template>
        </van-cell>
        <van-cell is-link @click="goTo('MessageCenter')">
          <template #icon>
            <van-icon name="records-o" color="#f0c059" />
          </template>
          <template #title>有奖反馈</template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- BottomNav is global; keep page scrollable above it -->
         <!-- 底部导航栏 -->
    <BottomNav @onDeposit="onDeposit"></BottomNav>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import AuthPopup from '../components/AuthPopup.vue'
import BottomNav from '@/components/BottomNav.vue'
import CunKuan from '../components/CunKuan.vue'
import { Copy as CopyIcon } from 'lucide-vue-next';

// 导入静态资源
import cunkuanImg from '@/assets/images/icon/gif_profile_style1.webp'
import cnyIcon from '@/assets/images/icon/CNY.avif'
import headerImg from '@/assets/images/header.avif'
import iconWdMrtxImg from '@/assets/images/icon/icon_wd_mrtx.avif'
import vipColor1Img from '@/assets/images/icon/style_1_vip_color1.avif'
import vipBgdwImg from '@/assets/images/vip_bgdw.avif'
import userBgImg from '@/assets/images/user_bg.jpg'

// CSS v-bind 需要的计算属性
const vipColor1ImgUrl = computed(() => `url(${vipColor1Img})`)
const userBg = computed(() => `url(${userBgImg})`)

const router = useRouter()
const user = useUserStore()

const avatarSrc = computed(() => {
  return user.loggedIn ? headerImg : iconWdMrtxImg
})

const showAuth = ref(false)
const showCunkuan = ref(false)
const authMode = ref('login')
const pendingRoute = ref(null)

const formattedBalance = computed(() => (Number(user.balance || 0).toFixed(2)))
// assumption: user id placeholder
const userId = computed(() => user.loggedIn ? '10001' : '')

function onBack() { router.back() }
function doLogin() {
  authMode.value = 'login'
  showAuth.value = true
}
function doRegister() {
  authMode.value = 'register'
  showAuth.value = true
}
function onAuthSuccess(payload) {
  // AuthPopup already logged in the user via store; close popup
  showAuth.value = false
  // if there was a pending route (user tried to access a page), navigate now
  if (pendingRoute.value && user.loggedIn) {
    router.push(pendingRoute.value)
    pendingRoute.value = null
  }
}
function doLogout() { user.logout() }

function onWithdraw() { 
  if (!user.loggedIn) {
      authMode.value = 'login'
      showAuth.value = true
      return
  }
  router.push({ name: 'Withdraw' })
}
function onDeposit() { 
  if (!user.loggedIn) {
      authMode.value = 'login'
      showAuth.value = true
      return
  }
  showCunkuan.value = true 
}

function goTo(key) {
  if (key === 'recover' || key === 'records' || key === 'withdraw-manage') {
    let target = { name: 'Recover' }
    if (key === 'records') target = { name: 'Records' }
    if (key === 'withdraw-manage') target = { name: 'Withdraw' }
    if (!user.loggedIn) {
      // prompt login, then navigate on success
      pendingRoute.value = target
      authMode.value = 'login'
      showAuth.value = true
      return
    }
    router.push(target)
    return
  }
  router.push({ name: key })
  // placeholder for other keys
  console.log('go to', key)
}
</script>

<style scoped>
.user-page {
  /* 为底部导航预留空间,包含安全区域 */
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
  padding-bottom: calc(1rem + constant(safe-area-inset-bottom));
  color:#fff;
  background: #1e2126;
  background-image: v-bind(userBg);
  background-size: 100% 20rem;
  background-repeat: no-repeat;
  background-position: top center;
}
.user-page ::v-deep .van-nav-bar__content {
  height: 2rem;
  border: none;
  background: rgba(0, 0, 0, 0);
}
.user-page ::v-deep .van-nav-bar {
  background: rgba(0, 0, 0, 0);
}
.user-page ::v-deep .van-hairline--bottom:after {
  border: none;
}
.user-card { display:flex; align-items:center; padding:0 .3rem; gap:.2rem; 
  background: rgba(29,31,36,0); 
  border-radius:8px; margin:12px }
.avatar { width:3rem; height:3rem; border-radius:8px; object-fit:cover }
.user-info { flex: 0 0 auto }
.hint { font-size:1rem; color:#cbd3db;}
.username { font-size:.9rem;text-align: left;color: #fff; }
.meta { font-size:1rem; color:#fff; margin-top:6px; display: flex; align-items: center; }
.sep { margin:0 8px; color:#cbd3db }
.auth-actions { display:flex; gap:8px; margin-left: auto }
.btn { padding:8px 12px; border-radius:6px; font-weight:600; font-size:0.875rem; }
.btn.login { background:#f0c059; color:#111; border:none }
.btn.register { background:transparent; color:#f0c059; border:1px solid #f0c059 }
.btn.logout { background:transparent; color:#cbd3db; border:1px solid rgba(255,255,255,0.06) }
.logged-in { border-radius: 50%; }
.quick-actions { display:flex; justify-content:space-around; padding:0 12px }
.qa-item { display:flex; flex-direction:column; align-items:center; gap:8px }
.qa-label { font-size:0.875rem; color:#cbd3db }
.vip-card { 
  background: #f0c059;
  padding:12px; 
  border-radius:8px; 
  height: 100px;
  margin:12px; 
  color:#111; 
  display:flex; 
  justify-content:space-between;
  align-items:center;
  position: relative;
}
.vip-left,.vip-right {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.vip-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.g-container {
  margin-top: 6px;
  width: 100%;
  height: 1rem;
  border-radius: 25px;
  background: rgba(0, 0, 0, .1);
  text-align: center;
  line-height: 1rem;
}
.g-progress {
    width: 100%;
    height: inherit;
    border-radius: 25px 0 0 25px;
    text-align: center;
    line-height: 1rem;
    font-size: .9rem;
}

.vip-icon {
  width: 3rem;
  height: 3rem;
  background: v-bind(vipColor1ImgUrl) no-repeat center center / 100% 100%;
  text-align: center;
  align-items: center;
  line-height: 3rem;
  font-size: 1.375rem;
  color: #f0c059;
}

.cells { padding:12px }

/* ensure cell title left aligned and icon spacing for this page */
.cells ::v-deep .van-cell__title { text-align: left; font-size: 1rem ;color: #ffffff;margin-left: 10px;}
.cells ::v-deep .van-cell__icon { margin-right: 10px; display:inline-flex; align-items:center }
.cells ::v-deep .van-icon { font-size: 1.3rem; }

</style>
