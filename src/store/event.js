import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useEventStore = defineStore('event', () => {
  const groups = ref([]) // each group: { id, name, events: [...] }
  const loading = ref(false)
  const error = ref(null)

  async function fetchEvents(force = false) {
    if (groups.value && groups.value.length && !force) return groups.value
    loading.value = true
    error.value = null
    try {
      const url = new URL('../data/event.json', import.meta.url).href
      const res = await axios.get(url)
      groups.value = res.data && res.data.data ? res.data.data : res.data
      return groups.value
    } catch (e) {
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }

  function getGroupById(id) {
    return groups.value.find(g => String(g.id) === String(id)) || null
  }

  function getAllEvents() {
    return groups.value.flatMap(g => (g.events || []).map(e => ({ ...e, groupId: g.id })))
  }

  return { groups, loading, error, fetchEvents, getGroupById, getAllEvents }
})
