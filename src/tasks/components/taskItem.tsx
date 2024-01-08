import type { ReactElement } from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import type { ITask } from '@/tasks/types';
import { TaskStatusEnum } from '@/tasks/types';
import { TaskContext } from '@/tasks/contexts/taskContext';
import { InputText } from '@/common/inputText';
import { BlockCheck } from '@/common/blockCheck';
import { useOutsideClick } from '../../common/useOutsideClick';
import { useHandleKeyboard } from '../../common/useHandleKeyboard';

interface ITaskItemProps {
  task: ITask;
}

export const TaskItem = ({ task }: ITaskItemProps): ReactElement => {
  const [name, setName] = useState<string>(task.description);
  const [openMenu, setOpenMenu] = useState(false);
  const { handleUpdateTask, handleDropTask } = useContext(TaskContext);

  const refOptions = useRef<HTMLDivElement>(null);
  useOutsideClick(refOptions, () => {
    setOpenMenu(false);
  });

  useEffect(() => {
    if (task.description !== name) {
      handleUpdateTask(task.id, { description: name });
    }
  }, [name]);

  useHandleKeyboard((key) => {
    if (key === 'Escape') {
      setOpenMenu(false);
    }
  });

  return (
    <div className="group shadow-md flex items-center justify-center ">
      <div className="min-w-[16px]" />
      <div className="py-[1rem] text-left relative ">
        <div
          ref={refOptions}
          className={`${
            openMenu ? '' : 'hidden'
          } fixed top-0 left-0 bottom-0 right-0 bg-background/40 backdrop-blur-sm transition-all duration-150`}
        />
        <div
          className={`${
            openMenu ? '' : 'hidden'
          } bg-background border border-textColor/25 rounded-lg shadow-lg absolute left-[2rem] top-[2.5rem] min-w-[15rem] z-20`}>
          <div className="min-h-[0.5rem]" />

          <h3 className="text-base text-center text-textColor">Opções</h3>

          <div className="pt-[0.5rem]" />

          <button
            type="button"
            className="px-4 py-2 hover:bg-textColor/10 transition-all duration-150 w-full text-left"
            onClick={(): void => {
              handleDropTask(task.id);
            }}>
            Apagar
          </button>

          <div className="min-h-[0.5rem]" />
        </div>
        <button
          onClick={() => setOpenMenu((prev) => !prev)}
          type="button"
          className=" flex items-center justify-center p-2 border border-transparent hover:border-textColor/20 hover:bg-textColor/10 rounded-full">
          <div className="rounded-full transition-all duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="4"
              viewBox="0 0 128 512"
              className="fill-textColor w-[16px] h-[16px]">
              <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
            </svg>
          </div>
        </button>
      </div>

      <div className="text-left w-full  overflow-hidden text-ellipsis">
        <InputText
          name="name"
          isRisked={task.status === TaskStatusEnum.completed}
          value={name}
          update={(value): void => setName(value)}
        />
      </div>

      <div className="text-left">
        <BlockCheck
          isChecked={task.status === TaskStatusEnum.completed}
          update={(newValue) => {
            if (newValue) {
              handleUpdateTask(task.id, { status: TaskStatusEnum.completed });
            } else {
              handleUpdateTask(task.id, { status: TaskStatusEnum.available });
            }
          }}
        />
      </div>
    </div>
  );
};
