import { useContext } from "react";

import { KanbanContext } from "./KanbanContext";

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('Make sure to wrap your application in KanbanProvider');
  }
  return context;
};