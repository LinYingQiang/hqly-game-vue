<template>
  <div class="recover-page">
    <van-nav-bar left-arrow @click-left="onBack" title="找回余额"></van-nav-bar>

    <div class="recover-card">
      <div class="card-left">
        <div class="current">当前余额：¥{{ totalBalance }}</div>
        <div class="note">只能找回余额的整数倍</div>
      </div>
      <div class="card-right">
        <button class="recover-btn">开始找回</button>
      </div>
    </div>

    <div class="recover-body">
      <div class="left-nav">
        <button :class="['cat', { active: selected === 'all' }]" @click="select('all')">全部</button>
        <button v-for="g in groups" :key="g.id" :class="['cat', { active: selected === g.title }]" @click="select(g.title)">{{ g.title }}</button>
      </div>

      <div class="games-area">
        <div class="games-grid">
          <div v-for="game in filteredGames" :key="game.gameId" class="game-card">
            <div class="game-top">
              <img :src="game.gameIcon" alt="logo" class="game-logo" />
              <div class="game-name">{{ game.gameName }}</div>
            </div>
            <van-divider />
            <div class="game-bottom">余额：¥{{ formatBalance(game.banlance) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useZhaohuiStore } from '../store/zhaohui'

const router = useRouter()
const store = useZhaohuiStore()
const selected = ref('all')

onMounted(async () => {
  if (!store.groups.length) await store.fetchGroups()
})

const groups = computed(() => store.groups)

const filteredGames = computed(() => {
  if (selected.value === 'all') return store.getAllGames()
  const g = store.groups.find(x => x.title === selected.value)
  return g ? (g.games || []) : []
})

const totalBalance = computed(() => {
  const sum = store.getAllGames().reduce((s, it) => s + Number(it.banlance || 0), 0)
  return sum.toFixed(2)
})

function onBack() { router.back() }
function select(key) { selected.value = key }
function formatBalance(v) { return Number(v || 0).toFixed(2) }

</script>

<style scoped>
.recover-page {background: #202329;}
.recover-card { display:flex; justify-content:space-between; align-items:center; padding:12px; background: #1c1e23; margin:12px; border-radius:8px }
.card-left { display:flex; flex-direction:column }
.current { font-size:1.2rem; font-weight:700; color:#68707b; }
.note { font-size:1.2rem; color:#68707b; margin-top:6px }
.card-right { display:flex }
.recover-btn { background:#f0c059; color:#111; padding:8px 14px; border-radius:8px; border:none }

.recover-body { display:flex; gap:12px; padding:12px }
.left-nav { width:80px; display:flex; flex-direction:column; gap:8px }
.cat { background:transparent;font-size: 1.1rem; border:none; padding:.6rem 1rem; text-align:center; color:#adb6c3; border-radius:6px }
.cat.active { background: #efc05a;  color: #874404;}

.games-area { flex:1 }
.games-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:12px }
.game-card { background: rgba(29,31,36,0.6); padding:8px; border-radius:8px }
.game-top { display:flex; align-items:center; gap:8px }
.game-logo { width:40px; height:40px; object-fit:cover; border-radius:6px }
.game-name { font-size:16px; color:#fff; font-weight:600 }
.game-bottom { margin-top:8px; color:#cbd3db }

@media (max-width:720px) {
  .recover-body { flex-direction:column }
  .left-nav { width:100%; flex-direction:row; overflow:auto }
  .games-grid { grid-template-columns: repeat(2, 1fr) }
}
</style>
