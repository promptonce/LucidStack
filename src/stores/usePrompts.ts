import { defineStore } from 'pinia';
import { db } from '@/db';
import type { PromptButton } from '@/types';

const PLACEHOLDER = '<用户下次输入>';

export const usePrompts = defineStore('prompts', {
  state: () => ({
    buttons: [] as PromptButton[],
    tagFilter: '全部' as string,
    userInput: '' as string,
    generated: '' as string,
    toast: { show: false, message: '' as string }
  }),
  getters: {
    tags(state) {
      const set = new Set<string>();
      state.buttons.forEach(b => b.tag && set.add(b.tag));
      return ['全部', ...Array.from(set)];
    },
    filtered(state) {
      return state.tagFilter === '全部' 
        ? state.buttons 
        : state.buttons.filter(b => b.tag === state.tagFilter);
    }
  },
  actions: {
    async loadAll() {
      this.buttons = await db.buttons.toArray();
    },
    async addButton(payload: Omit<PromptButton, 'id'>) {
      const id = crypto.randomUUID();
      const item: PromptButton = { id, ...payload };
      await db.buttons.add(item);
      this.buttons.push(item);
    },
    async removeButton(id: string) {
      await db.buttons.delete(id);
      this.buttons = this.buttons.filter(b => b.id !== id);
      this.showToast('已删除按钮');
    },
    setFilter(tag: string) {
      this.tagFilter = tag;
      if (tag !== '全部') this.showToast(`已筛选标签: ${tag}`);
    },
    generate(promptTemplate: string) {
      const userValue = (this.userInput || '').trim();
      const value = promptTemplate.replaceAll(PLACEHOLDER, userValue);
      this.generated = value;
      this.showToast('提示已生成，可以复制使用');
    },
    copyGenerated() {
      navigator.clipboard.writeText(this.generated || '').then(() => {
        this.showToast('已复制到剪贴板');
      });
    },
    async exportJSON() {
      const data = await db.buttons.toArray();
      const payload = JSON.stringify({ buttons: data }, null, 2);
      const blob = new Blob([payload], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `buttons_config.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast(`已成功导出 ${data.length} 个按钮配置`);
    },
    async importJSON(file: File) {
      try {
        const text = await file.text();
        const json = JSON.parse(text);
        const loaded = Array.isArray(json) ? json : (json.buttons || []);
        // 清库再导入
        await db.transaction('rw', db.buttons, async () => {
          await db.buttons.clear();
          if (Array.isArray(loaded)) {
            // 兼容无 id 的旧数据
            const normalized = loaded.map((b: any) => ({
              id: b.id || crypto.randomUUID(),
              text: b.text || '',
              prompt: b.prompt || '',
              tag: b.tag || ''
            })).filter((b: any) => b.text && b.prompt);
            await db.buttons.bulkAdd(normalized);
          }
        });
        await this.loadAll();
        this.showToast(`已成功导入 ${this.buttons.length} 个按钮配置`);
      } catch (e) {
        this.showToast('导入失败：JSON 格式错误或文件无效');
      }
    },
    showToast(message: string) {
      this.toast.message = message;
      this.toast.show = true;
      setTimeout(() => (this.toast.show = false), 1600);
    }
  }
});