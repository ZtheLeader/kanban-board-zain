import { Draggable } from "@hello-pangea/dnd";
import { useKanban } from "../../context/kanban/useKanban";
import type { TaskType } from "../../types/kanban";

type TaskCardProps = {
  task: TaskType;
  columnId: string;
  index: number;
  onClick: (taskId: string, columnId: string) => void;
};

const TaskCard = ({ task, columnId, index, onClick }: TaskCardProps) => {
  const { dispatch } = useKanban();

  const handleDeleteTask = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      dispatch({ type: 'DELETE_TASK', payload: { taskId: task.id, columnId } });
    }
  };

  const handleEditTask = () => {
    const newTitle = window.prompt("Edit task title:", task.title);
    const newDescription = window.prompt("Edit task description:", task.description || "");
    if (newTitle !== null && newDescription !== null) {
      dispatch({ 
        type: 'EDIT_TASK', 
        payload: { 
          taskId: task.id, 
          title: newTitle, 
          description: newDescription 
        } 
      });
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={() => onClick(task.id, columnId)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`bg-white p-3 rounded border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${snapshot.isDragging ? 'border-blue-400 bg-blue-50' : ''}`}
        >
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col gap-1 min-w-0">
              <p className="font-medium text-gray-700 truncate" title={task.title}>{task.title}</p>
              {task.description && (
                <span className="text-xs text-gray-500 truncate" title={task.description}>{task.description}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEditTask}
                className="text-gray-600 hover:text-blue-600 text-xs px-2 py-1 border border-gray-200 rounded hover:border-blue-200"
                aria-label="Edit task"
                title="Edit task"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteTask}
                className="text-gray-600 hover:text-red-600 text-xs px-2 py-1 border border-gray-200 rounded hover:border-red-200"
                aria-label="Delete task"
                title="Delete task"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
