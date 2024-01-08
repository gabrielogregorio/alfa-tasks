/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactElement } from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tasks } from '@/tasks/components/tasks';
import { TaskContext } from '@/tasks/contexts/taskContext';
import type { ITask } from '@/tasks/types';
import { TaskStatusEnum } from '@/tasks/types';
import { useCopyToClipboard } from '../common/useCopyToClipboard';
import { useReadFromClipboard } from '../common/useReadFromClipboard';
import { TitleSimpleMenu } from '../common/TitleSimpleMenu';
import { ItemSimpleMenu } from '../common/ItemSimpleMenu';
import { FirstLevelMenu } from '../common/FirstLevelMenu';
import { useHandleKeyboard } from '../common/useHandleKeyboard';
import { useOutsideClick } from '../common/useOutsideClick';
import { Button } from '../common/button';
import { Text } from '../common/text';
import { downloadFile } from '../common/downloadFIle';

export const TasksPage = (): ReactElement => {
  const [copyIsOpen, setCopyIsOpen] = useState<boolean>(false);
  const refOptions = useRef<HTMLDivElement>(null);
  const { tasks, handleAddBatchNewTasks } = useContext(TaskContext);
  const { copy } = useCopyToClipboard();
  const { readClipboard } = useReadFromClipboard();
  const [errorOnPastToClipboard, setErrorOnPastToClipboard] = useState<string>('');
  const [content, setContent] = useState(``);

  const navigate = useNavigate();

  useHandleKeyboard((key) => {
    if (key === 'Escape') {
      navigate('/');
    }
  });

  const { clickedOutside } = useOutsideClick(refOptions);
  useEffect(() => {
    setCopyIsOpen(false);
  }, [clickedOutside]);

  const handleDownloadLocalstorage = (): void => {
    // eslint-disable-next-line no-magic-numbers
    const dataStorage = JSON.stringify(tasks, undefined, 2);
    const fileName = `backup-tasks-${new Date().getTime().toString()}json`;

    downloadFile(dataStorage, fileName, { type: 'application/json' });
  };

  const handleCopyToClipboard = (): void => {
    // eslint-disable-next-line no-magic-numbers
    const dataStorage = JSON.stringify(tasks, undefined, 2);
    copy(dataStorage);
  };

  const handlePastToClipboard = async (contentTasks: string): Promise<void> => {
    let errorLine = 0;
    let errorCause = '';
    const newTasksHandled: ITask[] = [];
    try {
      const possibleTasks: ITask[] = JSON.parse(contentTasks);
      possibleTasks.forEach((task, index) => {
        const possibleDescription = task.description;
        if (typeof possibleDescription !== 'string') {
          errorLine = index + 1;
          errorCause = 'description is invalid';
          throw new Error('');
        }

        const availableStatus = [TaskStatusEnum.available, TaskStatusEnum.completed, TaskStatusEnum.disabled];

        if (!availableStatus.includes(task.status)) {
          errorLine = index + 1;
          errorCause = `status is invalid "${task.status}", only "${JSON.stringify(availableStatus)}"`;
          throw new Error('');
        }

        newTasksHandled.push({
          description: possibleDescription,
          id: `${index}${new Date().getTime().toString()}`,
          status: task.status,
        });
      });

      // eslint-disable-next-line no-console
      console.log(newTasksHandled);
      handleAddBatchNewTasks(newTasksHandled);
    } catch (error: unknown) {
      setErrorOnPastToClipboard(`Error on copy item on line '${errorLine}', error ${errorCause}`);
    }
  };

  return (
    <div className="w-full flex-1 pr-[1rem]">
      {errorOnPastToClipboard ? (
        <div className="top-0 left-0 absolute z-50 w-screen h-screen flex items-center justify-center animate-fadeInDrop">
          <div className="bg-black/70 text-white shadow-default px-[1rem] py-[1rem] rounded-[3px] border-2 border-white animate-fadeIn">
            <Text>{errorOnPastToClipboard}</Text>

            <div className="mt-[15px] flex items-center justify-end">
              <Button
                content="OK"
                onClick={() => {
                  setErrorOnPastToClipboard('');
                }}
              />

              <span className="ml-[9px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[16px] h-auto rotate-180">
                  <path
                    d="M21.75 12C21.75 9.41414 20.7228 6.93419 18.8943 5.10571C17.0658 3.27723 14.5859 2.25 12 2.25C9.41414 2.25 6.93419 3.27723 5.10571 5.10571C3.27723 6.93419 2.25 9.41414 2.25 12C2.25 14.5859 3.27723 17.0658 5.10571 18.8943C6.93419 20.7228 9.41414 21.75 12 21.75C14.5859 21.75 17.0658 20.7228 18.8943 18.8943C20.7228 17.0658 21.75 14.5859 21.75 12ZM0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      ) : undefined}

      <div className="flex-1">
        <div>
          <h1 className="text-center mt-[5rem]">My tasks</h1>

          <div className="flex items-center justify-center w-full">
            <Tasks />
          </div>
        </div>

        <div className="w-full flex items-center justify-center mt-[10rem]">
          <div className='flex flex-col max-w-[620px] w-full"'>
            <ItemSimpleMenu level="1" content="DOWNLOAD BACKUP" onClick={() => handleDownloadLocalstorage()} />
            <ItemSimpleMenu level="1" content="COPIAR BACKUP" onClick={() => handleCopyToClipboard()} />
            <ItemSimpleMenu
              level="1"
              content="CARREGAR BACKUP"
              onClick={() => {
                readClipboard()
                  .then((data) => {
                    return handlePastToClipboard(data);
                  })
                  .catch((error) => {
                    //
                  });
              }}
            />
          </div>
        </div>

        <div className="h-[5rem]" />
      </div>
    </div>
  );
};
