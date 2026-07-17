<script setup lang="ts">
const { toasts, dismiss } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-6 right-6 z-[200] flex flex-col gap-2.5 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="flex gap-3 items-start bg-corteza-dark text-paper py-3.5 px-4 rounded-md shadow-md min-w-[280px] max-w-[340px] pointer-events-auto"
        >
          <AppIcon :name="t.type === 'error' ? 'danger' : t.type === 'warning' ? 'warning' : 'check'" class="mt-0.5" />
          <div class="flex-1 text-[13.5px] font-semibold">{{ t.message }}</div>
          <button
            class="ml-auto bg-transparent border-none text-madera cursor-pointer shrink-0 text-base leading-none"
            aria-label="Cerrar"
            @click="dismiss(t.id)"
          >
            ×
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  transform: translateY(12px);
  opacity: 0;
}
</style>
