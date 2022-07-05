import { Task } from "./types/Types";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";
import { useState } from "react";

export const useTaskList = (initialTaskList: Task[]) => {
  const [taskList, setTaskList] = useState(initialTaskList);

  const handleAddTask = (task: Task) => {
    setTaskList([task, ...taskList]);
  };

  return () => (
    <div className="inner">
      <TaskInput handleAddTask={handleAddTask} />
      <TaskList tasks={taskList} setTasks={setTaskList} />
    </div>
  );
};

export default useTaskList;
