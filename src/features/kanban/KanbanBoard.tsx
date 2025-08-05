import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useKanban } from '../../context/kanban/useKanban';
import Column from './Column';

const KanbanBoard = () => {
  const { state, dispatch } = useKanban();
  const { columns } = state;

  const handleAddColumn = () => {
    const newColumnId = Date.now().toString();
    dispatch({ type: 'ADD_COLUMN', payload: { id: newColumnId, title: 'New Column' } });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      dispatch({
        type: 'REORDER_TASK_IN_COLUMN',
        payload: {
          taskId: draggableId,
          columnId: source.droppableId,
          newIndex: destination.index,
        },
      });
      return;
    }

    dispatch({
      type: 'MOVE_TASK',
      payload: {
        taskId: draggableId,
        fromColumnId: source.droppableId,
        toColumnId: destination.droppableId,
        newIndex: destination.index,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="flex-1 overflow-x-auto p-4 flex gap-4 bg-gray-900 text-white">
      {Object.values(columns).map(column => (
        <Column key={column.id} column={column} />
      ))}
      <button
        onClick={handleAddColumn}
        className="flex-shrink-0 w-80 h-16 p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 shadow-lg flex items-center justify-center text-gray-400 font-medium"
      >
        + Add new column
      </button>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;