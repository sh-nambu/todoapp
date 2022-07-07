import { Task } from "../types/types";
import TaskList from "../templates/TaskList";
import TaskInput from "../parts/TaskInput";
import React, { useState } from "react";
import Filter, { filterLabel } from "../parts/Filter";

type Props = {
  initialTasks: Task[];
};

const Todos: React.FC<Props> = ({ initialTasks }) => {
  const [taskList, setTaskList] = useState(initialTasks);
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

  return (
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

export default Todos;
