<script setup lang="ts">
const sidenavCollapsed = useState('sidenavCollapsed', () => false)
const { theme, toggleTheme } = useTheme()

function toggleSidenav() {
  sidenavCollapsed.value = !sidenavCollapsed.value
}

// Personalizar aquí la navegación del proyecto
const links = [
  { label: 'Inicio', to: '/', icon: 'home' },
  { label: 'Componentes', to: '/componentes', icon: 'box' },
]
</script>

<template>
  <div class="min-h-screen text-ink">
    <IconSprite />
    <AppNavbar
      title="Arauco"
      subtitle="· Mi Proyecto"
      tagline="Plantilla base Planos DS"
      user-name="Nombre Apellido"
      @toggle-sidenav="toggleSidenav"
    >
      <template #actions>
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-(--radius-md) border border-white/15 bg-white/6 text-[#eee6d4] hover:bg-white/15"
          :aria-label="theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
          @click="toggleTheme()"
        >
          <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="16" />
        </button>
      </template>
      <template #user-menu>
        <div class="p-2">
          <button
            type="button"
            class="flex w-full items-center gap-2 rounded-(--radius-sm) px-3 py-2 text-[13px] text-ink-soft hover:bg-paper-2 hover:text-danger"
          >
            <AppIcon name="logout" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </template>
    </AppNavbar>
    <AppSidebar :collapsed="sidenavCollapsed" :links="links" />
    <main
      class="pt-(--spacing-nav-h) transition-[margin-left] duration-200"
      :class="sidenavCollapsed ? 'ml-(--spacing-side-w-collapsed)' : 'ml-(--spacing-side-w)'"
    >
      <div class="px-6 py-5">
        <slot />
      </div>
    </main>
    <ToastStack />
    <ConfirmDialog />
  </div>
</template>
