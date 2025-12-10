<template>
    <van-popup v-model:show="showLocal" :overlay-style="{position: 'absolute'}" :style="{height: 'auto',width: '90%', borderRadius: '12px', maxHeight: '90vh', padding: '16px', position: 'absolute'}" :overlay="true">
    <div class="auth-popup">
      <!-- logo -->
      <div class="logo-row">
        <img :src="logoImg" alt="logo" class="auth-logo" />
      </div>

      <!-- three lines of text -->
      <div class="text-rows">
        <div>💸新用户下载APP注册即送588元💸</div>
        <div>💰新人专享 首存豪送8888元💰</div>
        <div>🧧二存三存狂送8888元🧧</div>
      </div>

      <!-- nav: login / register -->
      <div class="nav-row">
        <button :class="['nav-item', mode === 'login' ? 'active' : '']" @click="mode = 'login'">登录</button>
        <button :class="['nav-item', mode === 'register' ? 'active' : '']" @click="mode = 'register'">注册</button>
      </div>

      <!-- form -->
      <div class="form-area">
        <template v-if="mode === 'login'">
          <van-field v-model="form.username" placeholder="请输入用户名" label="用户名" />
          <van-field v-model="form.password" type="password" placeholder="请输入密码" label="密码" />
        </template>
        <template v-else>
          <van-field v-model="form.username" placeholder="请输入用户名" label="用户名" />
          <van-field v-model="form.password" type="password" placeholder="请输入密码" label="密码" />
          <van-field v-model="form.confirm" type="password" placeholder="确认密码" label="确认密码" />
        </template>
      </div>

      <!-- user agreement -->
      <div class="agreement">
        <van-checkbox v-model="agree" />
        <div class="agree-text">我已阅读并同意 <a href="#">用户协议</a> 与 <a href="#">隐私政策</a></div>
      </div>

      <!-- submit button -->
      <div class="submit-row">
        <button class="submit-btn" @click="onSubmit">{{ mode === 'login' ? '登录' : '注册' }}</button>
      </div>

      <!-- bottom links -->
      <div class="bottom-links">
        <a @click.prevent="onContact">联系客服</a>
        <a @click.prevent="onTrial">免费试玩</a>
      </div>

      <!-- close button -->
    </div>
  </van-popup>
  
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useUserStore } from '@/store/user'

// 导入静态资源
import logoImg from '@/assets/images/logo.avif'

const props = defineProps({
  show: { type: Boolean, default: false },
  initialMode: { type: String, default: 'login' }
})
const emit = defineEmits(['update:show','success'])

const user = useUserStore()

const showLocal = ref(props.show)
const mode = ref(props.initialMode)

watch(() => props.show, v => showLocal.value = v)
watch(showLocal, v => emit('update:show', v))
watch(() => props.initialMode, v => mode.value = v)

const form = ref({ username: '', password: '', confirm: '' })
const agree = ref(true)

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
.form-area .van-cell {
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    margin-bottom: 8px;
}
.auth-popup {
  color: #fff;
  /* 使用rem单位,相对于根元素字体大小 */
  font-size: 1rem;
}
.logo-row { display:flex; justify-content:center; margin-bottom:8px }
.auth-logo { height: 45px; width:  auto }
.text-rows {
  text-align:center;
  color: #cbd3db;
  margin-bottom:8px;
  font-size: 0.9rem;
  line-height: 1.6;
}
.nav-row { display:flex; justify-content:center; gap:154px; margin: 8px 0; }
.nav-item {
  background: transparent;
  border: none;
  color: #fff;
  padding: 6px 0;
  position: relative;
  font-size: 1.1rem;
}
.nav-item.active::after { content: ''; position: absolute; left: 0; right: 0; height: 3px; background: #f0c059; bottom: -6px }
.form-area { padding: 8px 12px }
.agreement {
  display:flex;
  align-items:center;
  gap:8px;
  padding: 6px 12px;
  color: #cbd3db;
  font-size: 0.85rem;
}
.agree-text a { color: #f0c059 }
.submit-row { display:flex; justify-content:center; padding: 12px }
.submit-btn {
  background: #f0c059;
  color:#111;
  border:none;
  padding: 10px 24px;
  border-radius:8px;
  font-weight:700;
  font-size: 1rem;
}
.bottom-links {
  display:flex;
  justify-content:space-between;
  padding: 8px 12px;
  color: #cbd3db;
  font-size: 0.9rem;
}
.bottom-links a { color: #f0c059; cursor:pointer }
.close-row { display:flex; justify-content:center; padding: 8px 12px;position: absolute;bottom: -60px;;}
.close-btn { background: transparent; color:#cbd3db; border: 1px solid rgba(255,255,255,0.06); padding:6px 12px; border-radius:8px }
</style>
