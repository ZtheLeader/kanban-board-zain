import type { TaskType } from '../../types/kanban';

type TaskCardProps = {
  task: TaskType;
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="bg-gray-600 p-3 rounded-md shadow-md cursor-pointer hover:bg-gray-500 transition-colors duration-200">
      <p className="font-semibold text-white">{task.title}</p>
    </div>
  );
};

export default TaskCard;