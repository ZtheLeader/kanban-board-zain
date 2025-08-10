import type { KanbanStateType } from '../types/kanban';
import type { Action } from './index';

export function columnReducer(state: KanbanStateType, action: Action): KanbanStateType {
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
    default:
      return state;
  }
}
