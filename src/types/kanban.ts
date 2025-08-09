export type Comment = {
  id: string;
  text: string;
  taskId: string;
};

export type TaskType = {
  id: string;
  title: string;
  description: string;
  commentIds: string[];
};

export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

export type KanbanStateType = {
  columns: { [key: string]: ColumnType };
  tasks: { [key: string]: TaskType };
  comments: { [key: string]: Comment };
  columnOrder: string[];
};