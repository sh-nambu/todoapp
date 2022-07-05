import "./assets/css/App.css";
import { Task } from "./components/types/Types";
import useTaskList from "./components/useTaskList";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "本を返す",
    done: false,
    removed: false,
  },
  {
    id: 2,
    title: "PCを買う",
    done: true,
    removed: false,
  },
];

function App() {
  const renderTaskList = useTaskList(initialTasks);
  return renderTaskList();
}
export default App;
