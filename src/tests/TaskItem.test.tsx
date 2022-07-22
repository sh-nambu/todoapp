import TaskItem, { removeButtonText } from "../components/parts/TaskItem";
import { fireEvent, render } from "@testing-library/react";
import { Task } from "../components/types/types";
import userEvent from "@testing-library/user-event";

describe("タスクアイテムコンポーネントのテスト", () => {
  const setTasks = {
    switchDone: jest.fn(),
    modifyTitle: jest.fn(),
    switchRemoved: jest.fn(),
  };
  const setUp = (task: Task) => {
    return render(
      <TaskItem
        task={task}
        onChangeDone={setTasks.switchDone}
        onClickRemove={setTasks.switchRemoved}
        onChangeTitle={setTasks.modifyTitle}
      />
    );
  };

  describe("チェックボックスの表示と操作のテスト", () => {
    test("propsで渡されたタスクの完了済みフラグがfalseのとき、未チェック状態で表示する", () => {
      // 前準備
      const task = {
        id: 1,
        title: "本を返す",
        done: false,
        removed: false,
      };

      const checkbox = setUp(task).getByRole("checkbox");
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

      const checkbox = setUp(task).getByRole("checkbox");
      // 検証
      expect(checkbox).toBeChecked();
    });

    test("propsで渡されたタスクの削除済みフラグがtrueのとき、非活性とする", () => {
      // 前準備
      const task = {
        id: 1,
        title: "本を返す",
        done: true,
        removed: true,
      };

      const checkbox = setUp(task).getByRole("checkbox");
      // 検証
      expect(checkbox).toBeDisabled();
    });

    test("ユーザー操作によってチェックボックスが値が変化したとき、propsで渡されたコールバック関数を呼ぶ", () => {
      const task = {
        id: 1,
        title: "本を返す",
        done: false,
        removed: false,
      };
      const checkbox = setUp(task).getByRole("checkbox");
      // ユーザー操作
      userEvent.click(checkbox);
      // 検証
      expect(setTasks.switchDone).toHaveBeenCalledWith(task.id);
    });
  });

  describe("タイトルの表示と操作のテスト", () => {
    test("propsで渡されたタスクのタイトルを表示する", () => {
      // 前準備
      const task = {
        id: 1,
        title: "本を返す",
        done: false,
        removed: false,
      };
      const textbox = setUp(task).getByRole("textbox");
      // 検証
      expect(textbox).toHaveValue(task.title);
    });

    test("propsで渡されたタスクの完了済みフラグがtrueのとき、非活性（編集ができない状態）とする", () => {
      // 前準備
      const task = {
        id: 1,
        title: "本を返す",
        done: true,
        removed: false,
      };
      const textbox = setUp(task).getByRole("textbox");
      // 検証
      expect(textbox).toBeDisabled();
    });

    test("propsで渡されたタスクの削除済みフラグがtrueのとき、非活性（編集ができない状態）とする", () => {
      // 前準備
      const task = {
        id: 1,
        title: "本を返す",
        done: false,
        removed: true,
      };
      const textbox = setUp(task).getByRole("textbox");
      // 検証
      expect(textbox).toBeDisabled();
    });

    test("propsで渡されたタスクの完了済みフラグがfalseのとき、活性（編集ができる状態）とする", () => {
      // 前準備
      const task = {
        id: 1,
        title: "本を返す",
        done: false,
        removed: false,
      };
      const textbox = setUp(task).getByRole("textbox");
      // 検証
      expect(textbox).toBeEnabled();
    });

    test("ユーザー操作によってタイトルが編集されたとき、propsで渡されたコールバック関数を呼ぶ", () => {
      // 前準備
      const task = {
        id: 1,
        title: "本を返す",
        done: false,
        removed: false,
      };
      const textbox = setUp(task).getByRole("textbox");
      // ユーザー操作
      fireEvent.change(textbox, { target: { value: "本を買う" } });
      // 検証
      expect(setTasks.modifyTitle).toHaveBeenCalledWith(task.id, "本を買う");
    });
  });

  describe("ボタンの表示と操作のテスト", () => {
    test("propsで渡されたタスクの削除済みフラグがfalseのとき、削除と表示する", () => {
      // 前準備
      const task = {
        id: 1,
        title: "本を返す",
        done: false,
        removed: false,
      };
      const button = setUp(task).getByRole("button");
      // 検証
      expect(button.textContent).toBe(removeButtonText.remove);
    });

    test("propsで渡されたタスクの削除済みフラグがtrueのとき、復元と表示する", () => {
      // 前準備
      const task = {
        id: 1,
        title: "本を返す",
        done: false,
        removed: true,
      };
      const button = setUp(task).getByRole("button");
      // 検証
      expect(button.textContent).toBe(removeButtonText.restore);
    });

    test("ユーザー操作によってボタンがクリックされたとき、propsで渡されたコールバック関数を呼ぶ", () => {
      // 前準備
      const task = {
        id: 1,
        title: "本を返す",
        done: false,
        removed: true,
      };
      const button = setUp(task).getByRole("button");
      // ユーザー操作
      userEvent.click(button);
      // 検証
      expect(setTasks.switchRemoved).toHaveBeenCalledWith(task.id);
    });
  });
});
