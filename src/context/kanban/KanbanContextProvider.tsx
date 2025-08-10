import { useEffect, useReducer, type ReactNode } from "react";

import { KanbanContext } from "./KanbanContext";
import { kanbanReducer } from "./kanbanReducer";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { initialState } from "../../utils/constants";

import type { KanbanStateType } from "../../types/kanban";

type KanbanProviderProps = {
  children: ReactNode;
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