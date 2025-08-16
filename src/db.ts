import Dexie, { type Table } from 'dexie'
import type { PromptButton } from './types'

export class AppDB extends Dexie {
  // 注意这里 Table 只是类型，不会在运行时导入
  buttons!: Table<PromptButton, string>

  constructor() {
    super('LUCIDSTACK')
    this.version(1).stores({
      // 索引：id 主键，text、tag 和便于按更新时间扩展用的字段
      buttons: 'id, text, tag'
    })
  }
}

export const db = new AppDB()