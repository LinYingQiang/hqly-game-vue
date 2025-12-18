
<template>
  <div class="relative inline-block w-48 text-sm" ref="dropdownRef">
    <!-- 触发按钮 -->
    <button
      @click="toggleDropdown"
      type="button"
      :class="[
        'flex items-center justify-between w-full px-4 py-2 rounded-full transition-all duration-200 bg-[#1c212b] border outline-none',
        isOpen 
          ? 'border-[#c19e5c] text-white shadow-[0_0_10px_rgba(193,158,92,0.2)]' 
          : 'border-[#323946] text-[#9ca3af] hover:border-[#4b5563]'
      ]"
    >
      <span class="truncate">{{ selectedLabel }}</span>
      <component 
        :is="isOpen ? ChevronUpIcon : ChevronDownIcon" 
        :size="18" 
        :class="isOpen ? 'text-[#c19e5c]' : 'text-[#9ca3af]'"
        class="ml-2"
      />
    </button>

    <!-- 下拉菜单 -->
    <transition name="fade">
      <div 
        v-if="isOpen"
        class="absolute left-0 w-full mt-2 z-50 bg-[#1c212b] border border-[#323946] rounded-xl overflow-hidden shadow-2xl"
        style="transform-origin: top center;"
      >
        <div class="py-2">
          <button
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            type="button"
            :class="[
              'bg-[#1c212b] w-full text-center transition-colors duration-150 text-base',
              modelValue === option.value 
                ? 'text-[#c19e5c] bg-[#252a35] font-medium' 
                : 'text-[#9ca3af] hover:bg-[#252a35] hover:text-[#e5e7eb]'
            ]"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon } from 'lucide-vue-next';

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择'
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const dropdownRef = ref(null);

const selectedLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue);
  return selected ? selected.label : props.placeholder;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>
