<template>
  <div class="withdraw-page">
    <van-nav-bar left-arrow @click-left="onBack">提现管理</van-nav-bar>

    <div class="tabs">
      <button v-for="t in tabs" :key="t.key" :class="['tab', { active: active===t.key }]" @click="active = t.key">{{ t.label }}</button>
    </div>

    <div class="content">
      <div v-if="active === 'apply'" class="apply">
        <div class="balance-row">
          <div class="bal-left">余额：¥{{ formattedBalance }}</div>
          <van-icon :name="spinning ? 'refresh' : 'refresh'" class="refresh" :class="{ spin: spinning }" @click="refreshBalance" color="#f0c059" />
        </div>
        <div class="apply-body">
          <!-- placeholder for withdraw form -->
          <div class="note">请输入提现金额（仅整数倍）</div>
        </div>
      </div>

      <div v-else-if="active === 'accounts'" class="accounts">
        <div class="empty-wrap">
          <div class="empty-inner">
            <img src="/src/assets/images/icon/none.avif" alt="none" class="empty-img" />
            <div class="empty-text">暂无收款账户</div>
          </div>
        </div>
      </div>

      <div v-else-if="active === 'history'" class="history">
        <div class="empty-wrap">
          <div class="empty-inner">
            <img src="/src/assets/images/icon/none.avif" alt="none" class="empty-img" />
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

const router = useRouter()
const user = useUserStore()

const tabs = [
  { key: 'apply', label: '申请提现' },
  { key: 'accounts', label: '收款账户' },
  { key: 'history', label: '提现记录' }
]
const active = ref('apply')
const spinning = ref(false)

const formattedBalance = computed(() => Number(user.balance || 0).toFixed(2))

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
.tabs { display:flex; gap:12px; padding:8px 12px; border-bottom:1px solid rgba(255,255,255,0.03) }
.tab {font-size: 1.3rem; background:transparent; border:none; color:#cbd3db; padding:8px 6px; position:relative }
.tab.active { color:#fff }
.tab.active::after { content:''; position:absolute; left:6px; right:6px; height:3px; background:#f0c059; bottom:-8px }
.content { padding:12px }
.balance-row { display:flex; align-items:center; justify-content:space-between; background: rgba(29,31,36,0.6); padding:12px; border-radius:8px }
.bal-left { font-size:1rem; font-weight:700 }
.refresh { cursor:pointer }
.spin { animation: spin 0.8s linear infinite }
@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
.apply-body { margin-top:12px; background: rgba(29,31,36,0.6); padding:12px; border-radius:8px }
.note { color:#cbd3db }
.empty-wrap { display:flex; align-items:center; justify-content:center; height:60vh }
.empty-inner { text-align:center; color:#cbd3db }
.empty-img { width:96px; height:96px; object-fit:contain; opacity:0.9 }
.empty-text { margin-top:12px; font-size:16px; color:#fff }

@media (max-width:720px) { .tabs { overflow:auto } }
</style>
