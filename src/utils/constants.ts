import type { KanbanStateType } from "../types/kanban";

export const initialState: KanbanStateType = {
  columns: {
    'column-1': { id: 'column-1', title: 'To Do', taskIds: ['task-1', 'task-2'] },
    'column-2': { id: 'column-2', title: 'In Progress', taskIds: ['task-3'] },
    'column-3': { id: 'column-3', title: 'Done', taskIds: [] },
  },
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Set up project',
      description: 'Initialize the Vite project and set up Tailwind CSS.',
      commentIds: ['comment-1'],
    },
    'task-2': {
      id: 'task-2',
      title: 'Implement state management',
      description: 'Create the Kanban context and reducer.',
      commentIds: [],
    },
    'task-3': {
      id: 'task-3',
      title: 'Build UI components',
      description: 'Develop the core UI for the columns and task cards.',
      commentIds: ['comment-2'],
    },
  },
  comments: {
    'comment-1': {
      id: 'comment-1',
      taskId: 'task-1',
      text: 'Remember to use `Date.now()` for new IDs.',
    },
    'comment-2': {
      id: 'comment-2',
      taskId: 'task-3',
      text: 'The UI should be dark-themed, as per the Figma design.',
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};