<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    tagline?: string
    userName?: string
  }>(),
  {
    title: 'Arauco',
    subtitle: '· Mi Proyecto',
    tagline: '',
    userName: '',
  }
)

defineEmits<{ 'toggle-sidenav': [] }>()

const iniciales = (nombre: string) => {
  if (!nombre) return '?'
  return nombre
    .split(' ')
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join('')
}

const menuAbierto = ref(false)
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 flex h-(--spacing-nav-h) items-center gap-4 border-b border-white/10 px-5 text-[#f3ecdc] backdrop-blur-[10px]"
    style="background: rgba(51, 48, 43, 0.88)"
  >
    <!-- Hamburguer -->
    <button
      type="button"
      aria-label="Mostrar u ocultar navegación"
      class="flex h-9 w-9 items-center justify-center rounded-(--radius-md) border border-white/15 bg-white/6 text-[#eee6d4] hover:bg-white/15"
      @click="$emit('toggle-sidenav')"
    >
      <AppIcon name="sidebar" />
    </button>

    <!-- Logo / título -->
    <div class="flex items-center gap-2.5 font-display text-lg font-bold tracking-wide uppercase">
      <span
        class="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-calipso to-verde text-[15px] text-primary-ink shadow-[0_0_16px_rgba(63,174,154,.4)]"
        >▲</span
      >
      <span>{{ title }}</span>
      <span class="text-[#ffffff]">{{ subtitle }}</span>
    </div>

    <span v-if="tagline" class="hidden font-mono text-xs tracking-wide text-[#ffffff] sm:inline">
      {{ tagline }}
    </span>

    <div class="flex-1" />

    <!-- Zona de acciones (búsqueda, notificaciones, etc.) -->
    <slot name="actions" />

    <!-- User menu -->
    <div v-if="userName || $slots['user-menu']" class="relative">
      <button
        type="button"
        class="flex h-9 items-center gap-2.5 rounded-full border border-white/15 bg-white/6 px-3 text-[#eee6d4] hover:bg-white/15"
        @click="menuAbierto = !menuAbierto"
      >
        <span
          class="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-calipso to-verde font-mono text-xs font-bold text-primary-ink"
          >{{ iniciales(userName) }}</span
        >
        <span class="hidden max-w-32 truncate text-sm sm:block">{{ userName }}</span>
        <AppIcon name="chevdown" :size="13" />
      </button>

      <!-- Dropdown -->
      <Transition name="dropdown">
        <div
          v-if="menuAbierto"
          class="absolute right-0 top-11 z-[150] w-64 rounded-(--radius-lg) border border-line bg-card text-ink shadow-(--shadow-md)"
        >
          <slot
            name="user-menu"
            :cerrar="
              () => {
                menuAbierto = false
              }
            "
          />
        </div>
      </Transition>

      <!-- Click fuera -->
      <div v-if="menuAbierto" class="fixed inset-0 z-[140]" @click="menuAbierto = false" />
    </div>
  </nav>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
