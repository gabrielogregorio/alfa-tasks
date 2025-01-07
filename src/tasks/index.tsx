import { TaskList } from '@/tasks/components/TaskList';
import { TaskSettings } from '@/tasks/components/TaskSettings';
import { Button } from '@/common/components/Button';
import { Counter } from '@/tasks/components/counter';
import { CurrentDate } from '@/tasks/components/CurrentDate';
import { useResetOnNewDay } from '@/tasks/hooks/useResetOnNewDay';
import { MyWeight } from '../weight/weight';

export const TasksScreen = () => {
  useResetOnNewDay();

  return (
    <div className="px-4 pb-64">
      <header>
        <div className="flex items-center justify-center ">
          <Button
            className="text-[4rem] mt-16"
            content="MY DAY"
            onClick={() => {
              window.location.reload();
            }}
          />
        </div>
      </header>

      <main>
        <CurrentDate />

        <MyWeight />

        <Counter />

        <TaskList />
      </main>
      <footer>
        <TaskSettings />
      </footer>
    </div>
  );
};
