import { useReducer, type ReactNode } from "react";

import { KanbanContext } from "./KanbanContext";
import { kanbanReducer } from "./kanbanReducer";
import type { KanbanStateType } from "../../types/kanban";

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
};

export const KanbanProvider = ({ children }: KanbanProviderProps) => {
  const [state, dispatch] = useReducer(kanbanReducer, initialState);

  return (
    <KanbanContext.Provider value={{ state, dispatch }}>
      {children}
    </KanbanContext.Provider>
  );
};