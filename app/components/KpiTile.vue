<script setup lang="ts">
const props = defineProps<{
  label: string
  value: string
  unit?: string
  trend: 'up' | 'down'
  trendLabel: string
}>()

const stripeClass = computed(() => (props.trend === 'up' ? 'before:bg-success-ink' : 'before:bg-rojo-deep'))
const trendClass = computed(() => (props.trend === 'up' ? 'text-success-ink' : 'text-rojo-deep'))
</script>

<template>
  <div
    :class="[
      'relative overflow-hidden bg-card border border-line rounded-md py-5 pr-5 pl-6',
      'before:content-[\'\'] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1',
      stripeClass
    ]"
  >
    <div class="text-xs text-ink-soft mb-2.5">{{ label }}</div>
    <div class="text-[26px] font-bold font-display text-ink">
      {{ value }}<span v-if="unit" class="text-[13px] text-ink-soft font-normal ml-0.5">{{ unit }}</span>
    </div>
    <div :class="['inline-flex items-center gap-1.5 text-xs font-semibold mt-2.5', trendClass]">
      <AppIcon :name="trend === 'up' ? 'trendup' : 'trenddown'" :size="13" />
      {{ trendLabel }}
    </div>
  </div>
</template>
