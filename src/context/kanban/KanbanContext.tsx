
import React, { createContext } from 'react';

import type { Action } from './kanbanReducer';
import type { KanbanStateType } from '../../types/kanban';
import { initialState } from './KanbanContextProvider';

export const KanbanContext = createContext<{
  state: KanbanStateType;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});



