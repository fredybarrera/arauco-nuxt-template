<script setup lang="ts">
const { showToast } = useToast()
</script>

<template>
  <div class="flex flex-col gap-6">
    <header>
      <h1 class="font-display text-2xl font-bold tracking-wide uppercase">Plantilla base · Planos DS</h1>
      <p class="mt-1 text-sm text-ink-soft">
        Base limpia con tokens Tailwind v4, layout corporativo y componentes del design system,
        sin lógica de negocio. Revisa la página
        <NuxtLink to="/componentes" class="font-semibold text-calipso hover:underline">Componentes</NuxtLink>
        para ver la librería en acción.
      </p>
    </header>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiTile label="Tokens de color" value="14" trend="up" trend-label="paleta corporativa" />
      <KpiTile label="Componentes" value="41" trend="up" trend-label="auto-importados" />
      <KpiTile label="Composables" value="3" trend="up" trend-label="toast · confirm · scrollspy" />
      <KpiTile label="Dependencias" value="5" trend="down" trend-label="sin Pinia ni Axios" />
    </div>

    <section class="frame">
      <h2 class="mb-3 font-display text-lg font-bold">Primeros pasos</h2>
      <ol class="list-decimal space-y-1.5 pl-5 text-sm text-ink-soft">
        <li>Cambia título y navegación en <code class="font-semibold text-ink">app/layouts/default.vue</code>.</li>
        <li>Ajusta los tokens (colores, radios, sombras) en <code class="font-semibold text-ink">app/assets/css/main.css</code> (bloque <code>@theme</code>).</li>
        <li>Crea tus páginas en <code class="font-semibold text-ink">app/pages/</code> — el layout y los componentes se auto-importan.</li>
        <li>Elimina las páginas demo cuando ya no las necesites.</li>
      </ol>
      <div class="mt-4 flex gap-2">
        <AppButton variant="primary" @click="showToast('La plantilla funciona ✔', 'success')">
          Probar toast
        </AppButton>
        <AppButton variant="outline" @click="navigateTo('/componentes')">Ver componentes</AppButton>
      </div>
    </section>
  </div>
</template>
