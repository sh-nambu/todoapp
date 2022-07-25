import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter, { FilterLabel } from "../components/parts/Filter";

describe("フィルタコンポーネントのテスト", () => {
  test("ドロップダウンリストから項目が選択されたとき、propsで渡されたコールバック関数を呼ぶ", () => {
    // 前準備
    const setFilter = jest.fn();
    const container = render(<Filter onSelectOption={setFilter} />);
    const options = container.getByRole("combobox");
    const inProgress = container.getByRole("option", {
      name: FilterLabel.inProgress,
    });
    // ユーザー操作
    userEvent.selectOptions(options, FilterLabel.inProgress);
    // 検証
    expect((inProgress as HTMLOptionElement).selected).toBeTruthy();
    expect(setFilter).toHaveBeenCalledWith("inProgress");
  });
});
