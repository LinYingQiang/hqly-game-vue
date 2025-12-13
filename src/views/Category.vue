<template>
  <div class="category-page">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />

    <div class="category-container">
      <div class="search-wrap">
        <van-search v-model="query" placeholder="搜索游戏/平台" right-icon="search" left-icon="none" />
      </div>

      <div class="body">
        <aside class="platforms">
          <ul>
            <li
              v-for="p in platforms"
              :key="p.platformId ?? p.name"
              :class="{ active: p.platformId === selectedPlatform }
              "
              @click="selectPlatform(p.platformId)"
            >
              <img v-if="p.icon" :src="p.icon" alt="" class="plat-icon" />
              <div class="plat-name">{{ p.name }}</div>
            </li>
          </ul>
        </aside>

        <section class="games">
          <div class="games-grid">
            <div
              class="game-card"
              v-for="g in games"
              :key="(g.platformId ?? '') + '_' + (g.gameId ?? g.name)"
              @click="openGame(g)"
            >
              <img v-if="g.icon" :src="g.icon" alt="" class="game-icon" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCategoryStore } from '/src/store/category'

const route = useRoute()
const router = useRouter()
const categoryId = route.query.gameCategoryId || 0

const categoryStore = useCategoryStore()
const query = ref('')
const selectedPlatform = ref(0)
const games = ref([])

const title = ref('')

onMounted(async () => {
  await categoryStore.fetchCategories()
  // default select first platform if any
  const cat = categoryStore.getById(Number(categoryId)) || categoryStore.categories[0]
  console.log(cat, categoryId)
    title.value = cat ? cat.name : '分类列表'
  if (cat && Array.isArray(cat.platforms) && cat.platforms.length) {
    selectedPlatform.value = parseInt(route.query.platformId) || cat.platforms[0].platformId
  }
  filteredGames()
})

watch(() => route.query.platformId, () => {
  console.log('platformId changed', route.query.platformId)
  selectedPlatform.value = parseInt(route.query.platformId) || 0
  filteredGames()
})

const currentCategory = computed(() => {
  return categoryStore.getById(Number(categoryId)) || categoryStore.categories.find(c => String(c.categoryId) === String(categoryId))
})

const platforms = computed(() => (currentCategory.value && currentCategory.value.platforms) || [])

function flattenGames() {
  if (!currentCategory.value || !Array.isArray(currentCategory.value.platforms)) return []
  return currentCategory.value.platforms.flatMap(p => (p.games || []).map(g => ({ ...g, platformId: p.platformId })))
}

const filteredGames = () => {
  const all = flattenGames()
  let list = all
  if (selectedPlatform.value !== null && selectedPlatform.value !== undefined) {
    list = all.filter(g => g.platformId === selectedPlatform.value)
  }
  if (query.value && query.value.trim()) {
    const q = query.value.trim().toLowerCase()
    list = list.filter(g => (g.name || '').toLowerCase().includes(q))
  }
  games.value = list
  console.log('filteredGames', list)
}

function selectPlatform(id) {
  router.push({name: 'Category', query: { ...route.query, platformId: id } })
  selectPlatform.value = id
  filteredGames()
}

function ensureUrl(url) {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  return 'https://' + url
}

function openGame(game) {
  const url = ensureUrl(game.toLink || game.link || '')
  if (url) window.open(url, '_blank')
}

function onBack() { router.push('/') }
</script>

<style scoped>
.category-container { padding: .5rem; }
.search-wrap { padding: 8px 0; }
.search-wrap ::v-deep .van-field__right-icon { color: #f0c059!important; }
.body { display:flex; gap: .5rem; flex-direction: row;}
.platforms { width: 4.5rem; background: transparent; }
.platforms ul { list-style:none; padding:0; margin:0; }
.platforms li { padding:.15rem; display:flex;flex-direction: column; align-items:center; gap:0; cursor:pointer; border-radius:8px; color:#fff }
.platforms li.active { background: rgb(239, 192, 90); }
.plat-icon { width:1.5rem; height:1.5rem; object-fit:cover; border-radius:4px }
.plat-name { font-size:13px }
.games { flex:1 }
.games-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.game-card { display:flex; flex-direction:column; align-items:center; text-align:center; cursor:pointer }
.game-icon { width:100%; height:auto; object-fit:cover; border-radius:8px }
.game-title { margin-top:8px; color:#fff; font-size:1rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis }


</style>
