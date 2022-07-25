import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterLabel } from "../components/parts/Filter";
import Todos from "../components/views/Todos";

describe("TODOリストのテスト", () => {
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
  const setUp = () => {
    return render(<Todos initialTasks={tasks} />);
  };

  describe("表示のテスト", () => {
    test("フィルタが「ゴミ箱」のとき、「ゴミ箱を空にする」ボタンを表示する", () => {
      // 前準備
      const container = setUp();
      const filter = container.getByRole("combobox");
      // 初期状態の確認
      expect(
        container.queryByRole("button", { name: "ゴミ箱を空にする" })
      ).not.toBeInTheDocument();
      // ユーザー操作
      userEvent.selectOptions(filter, FilterLabel.removed);
      // 検証
      expect(
        container.getByRole("button", { name: "ゴミ箱を空にする" })
      ).toBeInTheDocument();
    });

    test("フィルタが「すべてのタスク」のとき、入力フォームを表示する", () => {
      // 前準備
      const container = setUp();
      const filter = container.getByRole("combobox");
      // ユーザー操作
      userEvent.selectOptions(filter, FilterLabel.all);
      // 検証
      expect(
        container.getByPlaceholderText("入力してください")
      ).toBeInTheDocument();
    });

    test("フィルタが「現在のタスク」のとき、入力フォームを表示する", () => {
      // 前準備
      const container = setUp();
      // フィルタ＝現在のタスクに設定する
      userEvent.selectOptions(
        container.getByRole("combobox"),
        FilterLabel.inProgress
      );
      // 検証
      expect(
        container.getByPlaceholderText("入力してください")
      ).toBeInTheDocument();
    });

    test("フィルタが「完了したタスク」のとき、入力フォームを表示しない", () => {
      // 前準備
      const container = setUp();
      // フィルタ＝完了したタスクの設定する
      userEvent.selectOptions(
        container.getByRole("combobox"),
        FilterLabel.done
      );
      // 検証
      expect(
        container.queryByPlaceholderText("入力してください")
      ).not.toBeInTheDocument();
    });

    test("フィルタが「ゴミ箱」のとき、入力フォームを表示しない", () => {
      // 前準備
      const container = setUp();
      // フィルタ＝ゴミ箱に設定する
      userEvent.selectOptions(
        container.getByRole("combobox"),
        FilterLabel.removed
      );
      // 検証
      expect(
        container.queryByPlaceholderText("入力してください")
      ).not.toBeInTheDocument();
    });
  });

  describe("操作のテスト", () => {
    test("フィルタが「すべてのタスク」の状態で、入力フォームに文字列を入力され追加ボタンがクリックされたとき、画面に追加したタスクを表示する", () => {
      // 前準備
      const container = setUp();
      // フィルタ＝すべてのタスクに設定する
      userEvent.selectOptions(container.getByRole("combobox"), FilterLabel.all);
      // 初期状態のタスクの数
      const initialCount = container.getAllByRole("listitem").length;
      // タスク入力
      userEvent.type(
        container.getByPlaceholderText("入力してください"),
        "レンタカーを予約する"
      );
      // 追加ボタンクリック
      userEvent.click(container.getByRole("button", { name: "追加" }));
      // 検証
      expect(
        container.getByDisplayValue("レンタカーを予約する")
      )?.toBeInTheDocument();
      expect(container.getAllByRole("listitem").length).toBe(initialCount + 1);
    });
  });

  test("フィルタが「現在のタスク」の状態で、未完了タスクのチェックボックスがcheckedになったとき、画面にタスクが表示されなくなる", () => {
    // 前準備
    const container = setUp();
    // フィルタ＝現在のタスクに設定する
    userEvent.selectOptions(
      container.getByRole("combobox"),
      FilterLabel.inProgress
    );
    const checkbox = container.getByTestId(`checkbox-${tasks[0].id}`);
    // 初期状態の確認（チェックなしで表示されている）
    expect(container.getByTestId(`textbox-${tasks[0].id}`)).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    // チェック操作
    userEvent.click(checkbox);
    // 検証（表示されていない）
    expect(
      container.queryByTestId(`textbox-${tasks[0].id}`)
    ).not.toBeInTheDocument();
  });

  test("フィルタが「完了したタスク」の状態で、完了タスクのチェックボックスがuncheckedになったとき、画面にタスクが表示されなくなる", () => {
    // 前準備
    const container = setUp();
    // フィルタ＝完了したタスクに設定する
    userEvent.selectOptions(container.getByRole("combobox"), FilterLabel.done);
    const checkbox = container.getByTestId(`checkbox-${tasks[1].id}`);
    // 初期状態の確認（チェックありで表示されている）
    expect(container.getByTestId(`textbox-${tasks[1].id}`)).toBeInTheDocument();
    expect(checkbox).toBeChecked();
    // チェック操作
    userEvent.click(checkbox);
    // 検証
    expect(
      container.queryByTestId(`textbox-${tasks[1].id}`)
    ).not.toBeInTheDocument();
  });

  test("タスクのタイトルが変更されたとき、変更後のタイトルを表示する", () => {
    // 前準備
    const container = setUp();
    const textbox = container.getByTestId(`textbox-${tasks[0].id}`);
    // タイトルを変更
    fireEvent.change(textbox, { target: { value: "変更後したタスク" } });
    // 検証
    expect(textbox).toHaveDisplayValue("変更後したタスク");
  });

  test("フィルタが「現在のタスク」の状態で、削除ボタンがクリックされたとき、画面にタスクが表示されなくなる", () => {
    // 前準備
    const container = setUp();
    // フィルタ＝現在のタスクに設定する
    userEvent.selectOptions(
      container.getByRole("combobox"),
      FilterLabel.inProgress
    );
    // 初期状態の確認
    expect(container.getByTestId(`textbox-${tasks[0].id}`)).toBeInTheDocument();
    // 削除ボタンクリック
    userEvent.click(container.getByTestId(`button-${tasks[0].id}`));
    // 検証
    expect(
      container.queryByTestId(`textbox-${tasks[0].id}`)
    ).not.toBeInTheDocument();
  });

  test("フィルタが「ゴミ箱」の状態で、復元ボタンがタップされたとき、画面にタスクが表示されなくなる", () => {
    // 前準備
    const container = setUp();
    // フィルタ＝ゴミ箱に設定する
    userEvent.selectOptions(
      container.getByRole("combobox"),
      FilterLabel.removed
    );
    // 初期状態の確認
    expect(container.getByTestId(`textbox-${tasks[3].id}`)).toBeInTheDocument();
    // 復元ボタンクリック
    userEvent.click(container.getByTestId(`button-${tasks[3].id}`));
    //検証
    expect(
      container.queryByTestId(`textbox-${tasks[3].id}`)
    ).not.toBeInTheDocument();
  });

  test("フィルタが「ゴミ箱」の状態で、ゴミ箱を空にするボタンをタップされたとき、画面にすべてのタスクが表示されなくなる", () => {
    // 前準備
    const container = setUp();
    // フィルタ＝ゴミ箱に設定する
    userEvent.selectOptions(
      container.getByRole("combobox"),
      FilterLabel.removed
    );
    // 初期状態の確認
    expect(container.getAllByRole("listitem").length).toBeGreaterThan(0);
    // ボタンクリック
    userEvent.click(
      container.getByRole("button", { name: "ゴミ箱を空にする" })
    );
    // 検証
    expect(container.queryAllByRole("listitem")).toEqual([]);
  });
});
