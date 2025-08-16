<template>
  <section class="card">
    <header class="header">
      <h3>提示按钮列表</h3>
      <div class="filter">
        <label>筛选标签:</label>
        <select :value="store.tagFilter" @change="store.setFilter(($event.target as HTMLSelectElement).value)">
          <option v-for="t in store.tags" :key="t" :value="t">{{ t }}</option>
        </select>
        <button class="ghost" @click="chooseImport">导入</button>
        <button class="ghost" @click="store.exportJSON">导出</button>
        <input ref="file" type="file" accept="application/json" class="hidden" @change="doImport" />
      </div>
    </header>

    <div v-if="store.filtered.length === 0" class="empty">暂无提示按钮</div>

    <div v-else class="list">
      <article v-for="b in store.filtered" :key="b.id" class="item" @mouseenter="hover = b.id" @mouseleave="hover = ''">
        <div class="meta">
          <div class="title">{{ b.text }}</div>
          <div v-if="b.tag" class="tag">标签: {{ b.tag }}</div>
        </div>
        <div class="ops">
          <button class="primary" @click="store.generate(b.prompt)">使用</button>
          <button class="danger" @click="store.removeButton(b.id)">删除</button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePrompts } from '@/stores/usePrompts';
const store = usePrompts();
const hover = ref('');
const file = ref<HTMLInputElement | null>(null);

function chooseImport() {
  file.value?.click();
}

function doImport(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0];
  if (f) store.importJSON(f);
  (e.target as HTMLInputElement).value = '';
}
</script>

<style scoped>
.card { background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:12px; }
.header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
.filter { display:flex; align-items:center; gap:8px; }
select { border:1px solid #e5e7eb; border-radius:8px; padding:6px 8px; }
.list { display:grid; gap:8px; }
.item { display:flex; justify-content:space-between; align-items:center; border:1px solid #eef2f7; border-radius:10px; padding:10px; }
.item:hover { background:#f0f7ff; }
.title { font-weight:700; color:#333; }
.tag { color:#6b8cae; font-size:12px; margin-top:4px; }
.ops { display:flex; gap:8px; }
.primary { background:#4a6fa5; color:#fff; border:0; padding:6px 12px; border-radius:8px; }
.danger { background:#e63946; color:#fff; border:0; padding:6px 12px; border-radius:8px; }
.ghost { background:#e9ecef; color:#333; border:0; padding:6px 10px; border-radius:8px; }
.empty { color:#adb5bd; text-align:center; padding:24px 0; }
.hidden { display:none; }
</style>