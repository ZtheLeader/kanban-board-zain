import { useKanban } from '../../context/kanban/useKanban';
import type { ColumnType } from '../../types/kanban';
import TaskCard from './TaskCard';

type ColumnProps = {
  column: ColumnType;
};

const Column = ({ column }: ColumnProps) => {
  const { state, dispatch } = useKanban();

  const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

  const handleDeleteColumn = () => {
    dispatch({ type: 'DELETE_COLUMN', payload: { id: column.id } });
  };

  const handleAddTask = () => {
    const taskId = Date.now().toString();
    const title = 'New Task';
    const description = 'This is a new task.';
    dispatch({
      type: 'ADD_TASK',
      payload: { taskId, columnId: column.id, title, description },
    });
  };

  return (
    <div className="flex-shrink-0 w-80 bg-gray-800 rounded-lg p-4 shadow-lg h-full max-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-300">{column.title}</h2>
        <button
          onClick={handleDeleteColumn}
          className="text-gray-400 hover:text-red-500 font-bold transition-colors duration-200 text-2xl leading-none px-2"
          aria-label="Delete column"
        >
          X
        </button>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <button
        onClick={handleAddTask}
        className="mt-4 w-full p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200 text-gray-300 font-medium"
      >
        + Add task
      </button>
    </div>
  );
};

export default Column;