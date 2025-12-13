<template>
  <div class="activity-wrap">
    <aside class="side-nav">
      <ul>
        <li v-for="s in sections" :key="s.key" :class="{ active: selectedSection === s.key }" @click="selectSection(s.key)">{{ s.label }}</li>
      </ul>
    </aside>

    <section class="activity-content">
      <div class="content-scroll">
        <div class="activity-item" v-for="item in filteredItems" :key="item.eventId || item.id">
          <div class="event-row">
            <img v-if="item.img" :src="item.img" alt="" class="event-img" />
            <!-- <div class="event-body">
              <h3 class="act-title">{{ item.name }}</h3>
              <div class="act-meta">模板: {{ item.templateId ?? '-' }}</div>
              <p class="act-desc">这里是活动简要描述（若有）。</p>
            </div> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useEventStore } from '/src/store/event'

const eventStore = useEventStore()

// groups from store: [{ id, name, events: [...] }]
const groups = computed(() => eventStore.groups)

const sections = computed(() => (groups.value || []).map(g => ({ key: String(g.id), label: g.name })))

const selectedSection = ref('')

onMounted(async () => {
  try {
    await eventStore.fetchEvents()
    if (groups.value && groups.value.length) {
      selectedSection.value = String(groups.value[0].id)
    }
  } catch (e) {
    // ignore load error for now
  }
})

watch(groups, (g) => {
  if ((!selectedSection.value || selectedSection.value === '') && g && g.length) {
    selectedSection.value = String(g[0].id)
  }
})

function selectSection(k) { selectedSection.value = String(k) }

const filteredItems = computed(() => {
  if (!selectedSection.value) return []
  const grp = groups.value.find(g => String(g.id) === String(selectedSection.value))
  return grp && Array.isArray(grp.events) ? grp.events : []
})
</script>

<style scoped>
.activity-wrap { display:flex; gap:12px;flex-direction: row; }
.side-nav { width: 100px; padding: .3rem .7rem;font-size: 1rem;; }
.side-nav ul { list-style:none; padding:0; margin:0 }
.side-nav li { padding:.5rem 1rem; color:#adb6c3; cursor:pointer; border-radius:6px;font-size: 1rem; }
.side-nav li.active { background: #efc05a; color:#874404 }
.activity-content { flex:1; padding:12px }
.content-scroll { height: calc(100vh - 130px); overflow-y:auto }
.activity-item { background: rgba(29,31,36,0.6); margin-bottom:8px; border-radius:8px; color:#fff }
.act-title { margin:0 0 6px 0 }
.act-meta { color: rgba(255,255,255,0.6); font-size:12px; margin-bottom:8px }
.act-desc { margin:0 0 8px 0 }
.act-actions { text-align:right }
.act-btn { background:#f0c059; color:#111; border:none; padding:6px 10px; border-radius:6px }
.event-img {width: 100%;height: auto;}

</style>
