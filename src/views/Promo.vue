<template>
  <div class="promo-page" style="background: #202329;">
    <van-nav-bar
      left-text=""
      left-arrow
      @click-left="onBack"
      style="font-size: 2rem;"
    >
      <template #right>
        <div class="top-tabs">
          <button v-for="tab in tabs" :key="tab.key" :class="['top-tab', { active: activeTab === tab.key }]" @click="setTab(tab.key)">{{ tab.label }}</button>
        </div>
      </template>
    </van-nav-bar>

    <div class="promo-body">
      <component :is="activeComponent" :sections="sections" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tabs = [
  { key: 'activity', label: '活动' },
  { key: 'vip', label: 'VIP' },
  { key: 'rebate', label: '返水' },
  { key: 'claim', label: '待领取' },
  { key: 'history', label: '领取记录' }
]

const activeTab = ref('activity')
function setTab(k) { activeTab.value = k }

const sections = [
  { key: 'all', label: '全部' },
  { key: 'new', label: '新手' },
  { key: 'recharge', label: '充值返利' },
  { key: 'weekend', label: '周末活动' }
]
const selectedSection = ref('all')
function selectSection(k) { selectedSection.value = k }

// sample data for activity tab
const items = ref([
  { id: 1, section: 'all', title: '充值返利 10%', date: '2025-11-01 ~ 2025-11-30', desc: '活动说明：单次充值满100即享10%返利。' },
  { id: 2, section: 'new', title: '新手礼包', date: '长期有效', desc: '新注册用户可领取新手礼包，包含免费试玩和返水优惠。' },
  { id: 3, section: 'weekend', title: '周末加赠', date: '每周六日', desc: '周末充值可获得额外礼金，数量有限，先到先得。' },
  { id: 4, section: 'recharge', title: '连续充值奖励', date: '2025-11-01 ~ 2025-12-31', desc: '连续7日充值可获得专属奖励。' },
  { id: 5, section: 'all', title: 'VIP 专属活动', date: '长期', desc: 'VIP 专属更高返利和客服通道。' }
])

const filteredItems = computed(() => {
  if (activeTab.value !== 'activity') return [] // only implement activity now
  if (selectedSection.value === 'all') return items.value
  return items.value.filter(i => i.section === selectedSection.value)
})

// Map activeTab to component name
const activeComponent = computed(() => {
  switch (activeTab.value) {
    case 'activity': return defineAsyncComponent(() => import('/src/components/promo/ActivityContent.vue'))
    case 'vip': return defineAsyncComponent(() => import('/src/components/promo/VipContent.vue'))
    case 'rebate': return defineAsyncComponent(() => import('/src/components/promo/RebateContent.vue'))
    case 'claim': return defineAsyncComponent(() => import('/src/components/promo/ClaimContent.vue'))
  case 'history': return defineAsyncComponent(() => import('/src/components/promo/HistoryEmpty.vue'))
    default: return defineAsyncComponent(() => import('/src/components/promo/ActivityContent.vue'))
  }
})

function onBack() { router.back() }

onMounted(() => {
  // placeholder if need to fetch data
})
</script>

  <style scoped>
.promo-body { display:flex; height: calc(100vh - 56px); }
.side-nav { width: 120px; background: transparent; padding: 12px; border-right: 1px solid rgba(255,255,255,0.03); }
.side-nav ul { list-style:none; padding:0; margin:0 }
.van-nav-bar__right   {
    right: 60px!important;
}
.side-nav li { padding:10px; color:#cbd3db; cursor:pointer; border-radius:6px }
.side-nav li.active { background: rgba(240,192,89,0.12); color:#fff }
.promo-content { flex:1; padding:12px; overflow:hidden }
.content-scroll { height:100%; overflow-y:auto; padding-right:6px }
.activity-item { background: rgba(29,31,36,0.6); padding:12px; margin-bottom:10px; border-radius:8px; color:#fff }
.act-title { margin:0 0 6px 0 }
.act-meta { color: rgba(255,255,255,0.6); font-size:12px; margin-bottom:8px }
.act-desc { margin:0 0 8px 0 }
.act-actions { text-align:right }
.act-btn { background:#f0c059; color:#111; border:none; padding:6px 10px; border-radius:6px }
.top-tabs { display:flex; gap:8px;justify-content: first baseline; }
.top-tab { background:transparent; border:none; color:#fff; padding:6px 8px; position:relative }
.top-tab.active::after { content: ''; position:absolute; left:0; right:0; height:3px; background:#f0c059; bottom:-6px }

@media (max-width: 720px) {
  .promo-body { flex-direction: column }
  .side-nav { width:100%; display:flex; overflow:auto }
  .side-nav ul { display:flex; gap:8px }
}
</style>
