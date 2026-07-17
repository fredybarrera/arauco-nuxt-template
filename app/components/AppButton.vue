<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    iconOnly?: boolean
    disabled?: boolean
    /** Muestra spinner y deshabilita el botón. */
    loading?: boolean
    as?: string
    /** Solo aplica cuando `as` es 'button'. Default 'button' para no hacer submit accidental en formularios. */
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    iconOnly: false,
    disabled: false,
    loading: false,
    as: 'button',
    type: 'button',
  }
)

const variantClasses: Record<Variant, string> = {
  primary: 'bg-calipso text-white hover:bg-calipso-deep',
  secondary: 'bg-corteza text-white hover:bg-corteza-dark',
  outline: 'bg-transparent border-line-strong text-ink hover:bg-paper-2',
  ghost: 'bg-transparent border-line-strong text-ink-soft hover:bg-paper-2 hover:text-ink',
  danger: 'bg-rojo-deep text-white hover:opacity-90',
  success: 'bg-verde text-white hover:bg-verde-deep',
}

const sizeClasses: Record<Size, string> = {
  sm: 'py-1.5 px-3 text-[12.5px]',
  md: 'py-2.5 px-[18px] text-[13.5px]',
  lg: 'py-[13px] px-[22px] text-[14.5px]',
}

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 font-body font-semibold cursor-pointer rounded-full border border-transparent transition-transform active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed',
  variantClasses[props.variant],
  props.iconOnly ? 'p-[9px] w-[38px]' : sizeClasses[props.size],
])
</script>

<template>
  <component
    :is="as"
    :class="classes"
    :disabled="disabled || loading"
    :type="as === 'button' ? type : undefined"
    :aria-busy="loading || undefined"
  >
    <AppSpinner v-if="loading" :size="14" />
    <slot />
  </component>
</template>
