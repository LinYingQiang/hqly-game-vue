<template>
  <div class="message-page">
    <van-nav-bar left-arrow @click-left="onBack" class="top-bar" title="消息中心"></van-nav-bar>

    <div class="sub-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['sub-tab', { active: active === tab.key }]"
        @click="setTab(tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="content">
      <div v-if="active === 'kf'" class="panel">
        <div class="kf-card">
          <div class="kf-top">
            <img class="kf-avatar" :src="kfAvatarImg" alt="客服" />
            <div class="kf-text">
              <div class="kf-title">7×24在线客服</div>
              <div class="kf-sub">专业客服在线对话，为您解决遇到的问题。</div>
            </div>
          </div>
          <div class="kf-bottom">
            <button class="kf-btn" @click="openKf">在线客服</button>
          </div>
        </div>
      </div>
      <div v-else-if="active === 'announce'" class="panel">
          <div class="empty-wrap">
                <div class="empty-inner">
                <img :src="noneImg" alt="none" class="empty-img" />
                <div class="empty-text">暂无记录</div>
                </div>
            </div>
      </div>
      <div v-else-if="active === 'notice'" class="panel">
                  <div class="empty-wrap">
                <div class="empty-inner">
                <img :src="noneImg" alt="none" class="empty-img" />
                <div class="empty-text">暂无记录</div>
                </div>
            </div>
      </div>
      <div v-else-if="active === 'marquee'" class="panel">
                  <div class="empty-wrap">
                <div class="empty-inner">
                <img :src="noneImg" alt="none" class="empty-img" />
                <div class="empty-text">暂无记录</div>
                </div>
            </div>
      </div>
      <div v-else-if="active === 'feedback'" class="panel">
                  <div class="empty-wrap">
                <div class="empty-inner">
                <img :src="noneImg" alt="none" class="empty-img" />
                <div class="empty-text">暂无记录</div>
                </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 导入静态资源
import noneImg from '@/assets/images/icon/none.avif'
import kfAvatarImg from '@/assets/images/icon/img_kf_kf01.avif'

const router = useRouter()
const tabs = [
  { key: 'kf', label: '客服' },
  { key: 'announce', label: '公告' },
  { key: 'notice', label: '通知' },
  { key: 'marquee', label: '跑马灯' },
  { key: 'feedback', label: '有奖反馈' }
]
const active = ref('kf')
function setTab(k) { active.value = k }
function onBack() { router.back() }
function openKf() {
  // TODO: 链接到实际客服系统或聊天窗口
  window.open('', '_blank')
}
</script>

<style scoped>
.message-page {
  background: #202329!important;
}
.avatar {
    width: 55px;
    height: 55px;
}
.avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.empty-wrap {  width: 100%;  display:flex; align-items:center; justify-content:center; height: 80vh; }
.empty-inner { text-align:center; color:#cbd3db }
.empty-img { width:96px; height:96px; object-fit:contain; opacity:0.9 }
.empty-text { margin-top:12px; font-size:16px; color:#fff }
.message-page { display:flex; flex-direction:column; height:100vh; color:#fff; background:transparent }
.top-bar { font-size:18px }
.sub-tabs { display:flex;flex-direction: row;align-content: center;justify-content: space-between; gap:.3rem; padding:8px 12px; background:transparent; border-bottom:1px solid rgba(255,255,255,0.03); overflow-x:auto }
.sub-tab { background:transparent; border:none; color:#f1ffff; padding:.13rem .1rem; position:relative; font-size:.9rem; text-align:center }
.sub-tab.active { color:#f0c059 }
.sub-tab.active::after { content: ''; position:absolute; left:10px; right:10px; height:3px; background:#f0c059; bottom:-8px; border-radius:2px }
.content { padding:12px; flex:1; overflow:auto }
.panel { background: rgba(29,31,36,0.6); padding:12px; border-radius:8px; color:#fff }

.kf-card { display:flex; flex-direction:column; gap:12px; }
.kf-top { display:flex; gap:12px; align-items:center }
.kf-avatar { width:3rem; height:3rem; border-radius:8px; object-fit:cover }
.kf-text { display:flex; flex-direction:column;text-align: left; }
.kf-title { font-size:1.1rem; color:#fff }
.kf-sub { font-size:.9rem; color:#68707b; margin-top:6px; line-height:1.3 }
.kf-bottom { padding-left: 3rem;text-align: left; }
.kf-btn { background:#1c1e23; color:#f0c059; border:1px solid #f0c059; padding:.3rem 1.3rem; border-radius:6px; font-weight:600; cursor:pointer;font-size: .8rem; }

@media (max-width:720px) {
  .sub-tabs { gap:10px }
}
</style>
