<script setup lang="ts">
const sidenavCollapsed = useState('sidenavCollapsed', () => false)

function toggleSidenav() {
  sidenavCollapsed.value = !sidenavCollapsed.value
}

// Personalizar aquí la navegación del proyecto
const links = [
  { label: 'Inicio', to: '/', icon: 'home' },
  { label: 'Componentes', to: '/componentes', icon: 'box' }
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
