<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <main class="page about">
    <h1>About</h1>
    <p>示例关于页。点击返回。</p>
    <nav>
      <button @click="router.push('/')">返回 Home</button>
    </nav>
  </main>
</template>

<style scoped>
.page { padding: 1.25rem; box-sizing: border-box; height: 100%; }
.about { display:flex; flex-direction:column; align-items:center; justify-content:center; }
button { margin-top: 1rem; }
</style>
