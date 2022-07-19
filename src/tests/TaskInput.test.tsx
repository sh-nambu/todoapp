import { fireEvent, render } from "@testing-library/react";
import TaskInput from "../components/parts/TaskInput";

describe("タスク入力コンポーネントのテスト", () => {
  const addTask = jest.fn();
  const setUp = () => {
    const component = render(<TaskInput handleAddTask={addTask} />);
    const input = component.getByRole("textbox");
    const button = component.getByRole("button");
    return { input, button };
  };

  describe("入力フォームのテスト", () => {
    test("ユーザー操作によって入力された文字列を表示する", () => {
      // 前準備
      const { input } = setUp();
      // ユーザー操作
      fireEvent.change(input, { target: { value: "本を買う" } });
      // 検証
      expect(input).toHaveDisplayValue("本を買う");
    });

    test("ユーザー操作によってボタンがクリックされたとき、入力されていない状態になる", () => {
      // 前準備
      const { input, button } = setUp();
      // ユーザー操作
      fireEvent.click(button);
      // 検証
      expect(input).toHaveDisplayValue("");
    });
  });

  describe("ボタンのテスト", () => {
    test("ボタンがクリックされたとき、propsで渡されたコールバック関数を呼ぶ", () => {
      const { input, button } = setUp();
      // ユーザー操作
      fireEvent.change(input, { target: { value: "本を返す" } });
      fireEvent.click(button);
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
      fireEvent.change(input, { target: { value: "" } });
      fireEvent.click(button);
      // 検証
      expect(addTask).not.toBeCalled();
    });
  });
});
