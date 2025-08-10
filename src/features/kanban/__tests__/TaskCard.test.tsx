import { render, screen, fireEvent } from '@testing-library/react';

import { vi } from 'vitest';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { KanbanProvider } from '../../../context/kanban/KanbanContextProvider';
import TaskCard from '../TaskCard';

vi.mock('../../../context/kanban/useKanban', () => ({
  useKanban: () => ({
    state: {
      tasks: {
        'task-1': { id: 'task-1', title: 'Task 1', description: 'Description 1', commentIds: [] },
      },
    },
    dispatch: vi.fn(),
  }),
}));

const mockTask = {
  id: 'task-1',
  title: 'Task 1',
  description: 'Description 1',
  commentIds: [],
};

const mockOnClick = vi.fn();
const mockColumnId = 'column-1';
const mockIndex = 0;

describe('TaskCard Component', () => {
  const renderWithContext = (ui: React.ReactNode) => {
    return render(
      <KanbanProvider>
        <DragDropContext onDragEnd={() => { }}>
          <Droppable droppableId="column-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {ui}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </KanbanProvider>
    );
  };

  it('renders the task title and description', () => {
    renderWithContext(
      <TaskCard task={mockTask} columnId={mockColumnId} index={mockIndex} onClick={mockOnClick} />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  it('calls onClick when the task card is clicked', () => {
    renderWithContext(
      <TaskCard task={mockTask} columnId={mockColumnId} index={mockIndex} onClick={mockOnClick} />
    );

    const taskCard = screen.getByText('Task 1');
    fireEvent.click(taskCard);

    expect(mockOnClick).toHaveBeenCalledWith('task-1', 'column-1');
  });
});
