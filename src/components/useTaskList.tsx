import { Task } from "./types/Types";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";
import { useState } from "react";
import Filter, { filterLabel } from "./Filter";

export const useTaskList = (initialTaskList: Task[]) => {
  const [taskList, setTaskList] = useState(initialTaskList);
  const [filterText, setFilterText] =
    useState<keyof typeof filterLabel>("inProgress");

  const setFilter = (filter: keyof typeof filterLabel) => {
    setFilterText(filter);
  };

  const handleAddTask = (task: Task) => {
    setTaskList([task, ...taskList]);
  };

  const inputEnabled = filterText === "all" || filterText === "inProgress";

  return () => (
    <div className="inner">
      <TaskInput enabled={inputEnabled} handleAddTask={handleAddTask} />
      <Filter setFilter={setFilter} />
      <TaskList tasks={taskList} filter={filterText} setTasks={setTaskList} />
    </div>
  );
};

export default useTaskList;
