<template>
  <div class="number-ticker">
    <div class="ticker-inner">
      <span class="ticker-value" :key="displayKey">{{ formattedValue }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  duration: { type: Number, default: 8000 }, // ms
  decimals: { type: Number, default: 2 }
})

const value = ref(props.start)
const displayKey = ref(0)
let rafId = null

function formatNumber(n) {
  // Use Intl.NumberFormat for thousands separator and fixed decimals
  const fmt = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals
  })
  return fmt.format(n)
}

const formattedValue = computed(() => formatNumber(value.value))

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3) }

function startAnimation() {
  const start = performance.now()
  const from = props.start
  const to = props.end
  const dur = Math.max(100, props.duration)

  function step(now) {
    const t = Math.min(1, (now - start) / dur)
    const eased = easeOutCubic(t)
    value.value = from + (to - from) * eased
    // keep fixed decimals, but keep numeric for intermediate
    if (t < 1) {
      rafId = requestAnimationFrame(step)
    } else {
      value.value = to
      // bump key to allow CSS animation retrigger if needed
      displayKey.value++
    }
  }

  rafId = requestAnimationFrame(step)
}

onMounted(() => {
  startAnimation()
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
})

// restart when props change
watch(() => [props.start, props.end, props.duration], () => {
  if (rafId) cancelAnimationFrame(rafId)
  value.value = props.start
  startAnimation()
})
</script>

<style scoped>
.number-ticker {
  width: 100%;
  height: 100%;
  position: relative;
}
.ticker-inner {
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ticker-value {
  font-size: 28px;
  font-weight: 700;
  color: #ffff6d; /* will be placed on yellow bg, but ad-bar is image; color can be adjusted */
  padding: 6px 12px;
  border-radius: 8px;
  font-style: italic;
  letter-spacing: 2px;
}
</style>
