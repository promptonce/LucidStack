<template>
  <main class="page">
    <h1>LLM 文本提示拼接器 (Vue)</h1>

    <section class="card">
      <label class="label">输入你的问题或请求:</label>
      <textarea v-model="store.userInput" rows="4" placeholder="请输入你的问题或请求..."></textarea>
    </section>

    <PromptForm />
    <ButtonsList />
    <ResultCard />

    <Toast :show="store.toast.show" :message="store.toast.message" />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { createPinia } from 'pinia';
import { usePrompts } from '@/stores/usePrompts';
import PromptForm from '@/components/PromptForm.vue';
import ButtonsList from '@/components/ButtonsList.vue';
import ResultCard from '@/components/ResultCard.vue';
import Toast from '@/components/Toast.vue';

// 保证首次进入加载数据
const store = usePrompts();
onMounted(() => store.loadAll());
</script>

<style scoped>
.page { max-width: 880px; margin: 24px auto; padding: 0 16px; display: grid; gap: 16px; }
.card { background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:12px; }
.label { color:#333; font-weight:700; margin-bottom:6px; display:block; }
textarea { width:100%; border:1px solid #e5e7eb; border-radius:8px; padding:10px; font-size:14px; }
</style>