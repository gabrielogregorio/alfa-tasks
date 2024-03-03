type TaskStatusType = 'available' | 'disabled' | 'completed';

export interface ITask {
  id: string;
  description: string;
  lastResetDate: string;
  status: TaskStatusType;
}
