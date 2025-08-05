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
      return state;
    }
    case 'RENAME_COLUMN': {
      return state;
    }
    case 'DELETE_COLUMN': {
      return state;
    }
    case 'ADD_TASK': {
      return state;
    }
    case 'EDIT_TASK': {
      return state;
    }
    case 'DELETE_TASK': {
      return state;
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