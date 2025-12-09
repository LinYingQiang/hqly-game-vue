<template>
  <div class="sliding-menu">
    <van-search v-model="value" right-icon="search" left-icon="" placeholder="搜索游戏" />
    <div class="category-list">
      <div
        class="category-item"
        v-for="cat in categories"
        :key="cat.categoryId || cat.name"
        @click="onSelect(cat)"
      >
        <img v-if="cat.icon" :src="cat.icon" alt="" class="category-icon" />
        <div class="category-name">{{ cat.name }}</div>
      </div>
    </div>
    <div class="cell-item">
        <van-icon name="balance-list" class="cell-icon" />
        <span class="cell-name">投注记录</span>
    </div>
    <div class="cell-item">
        <van-icon name="share" class="cell-icon" />
        <span class="cell-name">立即分享</span>
    </div>
    <div class="cell-item">
        <van-icon name="friends" class="cell-icon" />
        <span class="cell-name">分享赚钱</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, ref } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

// 保持 props 的响应性，并在模板中以 `categories` 使用
const { categories } = toRefs(props)

const emit = defineEmits(['select'])

// 搜索框绑定的本地变量
const value = ref('')

function onSelect(cat) {
  emit('select', cat)
}
</script>

<style>
.sliding-menu {
  width: 180px;
  padding: 10px;
}

.category-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 8px;
}

.cell-item {
    font-size: 1.5em;
    background: #22242a;
    border-radius: 10px;
    padding: 10px;
    color: #adb6c3;
    margin: 10px 0;
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
}
.cell-icon {
    font-size: 1rem;
    margin-right: 5px;
}
.cell-name {
    font-size: 1rem;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #22242a;
  border-radius: 10px;
  cursor: pointer;
}

.category-icon {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 6px;
}

.category-name {
  font-size: 12px;
  margin-top: 6px;
  color: #adb6c3;
}
</style>