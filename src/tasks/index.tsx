import { TaskList } from '@/tasks/components/TaskList';
import { Title } from '@/common/components/Title';
import { TaskSettings } from '@/tasks/components/TaskSettings';
import { Button } from '@/common/components/Button';

export const TasksScreen = () => {
  return (
    <div className="px-4 pb-64">
      <header>
        <Title>MY DAY</Title>
      </header>

      <main>
        <div className="flex items-center justify-center">
          <Button
            className="text-[2rem] mt-16"
            content="RELOAD"
            onClick={() => {
              window.location.reload();
            }}
          />
        </div>
        <TaskList />
      </main>
      <footer>
        <TaskSettings />
      </footer>
    </div>
  );
};
