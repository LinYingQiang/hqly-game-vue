<template>
  <div class="records-page">
    <van-nav-bar left-arrow @click-left="onBack">我的记录</van-nav-bar>

    <div class="top-cats">
      <button v-for="c in cats" :key="c.key" :class="['cat-btn', { active: activeCat===c.key }]" @click="activeCat = c.key">{{ c.label }}</button>
    </div>

    <div class="filters">
      <custom-dropdown 
      style="width: 6rem;"
      v-model="filterForm.date" 
      :options="dateOption"/>

      <custom-dropdown 
      style="width: auto;"
      v-model="filterForm.major" 
      :options="majorOptions"/>

      <custom-dropdown
      style="width: auto;"
      v-model="filterForm.minor"
      :options="minorOptions"/>
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
import CustomDropdown from '../components/CustomDropdown.vue'

// 导入静态资源
import noneImg from '@/assets/images/icon/none.avif'

const router = useRouter()
const user = useUserStore()
const filterForm = ref({
  date: 'today',
  major: 'all',
  minor: 'all'
})
const dateOption = [
  {label: "今日", value: "today"},
  {label: "昨日", value: "yesterday"}
]
const majorOptions = [
  {label: "全部", value: "all"},
  {label: "VIP奖励", value: "vip"},
  {label: "充值", value: "deposit"},
  {label: "提现", value: "withdraw"}
]
const minorOptions = [
  {label: "全部明细", value: "all"},
  {label: "明细 A", value: "a"},
  {label: "明细 B", value: "b"}
]

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

.custom-select {
  /* 圆角设置 */
  border-radius: 1rem;
  /* 暗调背景色 */
  background-color: rgb(28, 30, 35);
  color: #e2e8f0;
  /* 边框样式 */
  border: 1px solid #5a5f66;
  /* 内边距 */
  padding: .1rem .8rem;
  /* 字体 */
  font-size: .7rem;
  /* 光标样式 */
  cursor: pointer;
  /* 过渡效果 */
  transition: all 0.3s ease;
  /* 移除默认样式 */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  /* 添加下拉箭头 */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e2e8f0'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 1rem;
  padding-right: 2.5rem;
}

/* 悬停效果 */
.custom-select:hover {
  background-color: #1c1e23;
  border-color: #747880;
}

/* 聚焦效果 */
.custom-select:focus {
  outline: none;
  border-color: #5d9cec;
  box-shadow: 0 0 0 3px rgba(93, 156, 236, 0.2);
}
.custom-select option {
  background-color: #1c1e23;
  color: #e2e8f0;
  padding: 12px;
  font-size: 14px;
}

@media (max-width:720px) {
  .top-cats { overflow:auto }
}
</style>
