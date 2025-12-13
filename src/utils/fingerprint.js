import FingerprintJS from '@fingerprintjs/fingerprintjs'

let fpPromise = null

/**
 * 初始化 FingerprintJS
 * @returns {Promise} FingerprintJS 实例的 Promise
 */
export function initFingerprint() {
  if (!fpPromise) {
    fpPromise = FingerprintJS.load()
  }
  return fpPromise
}

/**
 * 获取设备指纹 ID
 * @returns {Promise<string>} 设备指纹 ID
 */
export async function getFingerprint() {
  try {
    const fp = await initFingerprint()
    const result = await fp.get()
    return result.visitorId
  } catch (error) {
    console.error('获取设备指纹失败:', error)
    return null
  }
}

/**
 * 获取完整的设备指纹信息
 * @returns {Promise<Object>} 完整的指纹信息对象
 */
export async function getFingerprintDetails() {
  try {
    const fp = await initFingerprint()
    const result = await fp.get()
    return {
      visitorId: result.visitorId,
      confidence: result.confidence,
      components: result.components,
      visitorFound: result.visitorFound
    }
  } catch (error) {
    console.error('获取设备指纹详情失败:', error)
    return null
  }
}

