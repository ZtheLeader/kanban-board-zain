import type { KanbanStateType } from '../../types/kanban';
import type { Action } from './kanbanReducer';

export function boardReducer(state: KanbanStateType, action: Action): KanbanStateType {
  switch (action.type) {
    case 'REARRANGE_COLUMNS': {
      const { columnOrder } = action.payload;
      return {
        ...state,
        columnOrder,
      };
    }
    default:
      return state;
  }
}
