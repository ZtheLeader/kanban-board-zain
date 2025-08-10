import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { DragDropContext } from '@hello-pangea/dnd';

import Column from '../Column';
import { KanbanProvider } from '../../../context/kanban/KanbanContextProvider';

const mockColumn = {
  id: 'column-1',
  title: 'Test Column',
  taskIds: ['task-1', 'task-2'],
};

const mockTasks = {
  'task-1': { id: 'task-1', title: 'Task 1', description: 'Description 1', commentIds: [] },
  'task-2': { id: 'task-2', title: 'Task 2', description: 'Description 2', commentIds: [] },
};

const mockOnTaskClick = vi.fn();

vi.mock('../../../context/kanban/useKanban', () => ({
  useKanban: () => ({
    state: {
      tasks: mockTasks,
    },
    dispatch: vi.fn(),
  }),
}));

describe('Column Component', () => {
  const renderWithContext = (ui: React.ReactNode) => {
    return render(
      <DragDropContext onDragEnd={() => { }}>
        {ui}
      </DragDropContext>
    );
  };

  it('renders the column title and tasks', () => {
    renderWithContext(
      <KanbanProvider>
        <Column column={mockColumn} onTaskClick={mockOnTaskClick} />
      </KanbanProvider>
    );

    expect(screen.getByText('Test Column')).toBeInTheDocument();

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('calls onTaskClick when a task is clicked', () => {
    renderWithContext(
      <KanbanProvider>
        <Column column={mockColumn} onTaskClick={mockOnTaskClick} />
      </KanbanProvider>
    );

    const task = screen.getByText('Task 1');
    fireEvent.click(task);

    expect(mockOnTaskClick).toHaveBeenCalledWith('task-1', 'column-1');
  });
});
