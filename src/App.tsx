import "./assets/css/App.css";
import { Task } from "./components/types/types";
import Todos from "./components/views/Todos";

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
  return <Todos initialTasks={initialTasks} />;
}
export default App;
