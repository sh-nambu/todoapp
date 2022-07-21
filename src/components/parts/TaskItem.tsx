import React from "react";
import { Task } from "../types/types";

export const removeButtonText = {
  remove: "削除",
  restore: "復元",
};

type Props = {
  task: Task;
  onChecked: (id: number) => void;
  onClickRemove: (id: number) => void;
  onChangeTitle: (id: number, title: string) => void;
};
const TaskItem: React.FC<Props> = ({
  task: { id, title, done, removed },
  onChecked,
  onClickRemove,
  onChangeTitle,
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTitle(id, event.target.value);
  };
  return (
    <li>
      <input
        type="checkbox"
        disabled={removed}
        checked={done}
        onChange={() => onChecked(id)}
      ></input>
      <input
        className="input"
        disabled={done || removed}
        type="text"
        value={title}
        onChange={handleOnChange}
      ></input>
      <button className="btn" onClick={() => onClickRemove(id)}>
        {removed ? removeButtonText.restore : removeButtonText.remove}
      </button>
    </li>
  );
};

export default TaskItem;
