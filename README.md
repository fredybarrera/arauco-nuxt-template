# Arauco Nuxt Template — Planos DS

Plantilla base extraída de `arauco-project`, **sin lógica de negocio**: tokens de diseño,
layout corporativo (navbar + sidebar) y la librería de componentes del design system Planos,
lista para iniciar un proyecto nuevo.

## Stack

- **Nuxt 4** (SPA, `ssr: false`) + **TypeScript estricto**
- **Tailwind CSS v4** (tokens vía `@theme` en CSS, sin `tailwind.config`)
- **ESLint** (`@nuxt/eslint`) + **Prettier** (formato; `eslint-config-prettier` evita conflictos)
- **Modo oscuro** con clase `.dark` en `<html>` (`useTheme` + persistencia en localStorage)
- Fuente **Roboto** auto-hospedada (sin CDN)
- Sin Pinia (usar `useState()`) y sin Axios (usar `$fetch` / `useFetch`)

## Uso

```bash
npm install
npm run dev           # http://localhost:5173
npm run build
npm run typecheck
npm run lint          # eslint . (lint:fix para autocorregir)
npm run format        # prettier --write . (format:check en CI)
```

Las páginas `/` y `/componentes` son demos: muestran la librería en acción. Elimínalas
cuando empieces tu proyecto real.

## Estructura

```
app/
├── assets/
│   ├── css/main.css        # Tokens @theme (colores, fuentes, radios, sombras) + clases .input, .frame, .tooltip, .skeleton
│   └── fonts/              # Roboto woff2 auto-hospedada
├── components/             # Design system Planos (auto-importados)
├── composables/            # useToast, useConfirm, useScrollSpy, useFormField, useFocusTrap, useTheme
├── plugins/theme.client.ts # Aplica el tema guardado (o el del sistema) al arrancar
├── error.vue               # Página de error 404/500 con estilo del DS
├── layouts/default.vue     # Shell: navbar + sidebar + ToastStack + ConfirmDialog
├── pages/                  # index.vue y componentes.vue (demos)
├── types/                  # sidenav.ts, table.ts, form.ts, tree.ts
└── utils/                  # sanitizeHtml.ts, format.ts (formatDate, formatNumber… es-CL)
```

## Personalización rápida

1. **Identidad**: título, subtítulo y usuario del navbar se pasan como props en
   `app/layouts/default.vue` (`AppNavbar` acepta `title`, `subtitle`, `tagline`, `user-name`
   y slots `#actions` / `#user-menu`).
2. **Navegación**: el arreglo `links` en el layout alimenta `AppSidebar`
   (`links`, `linksSecundarios`, `tituloSecundario`).
3. **Colores/tokens**: bloque `@theme` en `app/assets/css/main.css`. Los componentes usan
   solo utilidades derivadas de tokens (`bg-calipso`, `text-ink`, `border-line`…), así que
   cambiar la paleta ahí re-tematiza toda la app.
4. **Modo oscuro**: los tokens neutrales se re-declaran bajo `.dark` en `main.css`; ajusta
   ahí la paleta oscura. El toggle vive en el navbar (`#actions` del layout) y usa
   `useTheme()` (`theme`, `toggleTheme`, `setTheme`). También existen utilidades `dark:*`
   para casos puntuales.
5. **Auth**: esta plantilla no incluye MSAL/Azure AD. Si tu proyecto lo necesita, copia desde
   `arauco-project/frontend`: `app/plugins/msal.client.ts`, `app/plugins/api.client.ts`,
   `app/middleware/auth.global.ts`, `app/composables/useAuth.ts` y la sección `runtimeConfig`
   de `nuxt.config.ts`.

## APIs reales de los composables

> Ojo: difieren de lo documentado en el CLAUDE.md del proyecto origen.

```ts
// Toast
const { showToast } = useToast()
showToast('Guardado', 'success') // 'success' | 'error' | 'warning' | 'info'

// Confirmación
const { confirmar } = useConfirm()
const ok = await confirmar({ title: 'Eliminar', message: '¿Seguro?', tone: 'danger' })
```

## Formularios

`AppFormField` provee `id` y estado de error a los controles hijos (vía `useFormField`),
así el label queda conectado y el borde de error se activa solo:

```vue
<AppFormField label="Correo" :error="errorCorreo" required hint="Se usará para avisos.">
  <AppInput v-model="correo" type="email" placeholder="nombre@arauco.cl" />
</AppFormField>

<AppFormField label="Área">
  <AppSelect v-model="area" :options="[{ label: 'Forestal', value: 'F' }]" placeholder="Selecciona…" />
</AppFormField>
```

Los controles también funcionan sueltos (sin wrapper) y aceptan `invalid` para forzar
el estado de error manualmente.

## Componentes incluidos

**Formularios**: AppFormField (label + hint + error, envuelve cualquier control),
AppInput (`icon`, `clearable`), AppTextarea (`maxlength` + `show-count`), AppSelect
(`options: SelectOption[]`), AppCombobox (select con búsqueda; `multiple` acumula chips,
`clearable`; su `v-model` es `ComboboxModel`), AppNumberInput (`number | null`, formato
es-CL al desenfocar, `decimals`/`min`/`max`/`suffix`), AppButton (`type` default
`'button'`, prop `loading`), AppCheck, AppRadio
(uno por opción, con `value`), AppSwitch, AppChipInput, AppColorPicker, AppDatePicker
(`Date | null`, popover por defecto; props `min`/`max`/`inline`), AppDropzone, AppRichEditor
**Overlays**: AppModal (`size` sm/md/lg, `closable`, slot `#footer`), AppDrawer,
AppDropdown + DropdownItem, AppTooltip (o clase `.tooltip`). Modal, drawer y confirm
comparten `useFocusTrap`: focus trap, bloqueo de scroll, Escape y retorno de foco.
**Visualización**: AppIcon + IconSprite, AppBadge (`tone` + slot), AppAlert, AppCard,
AppEmptyState, AppSkeleton (`variant`, `width`), AppAvatar (`initials`), AppAvatarGroup
**Organización**: AppAccordion, AppRating, SegmentedControl, AppTabs, AppTimeline,
AppWizard (slots `#panel-0…n`), StatusBar, AppTransferList (asignación entre dos listas:
`v-model` valores asignados, `options: SelectOption[]`, `searchable`, doble clic mueve
directo, "mover todos" respeta el filtro), AppTree (jerarquías: `nodes: TreeNode[]`,
`v-model` clave seleccionada, `v-model:expanded`, `default-expand-all`, evento `@select`,
slot `#label="{ node, depth }"`)
**Tablas**: DataTable, FilteredTable (con búsqueda, filtros y export), AppPagination
(standalone: `v-model` página + `total-pages`)
**Indicadores**: AppSpinner (hereda color), AppProgress (`value` 0–100 o indeterminado,
`tone`, `show-value`), AppBreadcrumbs (`items: { label, to? }[]`)
**Gráficos**: BarChart, TrendSparkline, KpiTile
**Feedback**: ToastStack + useToast, ConfirmDialog + useConfirm
**Shell**: AppNavbar, AppSidebar, SidenavItem, SkeletonLoader… (genéricos, configurables por props/slots)

## Cómo mantener la base sincronizada entre proyectos

Esta plantilla es una **copia** (fork del DS). Para cambios puntuales basta con copiar el
componente actualizado entre proyectos. Si el design system va a evolucionar en varios
proyectos a la vez, considera migrar `components/`, `composables/`, `types/` y `assets/`
a un **Nuxt Layer** publicado como paquete privado (npm/Azure Artifacts) y extenderlo con
`extends: ['@arauco/planos-ds']` en cada `nuxt.config.ts`.
