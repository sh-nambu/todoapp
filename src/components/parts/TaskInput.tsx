import { useState } from "react";
import { Task } from "../types/types";

type Props = {
  onClickAdd: (task: Task) => void;
};
const TaskInput: React.FC<Props> = ({ onClickAdd }) => {
  const [inputTask, setInputTask] = useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTask(event.target.value);
  };

  const handleOnClick = () => {
    if (inputTask) {
      onClickAdd({
        id: new Date().getTime(),
        title: inputTask,
        done: false,
        removed: false,
      });
      setInputTask("");
    }
  };

  return (
    <div className="inputForm">
      <input
        type="text"
        className="input"
        value={inputTask}
        onChange={handleOnChange}
      />
      <button className="btn" onClick={handleOnClick}>
        追加
      </button>
    </div>
  );
};

export default TaskInput;
