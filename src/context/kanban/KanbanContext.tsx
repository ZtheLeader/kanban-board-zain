
import React, { createContext } from 'react';

import type { Action } from './kanbanReducer';
import type { KanbanStateType } from '../../types/kanban';

export const KanbanContext = createContext<{
  state: KanbanStateType | null;
  dispatch: React.Dispatch<Action>;
}>({
  state: null,
  dispatch: () => null,
});



