import type { ReactElement } from 'react';
import { useContext } from 'react';
import { TaskItem } from '@/tasks/components/taskItem';
import type { ITask } from '@/tasks/types';
import { TaskContext } from '@/tasks/contexts/taskContext';
import { Button } from '../../common/button';

export const Tasks = (): ReactElement => {
  const { tasks, handleAddNewTask } = useContext(TaskContext);

  return (
    <div className="flex flex-col gap-[21px] mt-[1rem] max-w-[620px] w-full">
      <div className="flex flex-col gap-2">
        {tasks.map((task: ITask) => {
          return <TaskItem key={task.id} task={task} />;
        })}
      </div>

      <div className="flex items-center justify-start">
        <span className="font-semibold text-[1rem]" />

        <Button onClick={(): void => handleAddNewTask()} className="w-full" content="NOVA TASK" />
      </div>
    </div>
  );
};
