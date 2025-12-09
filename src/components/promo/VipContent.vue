
<template>
  <div class="vip-wrap">
    <!-- current level card -->
    <div class="vip-card">
      <div class="vip-badge">当前等级</div>
      <div class="vip-card-body">
        <div class="vip-left">
          <div class="level-circle">
            <img src="/src/assets/images/icon/style_1_vip_style0.avif" alt="level" />
            <img src="/src/assets/images/icon/style_1_vip_color1.avif" alt="level" />
          </div>
          <div class="level-text">
            <div class="line1">距离 <span style="color: red;font-weight: bold;">VIP1</span></div>
            <div class="line2">还需投注 60,000</div>
          </div>
        </div>
        <div class="vip-right">
          <button class="btn gray">一键领取</button>
          <button class="btn yellow">领取记录</button>
        </div>
      </div>
    </div>

    <!-- tabs for tables -->
    <div class="vip-tabs">
      <div class="tabs-row">
        <button v-for="t in tabs" :key="t.key" :class="['tab-item', { active: activeTab === t.key }]" @click="activeTab = t.key">{{ t.label }}</button>
      </div>

      <div class="table-wrap">
        <div class="table-header">
          <div v-for="h in currentTable.headers" :key="h" class="th">{{ h }}</div>
        </div>
        <div class="table-body">
          <div v-for="(row, idx) in currentTable.rows" :key="idx" class="tr">
            <div v-for="(cell, i) in row" :key="i" class="td">{{ cell }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- rules -->
    <div class="vip-rules">
      <h4>VIP 规则说明</h4>
      <p>1. VIP 等级根据累计投注量判定；2. 晋级奖金按等级发放；3. 保级要求以月度为单位计算。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = [
  { key: 'promote', label: '晋级奖金' },
  { key: 'weekly', label: '周俸禄' },
  { key: 'maintain', label: '保级要求' },
  { key: 'priv', label: 'Vip特权' }
]

const activeTab = ref('promote')

// sample table data
const tables = {
  promote: {
    headers: ['等级', '晋级奖金', '备注'],
    rows: [
      ['VIP1', '¥100', '首次晋级'],
      ['VIP2', '¥300', '继续累积'],
      ['VIP3', '¥800', '价值更高']
    ]
  },
  weekly: {
    headers: ['等级', '周俸禄', '条件'],
    rows: [
      ['VIP1', '¥50', '周投注≥5000'],
      ['VIP2', '¥150', '周投注≥20000'],
      ['VIP3', '¥400', '周投注≥50000']
    ]
  },
  maintain: {
    headers: ['等级', '保级要求', '说明'],
    rows: [
      ['VIP1', '月投注≥10000', '保级月度计算'],
      ['VIP2', '月投注≥30000', '保级月度计算'],
      ['VIP3', '月投注≥60000', '保级月度计算']
    ]
  },
  priv: {
    headers: ['等级', '特权', '描述'],
    rows: [
      ['VIP1', '专属活动', 'VIP 专属活动邀请'],
      ['VIP2', '专属客服', '优先客服通道'],
      ['VIP3', '更高返水', '专属返水比例']
    ]
  }
}

const currentTable = computed(() => tables[activeTab.value] || tables.promote)
</script>

<style scoped>
.vip-wrap { padding: 12px; color: #68707b;font-size: 1rem; }
.vip-card { background: linear-gradient(90deg,#2a2d31,#212326); border-radius: 12px; padding: 12px;padding-top: 1.4rem; position: relative; margin-bottom: 12px }
.vip-badge { position: absolute; left: 0px; top: -0.8rem; background:#ea4e3d; color:white; padding:.1rem .4rem; border-radius:12px 0 12px 0; font-weight:700 }
.vip-card-body { display:flex; align-items:center; justify-content:space-between }
.vip-left { display:flex; align-items:center; gap:12px }
.level-circle { width:64px; height:64px; border-radius:50%; overflow:hidden; background: #fff; display:flex; align-items:center; justify-content:center }
.level-circle img { width:64px; height:64px;position: absolute;display: block;}
.level-text {text-align: left;}
.level-text .line1 { font-size:14px; color:#cfcfcf }
.level-text .line2 { font-size:16px; color:#fff; font-weight:700 }
.vip-right { display:flex; flex-direction:column; gap:8px }
.btn { padding:8px 12px; border-radius:8px; border:none; cursor:pointer }
.btn.gray { background:#2b2d30; color:#cfcfcf }
.btn.yellow { background:#f0c059; color:#111; font-weight:700 }

.vip-tabs { margin-top: 12px }
.tabs-row { display:flex; gap:16px; margin-bottom:8px }
.tab-item { background:transparent; border:none; color:#cbd3db; padding:8px 6px; position:relative; cursor:pointer }
.tab-item.active { color:#fff }
.tab-item.active::after { content: ''; position:absolute; left:0; right:0; height:3px; background:#f0c059; bottom:-6px }

.table-wrap { border-radius:8px; overflow:hidden; background: rgba(29,31,36,0.6) }
.table-header { display:flex; background: rgba(0,0,0,0.12); padding:8px 12px }
.table-header .th { flex:1; font-weight:700 }
.table-body { max-height:240px; overflow:auto }
.tr { display:flex; padding:10px 12px; border-top:1px solid rgba(255,255,255,0.03) }
.td { flex:1 }

.vip-rules { margin-top:12px; background: rgba(0,0,0,0.12); padding:12px; border-radius:8px }

@media (max-width:720px) {
  .vip-card-body { flex-direction:column; align-items:flex-start }
  .vip-right { flex-direction:row }
}
</style>
