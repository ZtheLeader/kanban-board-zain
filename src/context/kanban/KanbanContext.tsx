
import React, { createContext } from 'react';

import type { KanbanStateType } from '../../types/kanban';
import type { Action } from '../../reducer';

export const KanbanContext = createContext<{
  state: KanbanStateType;
  dispatch: React.Dispatch<Action>;
} | null>(null);



