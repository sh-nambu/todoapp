import { useEffect, useState } from "react";
import { Task } from "../components/types/types";

const useTasks = (taskList: Task[]) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(taskList);
  }, [taskList]);

  const switchDone = (id: number) => {
    setTasks((preTasks) =>
      preTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              done: !task.done,
            }
          : task
      )
    );
  };

  const add = (task: Task) => {
    setTasks((preTasks) => [task, ...preTasks]);
  };

  const modifyTitle = (id: number, title: string) => {
    setTasks((preTasks) =>
      preTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: title,
            }
          : task
      )
    );
  };

  const switchRemoved = (id: number) => {
    setTasks((preTasks) =>
      preTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              removed: !task.removed,
            }
          : task
      )
    );
  };

  const deleteRemoved = () => {
    setTasks((preTasks) => preTasks.filter((task) => !task.removed));
  };

  return {
    tasks,
    setTasks: { switchDone, add, modifyTitle, switchRemoved, deleteRemoved },
  };
};

export default useTasks;
