import type { KanbanStateType } from "../../types/kanban";

import { boardReducer } from './boardReducer';
import { columnReducer } from './columnReducer';
import { taskReducer } from './taskReducer';

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
    // Board-level actions
    case 'REARRANGE_COLUMNS':
      return boardReducer(state, action);

    // Column-level actions
    case 'ADD_COLUMN':
    case 'RENAME_COLUMN':
    case 'DELETE_COLUMN':
    case 'MOVE_TASK':
    case 'REORDER_TASK_IN_COLUMN':
      return columnReducer(state, action);

    // Task and comment actions
    case 'ADD_TASK':
    case 'EDIT_TASK':
    case 'DELETE_TASK':
    case 'ADD_COMMENT':
    case 'EDIT_COMMENT':
    case 'DELETE_COMMENT':
      return taskReducer(state, action);

    default:
      return state;
  }
};