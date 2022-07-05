export const filterLabel = {
  all: "すべてのタスク",
  inProgress: "現在のタスク",
  done: "完了したタスク",
  removed: "ゴミ箱",
};

type Props = {
  setFilter: (filter: keyof typeof filterLabel) => void;
};

const Filter: React.FC<Props> = ({ setFilter }) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as keyof typeof filterLabel);
  };
  return (
    <div>
      <select className="dropdown-list" onChange={handleOnChange}>
        <option value="all">{filterLabel.all}</option>
        <option value="inProgress">{filterLabel.inProgress}</option>
        <option value="done">{filterLabel.done}</option>
        <option value="removed">{filterLabel.removed}</option>
      </select>
    </div>
  );
};

export default Filter;
