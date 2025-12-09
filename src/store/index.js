import { defineStore } from 'pinia'
import { ref } from 'vue'

// 简单的全局状态示例：主题与设备类型
export const useAppStore = defineStore('app', () => {
  const isMobile = ref(false)
  const theme = ref('dark')

  function setMobile(v) {
    isMobile.value = !!v
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { isMobile, theme, setMobile, toggleTheme }
})
