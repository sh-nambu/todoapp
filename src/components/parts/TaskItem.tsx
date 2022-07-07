import React from "react";
import { Task } from "../types/types";

type Props = {
  task: Task;
  handleDone: (id: number) => void;
  handleDelete: (id: number) => void;
  handleTitleChange: (id: number, title: string) => void;
};
const TaskItem: React.FC<Props> = ({
  task: { id, title, done, removed },
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
        disabled={removed}
        checked={done}
        onChange={() => handleDone(id)}
      ></input>
      <input
        className="input"
        disabled={done || removed}
        type="text"
        value={title}
        onChange={handleOnChange}
      ></input>
      <button className="btn" onClick={() => handleDelete(id)}>
        {removed ? "復元" : "削除"}
      </button>
    </li>
  );
};

export default TaskItem;
