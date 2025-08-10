import type { Action } from '.';
import type { KanbanStateType } from '../types/kanban';

export function taskReducer(state: KanbanStateType, action: Action): KanbanStateType {
  switch (action.type) {
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
}
