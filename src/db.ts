import Dexie, { Table } from 'dexie';
import type { PromptButton } from './types';

export class AppDB extends Dexie {
  buttons!: Table<PromptButton, string>;

  constructor() {
    super('llm-text-prompt-app');
    this.version(1).stores({
      // 索引：id 主键，text、tag 和便于按更新时间扩展用的字段
      buttons: 'id, text, tag'
    });
  }
}

export const db = new AppDB();