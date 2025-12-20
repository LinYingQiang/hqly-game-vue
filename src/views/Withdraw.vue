<template>
  <div class="withdraw-page">
    <van-nav-bar left-arrow @click-left="onBack">
      <template #title>
        <div class="tabs">
          <button v-for="t in tabs" :key="t.key" :class="['tab', { active: active===t.key }]" @click="active = t.key">{{ t.label }}</button>
        </div>
      </template>
            <template #right>
        <span>
          <svg width="1.5rem" height="1.5rem" fill="#f0c059" class="" viewBox="0 0 40 40">
            <rect id="54205c265e589710c2470c9f2e84aea5-comomn_s_icon___60_60" data-name="comomn / s icon _ 60*60" width="40" height="40" opacity="0"></rect>
            <path id="54205c265e589710c2470c9f2e84aea5-icon_dt_1kf" d="M16.151,30.015A2.721,2.721,0,0,1,13.682,28.5h-2.4a4.541,4.541,0,0,1-4.643-4.421v-.735H6.2a1.365,1.365,0,0,1-1.4-1.329V11.878c0-.016.011-.027.019-.04A12.419,12.419,0,0,1,17.328,0,12.419,12.419,0,0,1,29.842,11.836a.08.08,0,0,1,.019.042V22.009a1.363,1.363,0,0,1-1.4,1.329H23.9a1.363,1.363,0,0,1-1.395-1.329v-8.89A1.363,1.363,0,0,1,23.9,11.789h2.578a9.165,9.165,0,0,0-18.3,0h2.578a1.363,1.363,0,0,1,1.4,1.329v8.89a1.363,1.363,0,0,1-1.4,1.329H8.879v.74a2.354,2.354,0,0,0,2.406,2.291h2.382a2.728,2.728,0,0,1,2.485-1.541h2.364a2.595,2.595,0,1,1,0,5.186Zm15.488-9.423V14.534a.508.508,0,0,1,.6-.493,2.923,2.923,0,0,1,2.426,2.826v1.391a2.923,2.923,0,0,1-2.426,2.826.5.5,0,0,1-.1.009.51.51,0,0,1-.506-.5Zm-29.215.493A2.923,2.923,0,0,1,0,18.259V16.869a2.923,2.923,0,0,1,2.426-2.827.508.508,0,0,1,.6.493v6.058a.506.506,0,0,1-.6.493Z" transform="translate(2.667 4.992)"></path>
          </svg>
        </span>
      </template>
    </van-nav-bar>

 

    <div class="content">
      <div v-if="active === 'apply'" class="apply">
        <TiXian/>
      </div>

      <div v-else-if="active === 'accounts'" class="accounts">
        <ShouKuan/>
      </div>

      <div v-else-if="active === 'history'" class="history">
        <div class="empty-wrap">
          <div class="empty-inner">
            <img :src="noneImg" alt="none" class="empty-img" />
            <div class="empty-text">暂无记录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import TiXian from '../components/withdraw/TiXian.vue'
import ShouKuan from '../components/withdraw/ShouKuan.vue'
// 导入静态资源
import noneImg from '@/assets/images/icon/none.avif'

const router = useRouter()
const user = useUserStore()

const tabs = [
  { key: 'apply', label: '申请提现' },
  { key: 'accounts', label: '收款账户' },
  { key: 'history', label: '提现记录' }
]
const active = ref('apply')
const spinning = ref(false)


function onBack() { router.back() }
function refreshBalance() {
  if (spinning.value) return
  spinning.value = true
  // simulate async refresh
  setTimeout(() => {
    // here you would call API to refresh balance; we keep same value
    spinning.value = false
  }, 800)
}

// simple guard: redirect to User (which handles auth popup) if not logged in
if (!user.loggedIn) {
  router.replace({ name: 'User' })
}
</script>

<style scoped>
.withdraw-page ::v-deep .van-nav-bar__title {
  margin-left: 1.5rem;
  width: 80%;
}
.tabs { display:flex; gap:.8rem; padding:8px 12px; border-bottom:1px solid rgba(255,255,255,0.03) }
.tab {font-size: .8rem; background:transparent; border:none; color:#cbd3db; padding:0 .2rem; position:relative }
.tab.active { color:#f0c059 }
.tab.active::after { content:''; position:absolute; left:6px; right:6px; height:3px; background:#f0c059; bottom:-8px }
.content { padding:12px }

.refresh { cursor:pointer }
.spin { animation: spin 0.8s linear infinite }
@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
.apply-body { margin-top:12px; background: rgba(29,31,36,0.6); padding:12px; border-radius:8px }
.note { color:#cbd3db }
.empty-wrap { display:flex; align-items:center; justify-content:center; height:60vh }
.empty-inner { text-align:center; color:#cbd3db }
.empty-img { width:96px; height:96px; object-fit:contain; opacity:0.9 }
.empty-text { margin-top:12px; font-size:16px; color:#fff }

</style>
