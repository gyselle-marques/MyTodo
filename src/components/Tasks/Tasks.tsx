import { FormEvent, useContext, useState } from "react";
import { TasksContext } from "../../context/TasksContext";

import { PiTrashDuotone } from "react-icons/pi";
import styles from "./styles.module.scss";

export const Tasks: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const { tasks, setTasks, handleToggleTaskStatus, handleRemoveTask } =
    useContext(TasksContext);

  function handleSubmitAddTask(event: FormEvent) {
    event.preventDefault();

    if (taskTitle.length < 3) {
      alert("Digite uma tarefa válida!");
      return;
    }

    const newTasks = [
      ...tasks,
      { id: new Date().getTime(), title: taskTitle, done: false },
    ];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    setTaskTitle("");
  }

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmitAddTask}>
        <div>
          <label htmlFor="task-title">Add Task</label>
          <input
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            type="text"
            id="task-title"
            placeholder="Task Title"
          />
        </div>
        <button type="submit">Add Task</button>
      </form>

      <div>
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  onChange={() => handleToggleTaskStatus(task.id)}
                />
                <label
                  className={task.done ? styles.done : ""}
                  htmlFor={`task-${task.id}`}
                >
                  {task.title}
                </label>

                <button onClick={() => handleRemoveTask(task.id)}>
                  <PiTrashDuotone />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
