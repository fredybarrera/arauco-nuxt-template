<script setup lang="ts">
export interface SidebarLink {
  label: string
  to: string
  icon: string
}

withDefaults(defineProps<{
  collapsed: boolean
  links?: SidebarLink[]
  linksSecundarios?: SidebarLink[]
  tituloSecundario?: string
}>(), {
  links: () => [{ label: 'Inicio', to: '/', icon: 'home' }],
  linksSecundarios: () => [],
  tituloSecundario: 'Administración'
})
</script>

<template>
  <aside
    class="fixed top-(--spacing-nav-h) bottom-0 left-0 z-40 overflow-y-auto border-r border-white/10 bg-shell p-3.5 transition-[width] duration-200"
    :class="collapsed ? 'w-(--spacing-side-w-collapsed)' : 'w-(--spacing-side-w)'"
  >
    <nav class="flex flex-col gap-1">
      <NuxtLink
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        class="flex items-center gap-2.5 rounded-(--radius-md) border-l-2 border-transparent px-2.5 py-2 text-[13.5px] text-[#ffffff] hover:bg-white/10 hover:text-white"
        active-class="bg-gradient-to-r from-calipso/20 to-transparent border-l-calipso! text-white font-semibold [&_.icon]:stroke-calipso"
        :class="{ 'justify-center px-0': collapsed }"
      >
        <AppIcon :name="link.icon" />
        <span v-if="!collapsed">{{ link.label }}</span>
      </NuxtLink>

      <template v-if="linksSecundarios.length">
        <div class="my-3 border-t border-white/10" />
        <span
          v-if="!collapsed"
          class="block px-2.5 pb-1.5 text-[11px] tracking-[.08em] text-[#9d9384] uppercase"
        >
          {{ tituloSecundario }}
        </span>
        <NuxtLink
          v-for="link in linksSecundarios"
          :key="link.label"
          :to="link.to"
          class="flex items-center gap-2.5 rounded-(--radius-md) border-l-2 border-transparent px-2.5 py-2 text-[13.5px] text-[#ffffff] hover:bg-white/10 hover:text-white"
          active-class="bg-gradient-to-r from-calipso/20 to-transparent border-l-calipso! text-white font-semibold [&_.icon]:stroke-calipso"
          :class="{ 'justify-center px-0': collapsed }"
        >
          <AppIcon :name="link.icon" />
          <span v-if="!collapsed">{{ link.label }}</span>
        </NuxtLink>
      </template>
    </nav>
  </aside>
</template>
