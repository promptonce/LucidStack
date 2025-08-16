<template>
  <section class="card">
    <h3>生成的提示</h3>
    <textarea v-model="store.generated" rows="6"></textarea>
    <div class="actions">
      <button class="primary" @click="store.copyGenerated">复制到剪贴板</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePrompts } from '@/stores/usePrompts';
const store = usePrompts();
</script>

<style scoped>
.card { background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:12px; }
textarea { width:100%; border:1px solid #e5e7eb; border-radius:8px; padding:10px; font-size:14px; }
.actions { margin-top:8px; }
.primary { background:#4a6fa5; color:#fff; border:0; padding:8px 14px; border-radius:8px; }
</style>