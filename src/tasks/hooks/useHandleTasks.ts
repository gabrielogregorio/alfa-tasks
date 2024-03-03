import { v4 as uuidV4 } from 'uuid';
import { useEffect, useState } from 'react';
import { taskStorageName } from '@/tasks/constants/storage';
import { ITask } from '@/tasks/types';
import { getCurrentDate } from '@/tasks/utils/utils';
import { LocalStorageService } from '../../common/LocalStorageService';

const currentDate = getCurrentDate();

export const resetTaskToNewDay = (): ITask[] => {
  const tasksDay: ITask[] = LocalStorageService.getItemAndParse<ITask[]>(taskStorageName) || [];

  return tasksDay.map((task: ITask) => {
    if (task.lastResetDate === currentDate) {
      return task;
    }

    return { ...task, status: 'available', lastResetDate: currentDate };
  });
};

const generateUniqueId = () => {
  return uuidV4();
};

const saveTasks = (tasks: ITask[]) => {
  LocalStorageService.setItem(taskStorageName, tasks);
};

const buildNewTask = (): ITask => {
  return {
    status: 'available',
    lastResetDate: getCurrentDate(),
    description: 'new task',
    id: generateUniqueId(),
  };
};

interface IUseHandleTasksResponse {
  handleDropTask: (taskId: string) => void;
  handleUpdateTask: (taskId: string, newStatus: Partial<ITask>) => void;
  handleAddBatchNewTasks: (tasks: ITask[]) => void;
  handleResetToNewDay: () => void;
  handleAddNewTask: () => void;
  tasks: ITask[];
}

const useEffectWithDebouncing = (callback: () => void, deps: unknown[], time: number) => {
  useEffect(() => {
    const timer = setTimeout(callback, time);

    return () => clearTimeout(timer);
  }, deps);
};

const TIME_IN_MS_TO_SAVE_TASKS = 500;
export const useHandleTasks = (): IUseHandleTasksResponse => {
  const [tasks, setTasks] = useState<ITask[]>(resetTaskToNewDay());

  useEffectWithDebouncing(() => saveTasks(tasks), [tasks], TIME_IN_MS_TO_SAVE_TASKS);

  const handleAddNewTask = (): void => {
    setTasks((prev: ITask[]) => [...prev, buildNewTask()]);
  };

  const handleAddBatchNewTasks = (tasksBatch: ITask[]): void => {
    setTasks((prev: ITask[]) => [...prev, ...tasksBatch]);
  };

  const handleDropTask = (taskId: string): void => {
    const tasksWithoutDropped = tasks.filter((task: ITask) => task.id !== taskId);
    setTasks(tasksWithoutDropped);
  };

  const handleUpdateTask = (taskId: string, newData: Partial<ITask>): void => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, ...newData } : task)));
  };

  const handleResetToNewDay = () => {
    setTasks(resetTaskToNewDay());
  };
  return {
    handleDropTask,
    handleUpdateTask,
    handleAddNewTask,
    handleResetToNewDay,
    handleAddBatchNewTasks,
    tasks,
  };
};
