import TaskItem from "../components/parts/TaskItem";
import { render, screen } from "@testing-library/react";

describe("タスクアイテムコンポーネントのテスト", () => {
  const setTasks = {
    switchDone: (id: number) => console.log(`switchDone : ${id}`),
    modifyTitle: (id: number, title: string) =>
      console.log(`modifyTitle : ${id} ${title}`),
    switchRemoved: (id: number) => console.log(`switchRemoved : ${id}`),
  };

  test("propsで渡されたタスクの完了済みフラグがfalseのとき、未チェック状態で表示する", () => {
    // 前準備
    const task = {
      id: 1,
      title: "本を返す",
      done: false,
      removed: false,
    };

    render(
      <TaskItem
        task={task}
        handleDone={setTasks.switchDone}
        handleDelete={setTasks.switchRemoved}
        handleTitleChange={setTasks.modifyTitle}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    // 検証
    expect(checkbox).not.toBeChecked();
  });

  test("propsで渡されたタスクの完了済みフラグがtrueのとき、チェック済み状態で表示する", () => {
    // 前準備
    const task = {
      id: 1,
      title: "本を返す",
      done: true,
      removed: false,
    };

    render(
      <TaskItem
        task={task}
        handleDone={setTasks.switchDone}
        handleDelete={setTasks.switchRemoved}
        handleTitleChange={setTasks.modifyTitle}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    // 検証
    expect(checkbox).toBeChecked();
  });

  test("propsで渡されたタスクの完了済みフラグが削除済みのとき、非活性とする", () => {
    // 前準備
    const task = {
      id: 1,
      title: "本を返す",
      done: true,
      removed: true,
    };

    render(
      <TaskItem
        task={task}
        handleDone={setTasks.switchDone}
        handleDelete={setTasks.switchRemoved}
        handleTitleChange={setTasks.modifyTitle}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    // 検証
    expect(checkbox).toBeDisabled();
  });
});
