import { ReactElement, useContext, useEffect, useState } from 'react';
import { ITask } from '@/tasks/types';
import { TaskContext } from '@/tasks/contexts/taskContext';
import { InputText } from '@/common/inputText';
import { BlockCheck } from '@/common/blockCheck';
import { TrashIcon } from '@/common/icons';

interface ITaskItemProps {
  task: ITask;
}

export const TaskItem = ({ task }: ITaskItemProps): ReactElement => {
  const [name, setName] = useState<string>(task.description);

  const { handleUpdateTask, handleDropTask } = useContext(TaskContext);

  useEffect(() => {
    if (task.description !== name) {
      handleUpdateTask(task.id, { description: name });
    }
  }, [name]);

  return (
    <div className="group shadow-md flex items-center justify-center ">
      <div className="min-w-[16px] !bg-blue-300" />

      <button
        onClick={() => handleDropTask(task.id)}
        type="button"
        aria-label="Deletar tarefa"
        className=" min-h-[68px] flex items-center justify-center p-2 border border-transparent hover:border-textColor/20 hover:bg-textColor/10">
        <div className="transition-all duration-150">
          <TrashIcon />
        </div>
      </button>

      <div className="text-left w-full overflow-hidden text-ellipsis">
        <InputText
          name="name"
          isRisked={task.status === 'completed'}
          value={name}
          update={(value): void => setName(value)}
        />
      </div>

      <div>
        <BlockCheck
          isChecked={task.status === 'completed'}
          update={(newValue) => {
            if (newValue) {
              handleUpdateTask(task.id, { status: 'completed' });
            } else {
              handleUpdateTask(task.id, { status: 'available' });
            }
          }}
        />
      </div>
    </div>
  );
};
