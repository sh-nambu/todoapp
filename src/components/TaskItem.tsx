import React from "react";
import { Task } from "./types/Types";

type Props = {
  task: Task;
  handleDone: (id: number) => void;
  handleDelete: (id: number) => void;
  handleTitleChange: (id: number, title: string) => void;
};
const TaskItem: React.FC<Props> = ({
  task: { id, title, done },
  handleDone,
  handleDelete,
  handleTitleChange,
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleTitleChange(id, event.target.value);
  };
  return (
    <li>
      <input
        type="checkbox"
        checked={done}
        onChange={() => handleDone(id)}
      ></input>
      <input
        className="input"
        type="text"
        value={title}
        onChange={handleOnChange}
      ></input>
      <button className="btn" onClick={() => handleDelete(id)}>
        削除
      </button>
    </li>
  );
};

export default TaskItem;
