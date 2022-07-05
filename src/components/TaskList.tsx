import TaskItem from "./TaskItem";
import { Task } from "./types/Types";
import { filterLabel } from "./Filter";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  filter: keyof typeof filterLabel;
};
const TaskList: React.FC<Props> = ({ tasks, setTasks, filter }) => {
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
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              removed: !task.removed,
            }
          : task
      )
    );
  };

  const handleTitleChange = (id: number, title: string) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: title,
            }
          : task
      )
    );
  };

  const filterdTaskList = tasks.filter((task) => {
    switch (filter) {
      case "all":
        return !task.removed;
      case "done":
        return task.done && !task.removed;
      case "inProgress":
        return !task.done && !task.removed;
      case "removed":
        return task.removed;
      default:
        return true;
    }
  });

  return (
    <ul className="task-list">
      {filterdTaskList.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          handleDone={handleDone}
          handleDelete={handleDelete}
          handleTitleChange={handleTitleChange}
        />
      ))}
    </ul>
  );
};

export default TaskList;
