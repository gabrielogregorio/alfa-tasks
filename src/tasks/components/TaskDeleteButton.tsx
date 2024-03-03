import { ReactElement, useContext } from 'react';
import { ITask } from '@/tasks/types';
import { TaskContext } from '@/tasks/contexts/TaskContext';
import { TrashIcon } from '@/common/icons';

interface ITaskDeleteButtonProps {
  task: ITask;
}

export const TaskDeleteButton = ({ task }: ITaskDeleteButtonProps): ReactElement => {
  const { handleDropTask } = useContext(TaskContext);

  return (
    <button
      onClick={() => handleDropTask(task.id)}
      type="button"
      aria-label="Deletar tarefa"
      className=" min-h-[68px] flex items-center justify-center p-2 border border-transparent hover:border-textColor/20 hover:bg-textColor/10">
      <div className="transition-all duration-150">
        <TrashIcon />
      </div>
    </button>
  );
};
