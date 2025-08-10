import { useEffect, useReducer } from "react";

import { KanbanContext } from "./KanbanContext";
import { kanbanReducer } from "./kanbanReducer";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { initialState } from "../../utils/constants";

import type { KanbanStateType } from "../../types/kanban";

export const KanbanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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