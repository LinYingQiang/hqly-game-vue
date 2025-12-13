/**
 * FingerprintJS 使用示例
 * 
 * 这个文件展示了如何在项目中使用设备指纹功能
 * 使用完成后可以删除此文件
 */

import { useFingerprintStore } from '@/store/fingerprint'
import { getFingerprint } from '@/utils/fingerprint'

// ============================================
// 示例 1: 在 Vue 组件中使用 (Composition API)
// ============================================
/*
<script setup>
import { onMounted, computed } from 'vue'
import { useFingerprintStore } from '@/store/fingerprint'

const fingerprintStore = useFingerprintStore()

// 获取设备指纹 ID
const deviceId = computed(() => fingerprintStore.visitorId)

onMounted(async () => {
  // 如果还没有初始化,可以手动初始化
  if (!fingerprintStore.initialized) {
    await fingerprintStore.init()
  }
  
  console.log('当前设备指纹:', deviceId.value)
})

// 在需要的时候使用设备指纹
async function submitForm() {
  const fingerprint = fingerprintStore.visitorId
  
  // 发送到后端
  await axios.post('/api/submit', {
    fingerprint: fingerprint,
    // ... 其他数据
  })
}
</script>
*/

// ============================================
// 示例 2: 在普通 JS 文件中使用
// ============================================
export async function exampleUsageInJS() {
  // 直接获取设备指纹
  const fingerprint = await getFingerprint()
  console.log('设备指纹:', fingerprint)
  
  return fingerprint
}

// ============================================
// 示例 3: 在 API 请求中自动添加设备指纹
// ============================================
export function setupAxiosInterceptor(axiosInstance) {
  // 在请求拦截器中自动添加设备指纹
  axiosInstance.interceptors.request.use(async (config) => {
    const fingerprintStore = useFingerprintStore()
    
    // 确保设备指纹已初始化
    if (!fingerprintStore.visitorId) {
      await fingerprintStore.init()
    }
    
    // 添加到请求头
    if (fingerprintStore.visitorId) {
      config.headers['X-Device-Fingerprint'] = fingerprintStore.visitorId
    }
    
    return config
  })
}

// ============================================
// 示例 4: 获取详细的设备信息
// ============================================
export async function getDeviceDetails() {
  const fingerprintStore = useFingerprintStore()
  const details = await fingerprintStore.getDetails()
  
  console.log('设备指纹详情:', {
    visitorId: details.visitorId,
    confidence: details.confidence,
    // components 包含了各种设备特征
    userAgent: details.components.userAgent,
    screenResolution: details.components.screenResolution,
    timezone: details.components.timezone,
    // ... 更多信息
  })
  
  return details
}

// ============================================
// 示例 5: 在路由守卫中使用
// ============================================
/*
// 在 router/index.js 中
import { useFingerprintStore } from '@/store/fingerprint'

router.beforeEach(async (to, from, next) => {
  const fingerprintStore = useFingerprintStore()
  
  // 确保设备指纹已初始化
  if (!fingerprintStore.initialized) {
    await fingerprintStore.init()
  }
  
  // 可以在这里做一些基于设备指纹的逻辑
  // 例如:设备黑名单检查、风险控制等
  
  next()
})
*/

