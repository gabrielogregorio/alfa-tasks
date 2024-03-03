import { ITask } from '@/tasks/types';
import { useContext } from 'react';
import { TaskContext } from '@/tasks/contexts/TaskContext';
import { useTextOnActionAndResetAfterDelay } from '@/common/hooks/useTextOnActionAndResetAfterDelay';
import { downloadFile } from '@/common/utils/downloadFIle';
import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard';
import { useReadFromClipboard } from '@/common/hooks/useReadFromClipboard';
import { Button } from '@/common/components/Button';
import { getCurrentDate } from '@/common/utils/getCurrentDate';

export const TaskSettings = () => {
  const { copy } = useCopyToClipboard();
  const { readClipboard } = useReadFromClipboard();
  const { tasks, handleAddBatchNewTasks } = useContext(TaskContext);

  const handleDownloadLocalStorage = (): void => {
    const dataStorage = JSON.stringify(tasks, undefined, 2);
    const fileName = `backup-tasks-${new Date().getTime().toString()}json`;

    downloadFile(dataStorage, fileName, { type: 'application/json' });
  };

  const handleCopyToClipboard = (): void => {
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

        const availableStatus = ['available', 'completed', 'disabled'];

        if (!availableStatus.includes(task.status)) {
          errorLine = index + 1;
          errorCause = `status is invalid "${task.status}", only "${JSON.stringify(availableStatus)}"`;
          throw new Error('');
        }

        newTasksHandled.push({
          description: possibleDescription,
          id: `${index}${new Date().getTime().toString()}`,
          lastResetDate: getCurrentDate(),
          status: task.status,
        });
      });

      // eslint-disable-next-line no-console
      console.log(newTasksHandled);
      handleAddBatchNewTasks(newTasksHandled);
    } catch (error: unknown) {
      alert(`Error on copy item on line '${errorLine}', error ${errorCause}`);
    }
  };

  const copyBackupData = useTextOnActionAndResetAfterDelay({
    referenceText: 'COPIAR BACKUP',
    alternativeText: 'COPIANDO...',
  });

  return (
    <div className="w-full flex items-center justify-center mt-[10rem]">
      <div className='flex flex-col gap-8 max-w-[720px] w-full"'>
        <Button className="text-[2rem]" content="DOWNLOAD BACKUP" onClick={() => handleDownloadLocalStorage()} />
        <Button
          className="text-[2rem]"
          content={copyBackupData.text}
          onClick={() => {
            copyBackupData.action();
            handleCopyToClipboard();
          }}
        />
        <Button
          className="text-[2rem]"
          content="CARREGAR BACKUP"
          onClick={() => {
            readClipboard()
              .then((data) => {
                return handlePastToClipboard(data);
              })
              .catch(() => {
                //
              });
          }}
        />
      </div>
    </div>
  );
};
