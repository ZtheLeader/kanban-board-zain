export type TaskType = {
  id: string;
  title: string;
  description: string;
};

export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

export type KanbanStateType = {
  columns: { [key: string]: ColumnType };
  tasks: { [key: string]: TaskType };
  columnOrder: string[];
};