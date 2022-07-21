import { render, screen } from "@testing-library/react";
import { filterLabel } from "../components/parts/Filter";
import TaskList from "../components/templates/TaskList";

describe("タスクリストコンポーネントのテスト", () => {
  const setTasks = {
    switchDone: jest.fn(),
    modifyTitle: jest.fn(),
    switchRemoved: jest.fn(),
  };
  const tasks = [
    {
      id: 1,
      title: "本を返す",
      done: false, // 未完了
      removed: false,
    },
    {
      id: 2,
      title: "ごみを捨てる",
      done: true, // 完了
      removed: false,
    },
    {
      id: 3,
      title: "卵を買う",
      done: true,
      removed: true, // 削除済み
    },
    {
      id: 4,
      title: "病院に行く",
      done: false,
      removed: true, // 削除済み
    },
  ];

  const setUp = (filterText: keyof typeof filterLabel) => {
    render(
      <TaskList
        tasks={tasks}
        filter={filterText}
        switchDone={setTasks.switchDone}
        modifyTitle={setTasks.modifyTitle}
        switchRemoved={setTasks.switchRemoved}
      />
    );
  };

  test("propsで渡されたフィルタが「すべてのタスク」のとき、未完了と完了済みのタスクを表示する", () => {
    // 前準備
    setUp("all");
    // 検証
    expect(screen.getByDisplayValue(tasks[0].title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(tasks[1].title)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(tasks[2].title)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(tasks[3].title)).not.toBeInTheDocument();
  });
  test("propsで渡されたフィルタが「現在のタスク」のとき、未完了のタスクを表示する", () => {
    // 前準備
    setUp("inProgress");
    // 検証
    expect(screen.getByDisplayValue(tasks[0].title)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(tasks[1].title)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(tasks[2].title)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(tasks[3].title)).not.toBeInTheDocument();
  });

  test("propsで渡されたフィルタが「完了したタスク」のとき、完了済みのタスクを表示する", () => {
    // 前準備
    setUp("done");
    // 検証
    expect(screen.queryByDisplayValue(tasks[0].title)).not.toBeInTheDocument();
    expect(screen.getByDisplayValue(tasks[1].title)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(tasks[2].title)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(tasks[3].title)).not.toBeInTheDocument();
  });

  test("propsで渡されたフィルタが「ごみ箱」のとき、削除済みのタスクを表示する", () => {
    // 前準備
    setUp("removed");
    // 検証
    expect(screen.queryByDisplayValue(tasks[0].title)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(tasks[1].title)).not.toBeInTheDocument();
    expect(screen.getByDisplayValue(tasks[2].title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(tasks[3].title)).toBeInTheDocument();
  });
});
