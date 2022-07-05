import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { Task } from "./types/Types";

type Props = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};
const TaskList: React.FC<Props> = ({ tasks, setTasks }) => {

    const handleDone = (id: number) => {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                done: !task.done,
              }
            : task
        )
      );
    };

  const handleDelete = (id: number) => {
      setTasks((tasks) => tasks.filter((task) => task.id !== id));
    // setTaskList((taskList) => taskList.filter((task) => task.id !== id));
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          handleDone={handleDone}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
