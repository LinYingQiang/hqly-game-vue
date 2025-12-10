<template>
  <van-popup position="bottom" v-model:show="showLocal" :style="{height: '90vh', padding: '16px'}" :overlay="true">
    <van-nav-bar left-arrow @click-left="close" title="存款"></van-nav-bar>
    <div class="cunkuan-header">
        <div>支付方式</div>
        <div class="banlance">
            <img :src="cnyIcon" class="yue-icon">
            <span>0.00</span>
            <span class="iconfont" style="font-size: 0.8125rem;color: #f0c059;cursor: pointer;">&#xe644;</span>
        </div>
    </div>
    <div class="top-cats">
      <button :class="['cat-btn', { active: activeCat==='online' }]" @click="activeCat = 'online'">
        <span class="iconfont"  style="font-size: 0.8125rem;color: #f0c059;cursor: pointer;">&#xe6b8;</span>&nbsp;在线存款
    </button>
    <button :class="['cat-btn', { active: activeCat==='zhuanzhang' }]" @click="activeCat = 'zhuanzhang'">
        <span class="iconfont"  style="font-size: 0.8125rem;color: #f0c059;cursor: pointer;">&#xe67c;</span>&nbsp;转账存款
    </button>
    </div>

    <div v-if="activeCat==='online'">
        <!-- 在线存款内容 -->
        <div class="pay-list">
            <div v-for="pay in payList" :key="pay.id" :class="currentPay === pay.id ? 'active': ''" class="pay-item" @click="currentPay = pay.id">
                <img :src="pay.icon" class="pay-icon" />
                <div :style="currentPay === pay.id ? 'color: #f0c059;': 'color: #ffff;'">{{ pay.name }}</div>
            </div>
        </div>
        <div style="text-align: left;font-size: 1rem;color: #fff;">存款金额</div>
        <van-field
            v-model="value1"
            label=""
            style="border: 1px solid #f0c059;border-radius: 10px;font-size: 0.875rem;color: #f0c059;margin-top: 6px;"
            placeholder="最低100~最高1,000,000"
        >
            <template #left-icon>
                <span name="balance-o" style="font-size: 1.0625rem;color: #f0c059;">￥</span>
            </template>
        </van-field>
    </div>
    <div v-else-if="activeCat==='zhuanzhang'">
        <!-- 转账存款内容 -->
        <div class="pay-list">
            <div class="pay-item active">
                <img :src="xnbIcon" class="pay-icon" />
                <div style="color: #f0c059;">虚拟币</div>
            </div>
        </div>
        <div style="text-align: left;font-size: 1rem;color: #fff;">存款金额</div>
        <van-field
            v-model="value1"
            label=""
            style="border: 1px solid #f0c059;border-radius: 10px;font-size: 0.875rem;color: #f0c059;margin-top: 6px;"
            placeholder="最低100~最高1,000,000"
        >
            <template #left-icon>
                <span name="balance-o" style="font-size: 1.0625rem;color: #f0c059;">￥</span>
            </template>
        </van-field>
    </div>
    <button style="background: #f0c059;color: #874404;font-size: 0.875rem;width: 100%;margin-top: 30px;padding: 12px;border-radius: 8px;border: none;">立即存款</button>
  </van-popup>
  
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useUserStore } from '@/store/user'

// 导入静态资源
import cnyIcon from '@/assets/images/icon/CNY.avif'
import payIcon1 from '@/assets/images/payicon/finance-1744709565803-763302.avif'
import payIcon2 from '@/assets/images/payicon/finance-1744709547647-616038.avif'
import payIcon3 from '@/assets/images/payicon/finance-1744960718913-924083.avif'
import payIcon4 from '@/assets/images/payicon/finance-1744707823325-350303.avif'
import payIcon5 from '@/assets/images/payicon/finance-1744710701080-813919.avif'
import payIcon6 from '@/assets/images/payicon/finance-1745589056719-471716.avif'
import xnbIcon from '@/assets/images/payicon/icon_szhb_xnb.png'

const props = defineProps({
  show: { type: Boolean, default: false },
})
const emit = defineEmits(['update:show','success'])

const user = useUserStore()
const activeCat = ref('online')
const payList = ref([
    { id: 1, name: 'ABpay钱包', icon: payIcon1 },
    { id: 2, name: '其他虚拟币钱包', icon: payIcon2 },
    { id: 3, name: 'No钱包', icon: payIcon3 },
    { id: 4, name: 'Upay钱包', icon: payIcon4 },
    { id: 5, name: '波币钱包', icon: payIcon5 },
    { id: 6, name: '钱能钱包', icon: payIcon6 },
])
const currentPay = ref(1)
const showLocal = ref(props.show)
const mode = ref(props.initialMode)

watch(() => props.show, v => showLocal.value = v)
watch(showLocal, v => emit('update:show', v))
watch(() => props.initialMode, v => mode.value = v)



function close() {
  showLocal.value = false
}

function onSubmit() {
  if (!form.value.username || !form.value.password) {
    // 简单校验
    return
  }
  if (mode.value === 'register') {
    if (form.value.password !== form.value.confirm) return
    if (!agree.value) return
    // 模拟注册，直接登录
    user.login(form.value.username, 0)
    emit('success', { type: 'register', username: form.value.username })
    close()
  } else {
    // login
    user.login(form.value.username, 0)
    emit('success', { type: 'login', username: form.value.username })
    close()
  }
}

function onContact() {
  // 可以打开客服链接或触发父级事件
  window.open('https://m.example.com/contact', '_blank')
}

function onTrial() {
  // 免费试玩行为
  window.open('https://m.example.com/trial', '_blank')
}
</script>

<style scoped>
.top-cats { display:flex; gap:12px; padding:12px; border-bottom:1px solid rgba(255,255,255,0.03) }
.cat-btn {
  background:transparent;
  border:none;
  color:#cbd3db;
  padding:8px 6px;
  position:relative;
  font-size: 1rem;
}
.cat-btn.active { color: #f0c059; }
.cat-btn.active::after { content:''; position:absolute; left:6px; right:6px; height:3px; background:#f0c059; bottom:-8px }
.pay-list {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    padding: 12px;
    border-radius: 8px;
}
.pay-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:first baseline;
    padding: 4px 10px;
    border-radius: 8px;
    cursor: pointer;
    height: 60px;
    font-size: 0.875rem;
    border: .7px solid rgba(255, 255, 255, .7);
    color: #fff!important;
}
.pay-item.active {
    border: .7px solid #f0c059;
    color: #f0c059;
}
.pay-icon {
    width: 35px;
    height: 35px;
    margin-right: 8px;
}

.cunkuan-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    font-size: 1.0625rem;
    color: #fff;
}
.yue-icon {
    width: 1.3rem;
    height: auto;
}
.banlance {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 1.3rem;
    padding: 4px 8px;
}
.iconfont>.iconfont {
    font-size: 1.125rem;
    color: #f0c059;
}
</style>
