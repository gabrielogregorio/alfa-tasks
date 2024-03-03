import { ReactElement, useContext } from 'react';
import { TaskItem } from '@/tasks/components/taskItem';
import { ITask } from '@/tasks/types';
import { TaskContext } from '@/tasks/contexts/taskContext';
import { Button } from '../../common/button';

export const Tasks = (): ReactElement => {
  const { tasks, handleAddNewTask } = useContext(TaskContext);

  return (
    <div className="overflow-hidden flex items-center justify-center">
      <div className="flex flex-col gap-[21px] mt-[6rem] max-w-[720px] w-full">
        <div className="flex flex-col gap-8">
          {tasks.map((task: ITask) => {
            return <TaskItem key={task.id} task={task} />;
          })}
        </div>

        <div className="flex items-center justify-start">
          <span className="font-semibold text-[1rem]" />

          <Button onClick={(): void => handleAddNewTask()} className="w-full text-[2rem] mt-8" content="NEW TASK" />
        </div>
      </div>
    </div>
  );
};
