import { Tasks } from '@/tasks/components/tasks';
import { Options } from '@/common/options';
import { Title } from '@/common/title';

export const TasksScreen = () => {
  return (
    <div className="px-4 pb-64">
      <header>
        <Title>MY DAY</Title>
      </header>

      <main>
        <Tasks />
      </main>
      <footer>
        <Options />
      </footer>
    </div>
  );
};
