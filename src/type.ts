export type ID = string;

export interface PromptButton {
  id: ID;
  text: string;      // 按钮文本
  prompt: string;    // 模板内容，含 <用户下次输入>
  tag?: string;      // 可选标签
}