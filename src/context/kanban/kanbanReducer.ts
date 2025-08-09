import type { KanbanStateType } from "../../types/kanban";

export type Action =
  | { type: 'ADD_COLUMN'; payload: { id: string; title: string } }
  | { type: 'RENAME_COLUMN'; payload: { id: string; newTitle: string } }
  | { type: 'DELETE_COLUMN'; payload: { id: string } }
  | { type: 'ADD_TASK'; payload: { taskId: string; columnId: string; title: string; description: string } }
  | { type: 'EDIT_TASK'; payload: { taskId: string; title: string; description: string } }
  | { type: 'DELETE_TASK'; payload: { taskId: string; columnId: string } }
  | { type: 'MOVE_TASK'; payload: { taskId: string; fromColumnId: string; toColumnId: string; newIndex: number } }
  | { type: 'REORDER_TASK_IN_COLUMN'; payload: { taskId: string; columnId: string; newIndex: number } }
  | { type: 'REARRANGE_COLUMNS'; payload: { columnOrder: string[] } }
  | { type: 'ADD_COMMENT'; payload: { commentId: string; taskId: string; text: string } }
  | { type: 'EDIT_COMMENT'; payload: { commentId: string; newText: string } }
  | { type: 'DELETE_COMMENT'; payload: { commentId: string; taskId: string } };


export const kanbanReducer = (state: KanbanStateType, action: Action): KanbanStateType => {
  switch (action.type) {
    case 'ADD_COLUMN': {
      const { id, title } = action.payload;
      return {
        ...state,
        columns: {
          ...state.columns,
          [id]: { id, title, taskIds: [] },
        },
        columnOrder: [...state.columnOrder, id],
      };
    }
    case 'RENAME_COLUMN': {
      const { id, newTitle } = action.payload;
      return {
        ...state,
        columns: {
          ...state.columns,
          [id]: {
            ...state.columns[id],
            title: newTitle,
          },
        },
      };
    }
    case 'DELETE_COLUMN': {
      const { id } = action.payload;

      const taskIdsToDelete = state.columns[id].taskIds;

      const newColumns = { ...state.columns };
      delete newColumns[id];

      const newTasks = { ...state.tasks };
      taskIdsToDelete.forEach(taskId => {
        delete newTasks[taskId];
      });

      return {
        ...state,
        columns: newColumns,
        tasks: newTasks,
        columnOrder: state.columnOrder.filter(columnId => columnId !== id),
      };
    }
    case 'ADD_TASK': {
      const { taskId, columnId, title, description } = action.payload;
      const newTasks = {
        ...state.tasks,
        [taskId]: { id: taskId, title, description, commentIds: [] },
      };
      const newColumnTaskIds = [...state.columns[columnId].taskIds, taskId];
      const newColumns = {
        ...state.columns,
        [columnId]: {
          ...state.columns[columnId],
          taskIds: newColumnTaskIds,
        },
      };
      return {
        ...state,
        columns: newColumns,
        tasks: newTasks,
      };
    }
    case 'EDIT_TASK': {
      const { taskId, title, description } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...state.tasks[taskId],
            title,
            description,
          },
        },
      };
    }
    case 'DELETE_TASK': {
      const { taskId, columnId } = action.payload;

      const newTasks = { ...state.tasks };
      delete newTasks[taskId];

      const newColumnTaskIds = state.columns[columnId].taskIds.filter(id => id !== taskId);
      const newColumns = {
        ...state.columns,
        [columnId]: {
          ...state.columns[columnId],
          taskIds: newColumnTaskIds,
        },
      };

      return {
        ...state,
        columns: newColumns,
        tasks: newTasks,
      };
    }
    case 'MOVE_TASK': {
      const { taskId, fromColumnId, toColumnId, newIndex } = action.payload;
      const fromColumn = state.columns[fromColumnId];
      const toColumn = state.columns[toColumnId];

      const newFromTaskIds = [...fromColumn.taskIds].filter(id => id !== taskId);
      const newToTaskIds = [...toColumn.taskIds];
      newToTaskIds.splice(newIndex, 0, taskId);

      return {
        ...state,
        columns: {
          ...state.columns,
          [fromColumnId]: {
            ...fromColumn,
            taskIds: newFromTaskIds,
          },
          [toColumnId]: {
            ...toColumn,
            taskIds: newToTaskIds,
          },
        },
      };
    }
    case 'REORDER_TASK_IN_COLUMN': {
      const { taskId, columnId, newIndex } = action.payload;
      const column = state.columns[columnId];
      const newTasksIds = [...column.taskIds];
      newTasksIds.splice(newTasksIds.indexOf(taskId), 1);
      newTasksIds.splice(newIndex, 0, taskId);
      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: {
            ...column,
            taskIds: newTasksIds,
          },
        },
      };
    }
    case 'REARRANGE_COLUMNS': {
      const { columnOrder } = action.payload;
      return {
        ...state,
        columnOrder,
      };
    }
    case 'ADD_COMMENT': {
      const { commentId, taskId, text } = action.payload;
      const newComments = {
        ...state.comments,
        [commentId]: { id: commentId, taskId, text },
      };
      const newTasks = {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          commentIds: [...state.tasks[taskId].commentIds, commentId],
        },
      };
      return {
        ...state,
        comments: newComments,
        tasks: newTasks,
      };
    }
    case 'EDIT_COMMENT': {
      const { commentId, newText } = action.payload;
      return {
        ...state,
        comments: {
          ...state.comments,
          [commentId]: {
            ...state.comments[commentId],
            text: newText,
          },
        },
      };
    }
    case 'DELETE_COMMENT': {
      const { commentId, taskId } = action.payload;
      const newComments = { ...state.comments };
      delete newComments[commentId];
      const newTasks = {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          commentIds: state.tasks[taskId].commentIds.filter(id => id !== commentId),
        },
      };
      return {
        ...state,
        comments: newComments,
        tasks: newTasks,
      };
    }
    default:
      return state;
  }
};