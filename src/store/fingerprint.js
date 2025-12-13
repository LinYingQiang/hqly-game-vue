import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFingerprint, getFingerprintDetails } from '@/utils/fingerprint'

/**
 * 设备指纹 Store
 * 用于管理和存储设备指纹信息
 */
export const useFingerprintStore = defineStore('fingerprint', () => {
  // 设备指纹 ID
  const visitorId = ref(null)
  
  // 是否正在加载
  const loading = ref(false)
  
  // 是否已初始化
  const initialized = ref(false)
  
  // 完整的指纹信息
  const fingerprintDetails = ref(null)

  /**
   * 初始化设备指纹
   * @param {boolean} force - 是否强制重新获取
   * @returns {Promise<string>} 设备指纹 ID
   */
  async function init(force = false) {
    // 如果已经初始化且不强制刷新,直接返回
    if (initialized.value && !force && visitorId.value) {
      return visitorId.value
    }

    loading.value = true
    try {
      const id = await getFingerprint()
      visitorId.value = id
      initialized.value = true
      
      // 存储到 localStorage 以便后续使用
      if (id) {
        localStorage.setItem('device_fingerprint', id)
      }
      
      return id
    } catch (error) {
      console.error('初始化设备指纹失败:', error)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * 获取完整的指纹详情
   * @returns {Promise<Object>} 指纹详情对象
   */
  async function getDetails() {
    loading.value = true
    try {
      const details = await getFingerprintDetails()
      fingerprintDetails.value = details
      if (details?.visitorId) {
        visitorId.value = details.visitorId
      }
      return details
    } catch (error) {
      console.error('获取指纹详情失败:', error)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * 从 localStorage 恢复指纹
   */
  function restoreFromStorage() {
    const stored = localStorage.getItem('device_fingerprint')
    if (stored) {
      visitorId.value = stored
      initialized.value = true
    }
  }

  /**
   * 清除指纹信息
   */
  function clear() {
    visitorId.value = null
    fingerprintDetails.value = null
    initialized.value = false
    localStorage.removeItem('device_fingerprint')
  }

  return {
    visitorId,
    loading,
    initialized,
    fingerprintDetails,
    init,
    getDetails,
    restoreFromStorage,
    clear
  }
})

