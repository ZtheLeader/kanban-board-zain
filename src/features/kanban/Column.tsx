import { Droppable } from '@hello-pangea/dnd';
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
    const confirmDelete = window.confirm("Are you sure you want to delete this column?");
    if (confirmDelete) {
      dispatch({ type: 'DELETE_COLUMN', payload: { id: column.id } });
    }
  };

  const handleAddTask = () => {
    const taskTitle = window.prompt("Enter task title:");
    if (!taskTitle) return;

    const taskDescription = window.prompt("Enter task description:");
    if (!taskDescription) return;

    const taskId = Date.now().toString();
    dispatch({
      type: 'ADD_TASK',
      payload: { taskId, columnId: column.id, title: taskTitle, description: taskDescription },
    });
  };

  const handleEditColumn = () => {
    const newTitle = window.prompt("Edit column title:", column.title);
    if (newTitle) {
      dispatch({ type: 'RENAME_COLUMN', payload: { id: column.id, newTitle } });
    }
  };

  return (
    <div className="flex-shrink-0 w-80 bg-gray-800 rounded-lg p-4 shadow-lg h-full max-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-300">{column.title}</h2>
        <div>
          <button onClick={handleEditColumn} className='text-gray-400 hover:text-blue-500 font-bold transition-colors duration-200 leading-none px-2' aria-label="Edit column">
            Edit
          </button>

          <button
            onClick={handleDeleteColumn}
            className="text-gray-400 hover:text-red-500 font-bold transition-colors duration-200 leading-none px-2"
            aria-label="Delete column"
          >
            Delete
          </button>
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex flex-col gap-2 overflow-y-auto transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-gray-700' : ''} min-h-[1px]`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} columnId={column.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

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
