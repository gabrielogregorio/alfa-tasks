import { ReactElement, useContext } from 'react';
import { TaskItemOptions } from '@/tasks/components/TaskItemOptions';
import { ITask } from '@/tasks/types';
import { TaskContext } from '@/tasks/contexts/TaskContext';
import { Button } from '@/common/components/Button';

export const TaskList = (): ReactElement => {
  const { tasks, handleAddNewTask } = useContext(TaskContext);

  return (
    <div className="overflow-hidden flex items-center justify-center">
      <div className="flex flex-col gap-[21px] mt-[6rem] max-w-[720px] w-full">
        <div className="flex flex-col gap-8">
          {tasks.map((task: ITask) => {
            return <TaskItemOptions key={task.id} task={task} />;
          })}
        </div>

        <div className="flex items-center justify-start">
          <span className="font-semibold text-[1rem]" />

          <Button onClick={handleAddNewTask} className="w-full text-[2rem] mt-8" content="NEW TASK" />
        </div>
      </div>
    </div>
  );
};
