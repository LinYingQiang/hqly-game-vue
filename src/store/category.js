import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

/**
 * Category store
 * - fetchCategories(): loads data from src/data/category.json via axios
 *   using import.meta.url so it works under Vite dev/build.
 * - categories, loading, error are exposed as refs
 */
export const useCategoryStore = defineStore('category', () => {
	const categories = ref([])
	const loading = ref(false)
	const error = ref(null)

	async function fetchCategories(force = false) {
		if (categories.value && categories.value.length && !force) {
			return categories.value
		}

		loading.value = true
		error.value = null
		try {
			// Resolve the JSON file URL relative to this module so Vite serves it correctly
			const url = new URL('../data/category.json', import.meta.url).href
			// simulate network latency if desired (uncomment)
			// await new Promise(r => setTimeout(r, 200))
			const res = await axios.get(url)
			// support both `{ data: [...] }` (file) and direct array responses
			categories.value = res.data && res.data.data ? res.data.data : res.data
			return categories.value
		} catch (e) {
			error.value = e
			throw e
		} finally {
			loading.value = false
		}
	}

	function getById(id) {
		return categories.value ? categories.value.find(c => c.id === id) : null
	}

	return { categories, loading, error, fetchCategories, getById }
})