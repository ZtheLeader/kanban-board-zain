import { useEffect, useReducer, type ReactNode } from "react";

import { KanbanContext } from "./KanbanContext";
import { kanbanReducer } from "./kanbanReducer";
import type { KanbanStateType } from "../../types/kanban";
import { useLocalStorage } from "../../hooks/useLocalstorage";

type KanbanProviderProps = {
  children: ReactNode;
};

const initialState: KanbanStateType = {
  columns: {
    'column-1': { id: 'column-1', title: 'To Do', taskIds: [] },
    'column-2': { id: 'column-2', title: 'In Progress', taskIds: [] },
    'column-3': { id: 'column-3', title: 'Done', taskIds: [] },
  },
  tasks: {},
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export const KanbanProvider = ({ children }: KanbanProviderProps) => {
  const [localState, setLocalState] = useLocalStorage<KanbanStateType>('kanban-board-state', initialState);

  const [state, dispatch] = useReducer(kanbanReducer, localState);

  useEffect(() => {
    setLocalState(state);
  }, [state, setLocalState]);

  return (
    <KanbanContext.Provider value={{ state, dispatch }}>
      {children}
    </KanbanContext.Provider>
  );
};