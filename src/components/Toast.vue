<template>
  <transition name="fade">
    <div v-if="show" class="toast">
      <span class="icon">✓</span>
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{ show: boolean; message: string }>();
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.toast {
  position: fixed; inset: 0; margin: auto; width: 320px; height: 90px;
  background: #fff; border: 1px solid #e5e7eb; border-radius: 12px;
  display: flex; align-items: center; gap: 10px; justify-content: center;
  box-shadow: 0 10px 30px rgba(0,0,0,.08); z-index: 50;
}
.icon { color: #2a9d8f; font-weight: 700; }
</style>