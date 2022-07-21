import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskInput from "../components/parts/TaskInput";

describe("タスク入力コンポーネントのテスト", () => {
  const addTask = jest.fn();
  const setUp = () => {
    const container = render(<TaskInput onClickAdd={addTask} />);
    const input = container.getByRole("textbox");
    const button = container.getByRole("button");
    return { input, button };
  };

  describe("入力フォームのテスト", () => {
    test("ユーザー操作によって入力された文字列を表示する", () => {
      // 前準備
      const { input } = setUp();
      // ユーザー操作
      userEvent.type(input, "本を買う");
      // 検証
      expect(input).toHaveValue("本を買う");
    });

    test("ユーザー操作によってボタンがクリックされたとき、入力されていない状態になる", () => {
      // 前準備
      const { input, button } = setUp();
      // ユーザー操作
      userEvent.click(button);
      // 検証
      expect(input).toHaveDisplayValue("");
    });
  });

  describe("ボタンのテスト", () => {
    test("ボタンがクリックされたとき、propsで渡されたコールバック関数を呼ぶ", () => {
      const { input, button } = setUp();
      // ユーザー操作
      userEvent.type(input, "本を返す");
      userEvent.click(button);
      // 検証
      expect(addTask).toBeCalledWith({
        id: expect.any(Number),
        title: "本を返す",
        done: false,
        removed: false,
      });
    });

    test("ボタンがクリックされたとき、テキストボックスに何も入力されていない場合はpropsで渡されたコールバック関数を呼ばない", () => {
      const { input, button } = setUp();
      // ユーザー操作
      userEvent.type(input, "");
      userEvent.click(button);
      // 検証
      expect(addTask).not.toBeCalled();
    });
  });
});
