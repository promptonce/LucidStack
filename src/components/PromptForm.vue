<template>
  <section class="card">
    <header class="card-header" @click="open = !open">
      <h3>创建提示按钮</h3>
      <button class="chev">{{ open ? '▲' : '▼' }}</button>
    </header>

    <form v-show="open" class="form" @submit.prevent="add">
      <label>
        按钮文本
        <input v-model.trim="text" placeholder="请输入按钮文本..." />
      </label>

      <label>
        提示内容
        <textarea v-model="prompt" rows="6" :placeholder="sample"></textarea>
      </label>

      <label>
        标签（可选）
        <input v-model.trim="tag" placeholder="请输入标签（可选）..." />
      </label>

      <div class="actions">
        <button type="button" class="ghost" @click="insertFlag">插入<用户下次输入></button>
        <button type="submit" class="primary">添加按钮到提示列表</button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePrompts } from '@/stores/usePrompts';

const store = usePrompts();
const open = ref(false);
const text = ref('');
const prompt = ref('');
const tag = ref('');

const sample = `示例\n下面我让你来充当翻译家，你的目标是把任何语言翻译成中文，请翻译时不要带翻译腔，而是要翻译得自然、流畅和地道，使用优美和高雅的表达方式。请翻译下面这句话：\n<用户下次输入>\n生成的回答：`;

function insertFlag() {
  const FLAG = '<用户下次输入>';
  if (!prompt.value.includes(FLAG)) {
    prompt.value += (prompt.value ? '\n' : '') + FLAG;
  } else {
    store.showToast('占位符已存在');
  }
}

async function add() {
  if (!text.value || !prompt.value) {
    store.showToast('请输入按钮文本和提示内容');
    return;
  }
  await store.addButton({ text: text.value, prompt: prompt.value, tag: tag.value });
  text.value = '';
  prompt.value = '';
  tag.value = '';
}
</script>

<style scoped>
.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px; }
.card-header { display:flex; align-items:center; gap:8px; cursor:pointer; color:#4a6fa5; font-weight:700; }
.form { display:grid; gap:12px; margin-top: 10px; }
label { display:grid; gap:6px; font-size: 14px; }
input, textarea { border:1px solid #e5e7eb; border-radius:8px; padding:8px; font-size:14px; }
.actions { display:flex; gap:8px; }
.primary { background:#4a6fa5; color:#fff; border:0; padding:8px 14px; border-radius:8px; }
.ghost { background:#e9ecef; color:#333; border:0; padding:8px 14px; border-radius:8px; }
.chev { margin-left:auto; background:transparent; border:0; color:#4a6fa5; font-weight:700; }
</style>