import { Task } from "../types/types";
import TaskList from "../templates/TaskList";
import TaskInput from "../parts/TaskInput";
import React, { useState } from "react";
import Filter, { filterLabel } from "../parts/Filter";
import useTasks from "../../hooks/useTasks";

type Props = {
  initialTasks: Task[];
};

const Todos: React.FC<Props> = ({ initialTasks }) => {
  const [tasks, setTasks] = useTasks(initialTasks);
  const [filterText, setFilterText] =
    useState<keyof typeof filterLabel>("inProgress");

  const setFilter = (filter: keyof typeof filterLabel) => {
    setFilterText(filter);
  };

  return (
    <div className="inner">
      {filterText === "all" || filterText === "inProgress" ? (
        <TaskInput onClickAdd={setTasks.add} />
      ) : null}
      <div className="wrapper">
        <Filter onSelectOption={setFilter} />
        {filterText === "removed" ? (
          <button className="btn empty" onClick={setTasks.deleteRemoved}>
            ゴミ箱を空にする
          </button>
        ) : null}
      </div>
      <TaskList
        tasks={tasks}
        filter={filterText}
        switchDone={setTasks.switchDone}
        modifyTitle={setTasks.modifyTitle}
        switchRemoved={setTasks.switchRemoved}
      />
    </div>
  );
};

export default Todos;
