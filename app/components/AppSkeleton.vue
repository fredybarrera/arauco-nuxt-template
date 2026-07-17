<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'line' | 'avatar'; width?: string }>(), {
  variant: 'line',
  width: undefined,
})
</script>

<template>
  <div
    class="skeleton rounded-sm"
    :class="variant === 'avatar' ? 'w-12 h-12 rounded-full shrink-0' : 'h-3 mb-2.5 last:mb-0'"
    :style="width ? { width } : undefined"
  />
</template>
