
import React, { createContext } from 'react';

import type { Action } from './kanbanReducer';
import type { KanbanState } from '../../types/kanban';

export const KanbanContext = createContext<{
  state: KanbanState | null;
  dispatch: React.Dispatch<Action>;
}>({
  state: null,
  dispatch: () => null,
});



