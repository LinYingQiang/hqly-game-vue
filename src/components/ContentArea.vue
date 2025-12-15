<template>
  <div class="content-area">
  <section class="category-block" v-for="cat in categories" :key="cat.categoryId || cat.name" :id="getId(cat)">
      <header class="cat-header">
        <div class="cat-left">
          <img v-if="cat.icon" :src="cat.icon" alt="" class="cat-icon" />
          <div class="cat-name">{{ cat.name }}</div>
        </div>
        <button class="cat-more" @click="onViewMore(cat)">更多</button>
      </header>

      <div class="games-grid">
        <div
          class="game-card"
          v-for="game in getGames(cat).slice(0, visibleFor(cat))"
          :key="(game.platformId ?? '') + '_' + (game.gameId ?? game.name)"
          @click="openGame(game)"
        >
          <img v-if="game.icon" :src="game.icon" alt="" class="game-icon" />
        </div>
      </div>

      <div class="cat-footer">
        <div class="total">共 {{ getGames(cat).length }} 款游戏</div>
        <button v-if="moreType" class="view-more" @click.prevent="loadMore(cat)">查看更多&nbsp;<svg width=".8rem" height=".8rem" fill="currentColor" class="" style="width: inherit; height: inherit;" viewBox="0 0 11.996 12.008">
  <path id="7b5aba40a3ed19db01202235ccc10e36-comm_icon_jzgd" d="M18645,17402a.534.534,0,0,1-.389-.141l-5.473-5.65a.5.5,0,0,1,0-.691.453.453,0,0,1,.67,0l5.191,5.34,5.182-5.34a.451.451,0,0,1,.668,0,.485.485,0,0,1,0,.691l-5.467,5.65a.549.549,0,0,1-.354.141Zm0-5.373a.479.479,0,0,1-.389-.15l-5.473-5.641a.5.5,0,0,1,0-.7.463.463,0,0,1,.67,0l5.191,5.34,5.182-5.34a.46.46,0,0,1,.668,0,.492.492,0,0,1,0,.7l-5.467,5.641a.489.489,0,0,1-.342.152Z" transform="translate(-18639 -17389.996)"></path>

</svg></button>
      <span v-else  class="view-more">已加载完成</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  categories: { type: Array, default: () => [] }
})

const moreType = ref(true)

function getId(cat) {
  if (!cat) return ''
  if (cat.categoryId !== undefined && cat.categoryId !== null) return `cat-${cat.categoryId}`
  // fallback: use encoded name
  return `cat-${encodeURIComponent(String(cat.name || ''))}`
}

const router = useRouter()

// 每个分类当前可见的游戏数量，初始为 6（2 行 x 3 列）
const visibleCounts = ref({})

function initVisibleCounts() {
  (props.categories || []).forEach(cat => {
    const id = cat.categoryId ?? cat.name
    if (!visibleCounts.value[id]) visibleCounts.value[id] = 6
  })
}

onMounted(() => initVisibleCounts())

watch(() => props.categories, () => {
  initVisibleCounts()
}, { deep: true })

function getGames(cat) {
  if (!cat || !Array.isArray(cat.platforms)) return []
  return cat.platforms.flatMap(p => (p.games || []).map(g => ({ ...g, platformId: p.platformId, platformName: p.name, platformIcon: p.icon })))
}

function visibleFor(cat) {
  const id = cat.categoryId ?? cat.name
  return visibleCounts.value[id] ?? 6
}

function loadMore(cat) {
  const id = cat.categoryId ?? cat.name
  const total = getGames(cat).length
  const current = visibleCounts.value[id] ?? 6
  // 每次增加 9
  visibleCounts.value[id] = Math.min(total, current + 9)
  // 如果当前可见数量等于总数，则隐藏查看更多按钮
  if (visibleCounts.value[id] === total) {
    moreType.value = false
  }
}

function onViewMore(cat) {
  // header 的更多仍然尝试进入分类页（如果存在），footer 的查看更多会加载更多
  try {
    router.push({ name: 'Category', query: { gameCategoryId: cat.categoryId, platformId: cat.platforms[0].platformId } })
  } catch (e) {
    console.log('view more', cat)
  }
}

function ensureUrl(url) {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  return 'https://' + url
}

function openGame(game) {
  const url = ensureUrl(game.toLink || game.link || '')
  const categoryUrl = game.toCategoryLink || ''
  if (categoryUrl) {
    router.push(categoryUrl)
    return
  }
  if (!url) return
  // 在新窗口打开
  window.open(url, '_blank')
}
</script>

<style scoped>
.content-area { padding: 0 0; }
.category-block { margin-bottom: 18px; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 12px; }
.cat-header { display:flex; align-items:center; justify-content:space-between; padding: 0 12px; }
.cat-left { display:flex; align-items:center; gap:8px; }
.cat-icon { width:2rem; height:2rem; object-fit:cover; border-radius:6px; }
.cat-name { color:#fff; font-weight:600; font-size:16px; }
.cat-more { background:transparent; border:none; color:#f0c059; font-weight:600; }

.games-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding: 12px; }
.game-card { display:flex; flex-direction:column; align-items:center; text-align:center; cursor: pointer;}
.game-icon { width:100%; height:auto; object-fit:cover; border-radius:8px; }
.game-title { margin-top:8px; color:#fff; font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%; }

.cat-footer { display:flex;flex-direction: column; align-items:center; justify-content:space-between; padding: 0 12px; margin-top:8px; }
.total { color: rgba(255,255,255,0.7); font-size:13px }
.view-more { background:transparent; color:#68707b; padding:6px 10px; border-radius:6px; font-size: .9rem;}

/* @media (max-width: 480px) {
  .game-icon { width:64px; height:64px }
} */
</style>
