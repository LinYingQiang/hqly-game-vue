import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useZhaohuiStore = defineStore('zhaohui', () => {
  const groups = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchGroups() {
    loading.value = true
    error.value = null
    try {
      const url = new URL('../data/zhaohui.json', import.meta.url).href
      const res = await axios.get(url)
      groups.value = res.data && (res.data.data || res.data)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  function getAllGames() {
    return groups.value.flatMap(g => g.games || [])
  }

  return { groups, loading, error, fetchGroups, getAllGames }
})
