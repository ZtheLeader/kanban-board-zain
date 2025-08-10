import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import { KanbanProvider } from '../../../context/kanban/KanbanContextProvider';
import TaskDetailModal from '../TaskDetailModal';

vi.mock('../../../context/kanban/useKanban', () => ({
  useKanban: () => ({
    state: {
      tasks: {
        'task-1': { id: 'task-1', title: 'Task 1', description: 'Description 1', commentIds: [] },
      },
      comments: {},
    },
    dispatch: vi.fn(),
  }),
}));

const mockTaskId = 'task-1';
const mockColumnId = 'column-1';
const mockOnClose = vi.fn();

describe('TaskDetailModal Component', () => {
  const renderWithContext = (ui: React.ReactNode) => {
    return render(
      <KanbanProvider>
        {ui}
      </KanbanProvider>
    );
  };

  it('renders the task details', () => {
    renderWithContext(
      <TaskDetailModal
        taskId={mockTaskId}
        columnId={mockColumnId}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    renderWithContext(
      <TaskDetailModal
        taskId={mockTaskId}
        columnId={mockColumnId}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
