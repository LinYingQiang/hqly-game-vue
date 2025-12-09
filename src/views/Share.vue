<template>
  <div class="share-page" style="background: #202329;">
    <van-nav-bar left-arrow @click-left="onBack" title="分享赚钱"></van-nav-bar>

    <div class="agent-card">
      <div class="grid">
        <div class="cell">代理账号<div class="val">AG123456</div></div>
        <div class="cell">代理模式<div class="val">直属代理</div></div>
        <div class="cell">稽核倍数<div class="val">1x</div></div>
        <div class="cell">结算日期<div class="val">每月5日</div></div>
      </div>
    </div>

    <div class="invite-card">
      <div class="invite-head">
        <div class="title">邀请好友</div>
        <div class="code">邀请码：<span class="code-val">INV12345</span>
          <van-icon name="copy" color="#f0c059" class="copy-icon" @click="copyCode" />
        </div>
      </div>

      <div class="invite-body">
        <div class="left">
          <img :src="qrSrc" alt="qr" class="qr" />
          <button class="save-btn" @click="downloadQr">保存邀请码</button>
        </div>
        <div class="right">
          <div class="link-row">
            <div class="link">邀请链接：<span class="link-val">{{ inviteLink }}</span></div>
            <van-icon name="copy" color="#f0c059" class="copy-icon" @click="copyLink" />
          </div>

          <div class="apps">
            <div class="app" v-for="app in apps" :key="app.name">
              <img :src="app.icon" :alt="app.name" />
              <div class="app-name">{{ app.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const qrSrc = '/src/assets/images/download.png'
const inviteCode = 'INV12345'
const inviteLink = `https://example.com/register?code=${inviteCode}`

const apps = [
  { name: 'Wechat', icon: '/src/assets/images/icon/img_wx.png' },
  { name: 'QQ', icon: '/src/assets/images/icon/img_qq.png' },
  { name: 'Facebook', icon: '/src/assets/images/icon/img_facebook.png' },
  { name: 'Telegram', icon: '/src/assets/images/icon/img_tg.png' },
]

function onBack() { router.back() }

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    // optional feedback
    // console.log('copied')
  } catch (e) {
    // fallback
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
}

function copyCode() { copyText(inviteCode) }
function copyLink() { copyText(inviteLink) }

async function downloadQr() {
  try {
    const res = await fetch(qrSrc)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `invite-${inviteCode}.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  } catch (e) {
    console.error('download failed', e)
  }
}
</script>

<style scoped>

.agent-card { padding:12px }
.grid { display:grid; grid-template-columns: 1fr 1fr; gap:8px }
.cell { background: #1c1e23; padding:12px; border-radius:8px; color:#cbd3db ;font-size: 1.2rem;}
.cell .val { margin-top:8px; color:#fff; font-weight:700 }

.invite-card { margin:12px; background: #1c1e23; padding:12px; border-radius:8px ;font-size: .9rem;}
.invite-head { display:flex; justify-content:space-between; align-items:center }
.title { font-size:1rem; color:#fff }
.code { color:#cbd3db; display:flex; align-items:center; gap:8px }
.code-val { color:#fff; font-weight:700 }
.copy-icon { cursor:pointer }

.invite-body { display:flex; gap:12px; margin-top:12px; flex-direction: row;width: 100%; }
.left {flex: 2; width:100%; background: #fff; display:flex; flex-direction:column; align-items:center;padding-top: 5px;border-radius: 10px;overflow: hidden;}
.qr { width:8rem; height:auto; object-fit:contain;}
.save-btn { background:#f0c059;width:100%;height: 100%; color:#a6681d; border:none; padding:8px 8px; border-radius:0;font-size: 1.1rem;margin-top: 5px;}
.right { flex:3;width: 100%; display: flex; flex-direction: column; justify-content: space-between; align-items: center; overflow: hidden;}
.link-row {flex: 1; display:flex; align-items:center; gap:8px; color:#cbd3db ;padding: .1rem;}
.link-val { color:#fff; word-break:break-all }
.apps { display:flex; gap:.2rem; margin-top:1rem; overflow-y:auto; width: 100%;height: 100%; }
.app { width:72px; text-align:center }
.app img { width:48px; height:48px; object-fit:cover; border-radius:50%; }
.app-name { margin-top:6px; color:#cbd3db }

/* @media (max-width:720px) {
  .invite-body { flex-direction:column }
  .left { width:100%; align-items:center }
} */
</style>
