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

  const handleEmpty = () => {
    setTaskList(taskList.filter((task) => !task.removed));
  };

  return () => (
    <div className="inner">
      {filterText === "all" || filterText === "inProgress" ? (
        <TaskInput handleAddTask={handleAddTask} />
      ) : null}
      <div className="wrapper">
        <Filter setFilter={setFilter} />
        {filterText === "removed" ? (
          <button className="btn empty" onClick={handleEmpty}>
            ゴミ箱を空にする
          </button>
        ) : null}
      </div>
      <TaskList tasks={taskList} filter={filterText} setTasks={setTaskList} />
    </div>
  );
};

export default useTaskList;
