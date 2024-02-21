import { useContext } from "react";
import { StatsCard } from "../StatsCard/StatsCard";
import { TasksContext } from "../../context/TasksContext";

import styles from "./styles.module.scss";

export const Header: React.FC = () => {
  const { tasks } = useContext(TasksContext);

  const totalTasks = tasks.length;
  const totalPending = tasks.reduce((total, task) => {
    if (!task.done) return total + 1;
    return total;
  }, 0);
  const totalDone = totalTasks - totalPending;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <h1>MyTodo</h1>

          <span>Welcome!</span>
        </div>

        <div>
          <StatsCard title="Total Tasks" value={totalTasks} />
          <StatsCard title="Pending Tasks" value={totalPending} />
          <StatsCard title="Done Tasks" value={totalDone} />
        </div>
      </div>
    </header>
  );
};
