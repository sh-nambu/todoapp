import { Task } from "./types/Types";

type Props = {
  task: Task;
  handleDone: (id: number) => void;
  handleDelete: (id: number) => void;
};
const TaskItem: React.FC<Props> = ({
  task: { id, title, done },
  handleDone,
  handleDelete,
}) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={done}
        onChange={() => handleDone(id)}
      ></input>
      <label>{title}</label>
      <button className="btn" onClick={() => handleDelete(id)}>
        削除
      </button>
    </li>
  );
};

export default TaskItem;
