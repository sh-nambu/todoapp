export const FilterLabel = {
  all: "すべてのタスク",
  inProgress: "現在のタスク",
  done: "完了したタスク",
  removed: "ゴミ箱",
};

type Props = {
  onSelectOption: (filter: keyof typeof FilterLabel) => void;
};

const Filter: React.FC<Props> = ({ onSelectOption }) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectOption(event.target.value as keyof typeof FilterLabel);
  };
  return (
    <div>
      <select className="dropdown-list" onChange={handleOnChange}>
        <option value="all">{FilterLabel.all}</option>
        <option value="inProgress">{FilterLabel.inProgress}</option>
        <option value="done">{FilterLabel.done}</option>
        <option value="removed">{FilterLabel.removed}</option>
      </select>
    </div>
  );
};

export default Filter;
