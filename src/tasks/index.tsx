import { TaskList } from '@/tasks/components/TaskList';
import { Title } from '@/common/components/Title';
import { TaskSettings } from '@/tasks/components/TaskSettings';

export const TasksScreen = () => {
  return (
    <div className="px-4 pb-64">
      <header>
        <Title>MY DAY</Title>
      </header>

      <main>
        <TaskList />
      </main>
      <footer>
        <TaskSettings />
      </footer>
    </div>
  );
};
