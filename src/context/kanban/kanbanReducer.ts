import type { KanbanStateType } from "../../types/kanban";

export type Action =
  | { type: 'ADD_COLUMN'; payload: { id: string; title: string } }
  | { type: 'RENAME_COLUMN'; payload: { id: string; newTitle: string } }
  | { type: 'DELETE_COLUMN'; payload: { id: string } }
  | { type: 'ADD_TASK'; payload: { taskId: string; columnId: string; title: string; description: string } }
  | { type: 'EDIT_TASK'; payload: { taskId: string; title: string; description: string } }
  | { type: 'DELETE_TASK'; payload: { taskId: string; columnId: string } }
  | { type: 'MOVE_TASK'; payload: { taskId: string; fromColumnId: string; toColumnId: string; newIndex: number } }
  | { type: 'REORDER_TASK_IN_COLUMN'; payload: { taskId: string; columnId: string; newIndex: number } };


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
      };
    }
    case 'RENAME_COLUMN': {
      return state;
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
      };
    }
    case 'ADD_TASK': {
      const { taskId, columnId, title, description } = action.payload;
      const newTasks = {
        ...state.tasks,
        [taskId]: { id: taskId, title, description },
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
      return state;
    }
    case 'REORDER_TASK_IN_COLUMN': {
      return state;
    }
    default:
      return state;
  }
};