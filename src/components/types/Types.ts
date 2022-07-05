/**
 * タスクの型定義.
 * @param id id
 * @param title タイトル
 * @param done 完了済みフラグ
 */
export type Task = {
  readonly id: number;
  title: string;
  done: boolean;
};
