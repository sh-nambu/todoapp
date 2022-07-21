import TaskItem from "../parts/TaskItem";
import { Task } from "../types/types";
import { filterLabel } from "../parts/Filter";

type Props = {
  tasks: Task[];
  switchDone: (id: number) => void;
  modifyTitle: (id: number, title: string) => void;
  switchRemoved: (id: number) => void;
  filter: keyof typeof filterLabel;
};
const TaskList: React.FC<Props> = ({
  tasks,
  filter,
  switchDone,
  modifyTitle,
  switchRemoved,
}) => {
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
          onChecked={switchDone}
          onClickRemove={switchRemoved}
          onChangeTitle={modifyTitle}
        />
      ))}
    </ul>
  );
};

export default TaskList;
