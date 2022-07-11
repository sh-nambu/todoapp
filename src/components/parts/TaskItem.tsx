import React from "react";
import { Task } from "../types/types";

export const removeButtonText = {
  remove: "削除",
  restore: "復元",
};

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
        {removed ? removeButtonText.restore : removeButtonText.remove}
      </button>
    </li>
  );
};

export default TaskItem;
