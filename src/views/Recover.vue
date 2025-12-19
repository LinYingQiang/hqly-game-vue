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
        <button :class="['cat', { active: selected === 'all' }]" @click="select('all')">
          <span>
            <svg width="2rem" height="2rem" :fill="selected === 'all' ?'var(--skin__leftnav_active)' : '#adb6c3'" class="recover-icon" style="width: inherit; height: inherit;" viewBox="0 0 100 76">
      <rect id="497f472c37fe9ad12ed396eb137e59da-底板" width="100" height="76" opacity="0"></rect>
      <path id="497f472c37fe9ad12ed396eb137e59da-icon_dtfl_zh_0-2" data-name="icon_dtfl_zh_0" d="M4.745,56.926A4.745,4.745,0,0,1,0,52.181V36.307a4.745,4.745,0,0,1,4.745-4.745H20.612a4.745,4.745,0,0,1,4.745,4.745V52.181a4.745,4.745,0,0,1-4.745,4.745ZM45.3,56.662h0s0,.017-5.156-.041a18.975,18.975,0,0,0,5.218-7.907,18.957,18.957,0,0,0,5.1,7.982c-5.158,0-5.158-.03-5.158-.03ZM50.53,50.3a10.157,10.157,0,0,1-5.115-5.2v.039a10.166,10.166,0,0,1-5.2,5.126,7.173,7.173,0,0,1-8.68-7.618c.195-5.912,7.421-8.436,14.009-15.99C52.016,34.3,59.206,36.938,59.3,42.831a7.333,7.333,0,0,1-7.115,7.732,5.164,5.164,0,0,1-1.668-.261ZM36.688,25.361a4.745,4.745,0,0,1-4.743-4.743V4.745A4.745,4.745,0,0,1,36.688,0H52.553A4.745,4.745,0,0,1,57.3,4.745V20.619a4.745,4.745,0,0,1-4.745,4.745Zm-31.945,0A4.745,4.745,0,0,1,0,20.619V4.745A4.745,4.745,0,0,1,4.745,0H20.612a4.745,4.745,0,0,1,4.745,4.745V20.619a4.745,4.745,0,0,1-4.745,4.745Z" transform="translate(20 10)" stroke-miterlimit="10" stroke-width="1"></path>
            </svg>
          </span>
          <span>全部</span>
    </button>
        <button v-for="g in groups" :key="g.id" :class="['cat', { active: selected === g.title }]" @click="select(g.title)">
          <span v-html="selected === g.title ? g.activeIcon : g.icon"></span>
          <span>{{ g.title }}</span>
        </button>
      </div>

      <div class="games-area">
        <div class="games-grid">
          <div v-for="game in filteredGames" :key="game.gameId" class="game-card">
            <div class="game-top">
              <img :src="game.gameIcon" alt="logo" class="game-logo" />
              <div class="game-name">{{ game.gameName }}</div>
            </div>
            <van-divider />
            <div class="game-bottom">{{ formatBalance(game.banlance) }}</div>
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
.recover-page ::v-deep .van-divider {
  margin: .1rem;
}
.recover-card { display:flex;font-size: .8rem; justify-content:space-between; align-items:center; padding:.4rem; background: #1c1e23; margin:12px; border-radius:8px }
.card-left { display:flex; flex-direction:column }
.current { font-size:.9rem; font-weight:700; color:#68707b; }
.note { font-size:.9rem; color:#68707b; margin-top:6px }
.card-right { display:flex }
.recover-btn { background:#f0c059; color:#111; padding:8px 14px; border-radius:8px; border:none }
.recover-icon {
  display: inline-block;
  widows: inherit;
  height: inherit;
  color:rgb(135, 68, 4); 
}
.recover-body { display:flex; gap:.1rem; padding:.4rem; flex-direction: row;}
.left-nav { width:6rem; display:flex; flex-direction:column; gap:.3rem }
.cat { 
  background:transparent;
  font-size: .9rem; border:none; 
  padding:.3rem .1rem; 
  width: 6rem;
  text-align:center; 
  color: #fff;
  border-radius:6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: .2rem;
}
.cat.active { 
  background: #efc05a;    
  color:rgb(135, 68, 4); 
}

.games-area { flex:1 }
.games-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:12px }
.game-card { background: rgba(29,31,36,0.6); padding:8px; border-radius:8px }
.game-top { display:flex; align-items:center; gap:8px }
.game-logo { width:2.5rem; height:2.5rem; object-fit:cover; border-radius:6px }
.game-name { font-size:1rem; color:#fff; font-weight:600 }
.game-bottom { margin-top:0; color:#cbd3db; font-size: .7rem; text-align: left;}


</style>
