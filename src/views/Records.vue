<template>
  <div class="records-page">
    <van-nav-bar left-arrow @click-left="onBack">我的记录</van-nav-bar>

    <div class="top-cats">
      <button v-for="c in cats" :key="c.key" :class="['cat-btn', { active: activeCat===c.key }]" @click="activeCat = c.key">{{ c.label }}</button>
    </div>

    <div class="filters">
      <select v-model="timeRange" class="filter">
        <option value="today">今日</option>
        <option value="yesterday">昨日</option>
      </select>

      <select v-model="major" class="filter">
        <option value="all">全部</option>
        <option value="vip">VIP奖励</option>
        <option value="deposit">充值</option>
        <option value="withdraw">提现</option>
      </select>

      <select v-model="minor" class="filter">
        <option value="all">全部明细</option>
        <option value="a">明细 A</option>
        <option value="b">明细 B</option>
      </select>
    </div>

    <div class="records-content">
      <div v-if="items.length===0" class="empty-wrap">
        <div class="empty-inner">
          <img :src="noneImg" alt="none" class="empty-img" />
          <div class="empty-text">暂无记录</div>
        </div>
      </div>
      <div v-else>
        <div v-for="it in items" :key="it.id" class="record-item">{{ it.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'

// 导入静态资源
import noneImg from '@/assets/images/icon/none.avif'

const router = useRouter()
const user = useUserStore()

const cats = [
  { key: 'detail', label: '账户明细' },
  { key: 'bet', label: '投注记录' },
  { key: 'report', label: '个人报表' }
]
const activeCat = ref('detail')
const timeRange = ref('today')
const major = ref('all')
const minor = ref('all')

// placeholder data; real data should come from API
const items = ref([])

function onBack() { router.back() }

// guard: if not logged in, redirect back to user page which will open auth popup if needed
if (!user.loggedIn) {
  router.replace({ name: 'User' })
}

</script>

<style scoped>
.top-cats { display:flex; gap:12px; padding:12px; border-bottom:1px solid rgba(255,255,255,0.03) }
.cat-btn { background:transparent; border:none; color:#cbd3db; padding:8px 6px; position:relative }
.cat-btn.active { color:#fff }
.cat-btn.active::after { content:''; position:absolute; left:6px; right:6px; height:3px; background:#f0c059; bottom:-8px }
.filters { display:flex; gap:8px; padding:12px }
.filter { background: rgba(29,31,36,0.6); color:#fff; border: none; padding:8px; border-radius:6px }
.records-content { padding:12px }
.empty-wrap { display:flex; align-items:center; justify-content:center; height:60vh }
.empty-inner { text-align:center; color:#cbd3db }
.empty-img { width:96px; height:96px; object-fit:contain; opacity:0.9 }
.empty-text { margin-top:12px; font-size:16px; color:#fff }
.record-item { padding:10px; border-bottom:1px solid rgba(255,255,255,0.03); color:#cbd3db }

@media (max-width:720px) {
  .top-cats { overflow:auto }
}
</style>
