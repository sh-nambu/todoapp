import { act, renderHook } from "@testing-library/react";
import { Task } from "../components/types/types";
import useTasks from "../hooks/useTasks";

describe("useTasksフックのテスト", () => {
  const initialTasks: Task[] = [
    {
      id: 1,
      title: "本を返す",
      done: false,
      removed: false,
    },
    {
      id: 2,
      title: "PCを買う",
      done: true,
      removed: true,
    },
  ];

  const setUp = () => {
    const { result } = renderHook(() => useTasks(initialTasks));
    const setTasks = result.current[1];
    return { result, setTasks };
  };

  test("タスクを完了→未完了にする", () => {
    // 前準備
    const { result, setTasks } = setUp();
    // 初期状態のテスト
    expect(result.current[0].find((task) => task.id === 2)?.done).toBeTruthy();
    act(() => {
      // 完了フラグをtrue→falseにする
      setTasks.switchDone(2);
    });
    // 検証
    expect(result.current[0].find((task) => task.id === 2)?.done).toBeFalsy();
  });

  test("タスクを未完了→完了にする", () => {
    // 前準備
    const { result, setTasks } = setUp();
    // 初期状態のテスト
    expect(result.current[0].find((task) => task.id === 1)?.done).toBeFalsy();

    act(() => {
      // 完了フラグをfalse→trueにする
      setTasks.switchDone(1);
    });
    // 検証
    expect(result.current[0].find((task) => task.id === 1)?.done).toBeTruthy();
  });

  test("タスクを削除済みにする", () => {
    // 前準備
    const { result, setTasks } = setUp();
    // 初期状態のテスト
    expect(
      result.current[0].find((task) => task.id === 1)?.removed
    ).toBeFalsy();

    act(() => {
      // 削除済みフラグをfalse→trueにする
      setTasks.switchRemoved(1);
    });
    // 検証
    expect(
      result.current[0].find((task) => task.id === 1)?.removed
    ).toBeTruthy();
  });

  test("タスクを削除済み→解除する", () => {
    // 前準備
    const { result, setTasks } = setUp();
    // 初期状態のテスト
    expect(
      result.current[0].find((task) => task.id === 2)?.removed
    ).toBeTruthy();

    act(() => {
      // 削除済みフラグをtrue→falseにする
      setTasks.switchRemoved(2);
    });
    // 検証
    expect(
      result.current[0].find((task) => task.id === 2)?.removed
    ).toBeFalsy();
  });

  test("タスクを完全削除する", () => {
    // 前準備
    const { result, setTasks } = setUp();
    // 初期状態のテスト
    expect(result.current[0].find((task) => task.id === 2)).not.toBeUndefined();

    act(() => {
      setTasks.deleteRemoved();
    });
    // 検証
    expect(result.current[0].find((task) => task.id === 2)).toBeUndefined();
  });

  test("タスク名を変更する", () => {
    // 前準備
    const { result, setTasks } = setUp();
    // 初期状態のテスト
    expect(result.current[0].find((task) => task.id === 1)?.title).toBe(
      "本を返す"
    );

    act(() => {
      // タイトルを変更する
      setTasks.modifyTitle(1, "本を買う");
    });
    // 検証
    expect(result.current[0].find((task) => task.id === 1)?.title).toBe(
      "本を買う"
    );
  });

  test("タスクを新規登録する", () => {
    // 前準備
    const { result, setTasks } = setUp();
    const preCount = result.current[0].length;

    act(() => {
      // タスクを追加する
      setTasks.add({
        id: 3,
        title: "買い物に行く",
        done: false,
        removed: false,
      });
    });
    // 検証
    expect(result.current[0].length).toBeGreaterThan(preCount);
  });
});
