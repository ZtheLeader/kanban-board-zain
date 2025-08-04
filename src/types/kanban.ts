export type Task = {
  id: string;
  title: string;
  description: string;
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

export type KanbanState = {
  columns: { [key: string]: Column };
  tasks: { [key: string]: Task };
};