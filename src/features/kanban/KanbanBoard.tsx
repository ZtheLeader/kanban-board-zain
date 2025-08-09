import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { useKanban } from '../../context/kanban/useKanban';
import Column from './Column';

const KanbanBoard = () => {
  const { state, dispatch } = useKanban();

  const handleAddColumn = () => {
    const newColumnId = Date.now().toString();
    dispatch({ type: 'ADD_COLUMN', payload: { id: newColumnId, title: 'New Column' } });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (type === 'COLUMN') {
      const newColumnOrder = Array.from(state.columnOrder);
      const [movedColumn] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, movedColumn);

      dispatch({
        type: 'REARRANGE_COLUMNS',
        payload: { columnOrder: newColumnOrder },
      });
    }
    if (type === 'TASK') {
      if (destination.droppableId === source.droppableId) {
        dispatch({
          type: 'REORDER_TASK_IN_COLUMN',
          payload: {
            taskId: draggableId,
            columnId: source.droppableId,
            newIndex: destination.index,
          },
        });
      } else {
        dispatch({
          type: 'MOVE_TASK',
          payload: {
            taskId: draggableId,
            fromColumnId: source.droppableId,
            toColumnId: destination.droppableId,
            newIndex: destination.index,
          },
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex-1 overflow-x-auto p-4 flex gap-4 bg-gray-900 text-white"
          >
            {state.columnOrder.map((columnId: string, index: number) => (
              <Draggable key={columnId} draggableId={columnId} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="flex-shrink-0"
                  >
                    <div {...provided.dragHandleProps}>
                      <Column column={state.columns[columnId]} />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <button
              onClick={handleAddColumn}
              className="flex-shrink-0 w-80 h-16 p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 shadow-lg flex items-center justify-center text-gray-400 font-medium"
            >
              + Add new column
            </button>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default KanbanBoard;