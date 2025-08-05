import type { TaskType } from '../../types/kanban';
import { useKanban } from '../../context/kanban/useKanban';

type TaskCardProps = {
  task: TaskType;
  columnId: string;
};

const TaskCard = ({ task, columnId }: TaskCardProps) => {
  const { dispatch } = useKanban();

  const handleDeleteTask = () => {
    dispatch({ type: 'DELETE_TASK', payload: { taskId: task.id, columnId } });
  };

  const handleEditTask = () => {
    const newTitle = window.prompt("Edit task title:", task.title);
    if (newTitle) {
      dispatch({ type: 'EDIT_TASK', payload: { taskId: task.id, title: newTitle, description: task.description } });
    }
  };

  return (
    <div className="bg-gray-600 p-3 rounded-md shadow-md cursor-pointer hover:bg-gray-500 transition-colors duration-200">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-white">{task.title}</p>
        <div className="flex gap-2">
          <button
            onClick={handleEditTask}
            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            aria-label="Edit task"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteTask}
            className="text-gray-400 hover:text-red-500 font-bold transition-colors duration-200 text-2xl leading-none"
            aria-label="Delete task"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;