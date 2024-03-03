import { ReactElement, useContext, useEffect, useState } from 'react';
import { ITask } from '@/tasks/types';
import { TaskContext } from '@/tasks/contexts/TaskContext';
import { EditableTextInput } from '@/common/components/EditableTextInput';
import { Checkbox } from '@/common/components/Checkbox';
import { TaskDeleteButton } from '@/tasks/components/TaskDeleteButton';

interface ITaskItemOptionsProps {
  task: ITask;
}

export const TaskItemOptions = ({ task }: ITaskItemOptionsProps): ReactElement => {
  const [name, setName] = useState<string>(task.description);

  const { handleUpdateTask } = useContext(TaskContext);

  useEffect(() => {
    if (task.description !== name) {
      handleUpdateTask(task.id, { description: name });
    }
  }, [name]);

  return (
    <div className="group shadow-md flex items-center justify-center ">
      <div className="min-w-[16px] !bg-blue-300" />

      <TaskDeleteButton task={task} />

      <div className="text-left w-full overflow-hidden text-ellipsis">
        <EditableTextInput
          name="name"
          isRisked={task.status === 'completed'}
          value={name}
          update={(value: string): void => setName(value)}
        />
      </div>

      <div>
        <Checkbox
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
