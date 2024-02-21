import React, { createContext, useEffect, useState } from "react";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksContextData {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  handleToggleTaskStatus: (taskId: number) => void;
  handleRemoveTask: (taskId: number) => void;
}

export const TasksContext = createContext({} as TasksContextData);

interface TasksProviderProps {
  children: React.ReactNode;
}

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState([] as Task[]);

  useEffect(() => {
    const tasksOnLocalStorage = localStorage.getItem("tasks");

    if (tasksOnLocalStorage) {
      setTasks(JSON.parse(tasksOnLocalStorage));
    }
  }, []);

  function handleToggleTaskStatus(taskId: number) {
    const newTasks = tasks.map((task) => {
      if (taskId === task.id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  function handleRemoveTask(taskId: number) {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        handleToggleTaskStatus,
        handleRemoveTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
