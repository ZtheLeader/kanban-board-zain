import type { ColumnType } from '../../types/kanban';
import { useKanban } from '../../context/kanban/useKanban';

type ColumnProps = {
  column: ColumnType;
};

const Column = ({ column }: ColumnProps) => {
  const { dispatch } = useKanban();

  const handleDeleteColumn = () => {
    dispatch({ type: 'DELETE_COLUMN', payload: { id: column.id } });
  };

  return (
    <div className="flex-shrink-0 w-80 bg-gray-800 rounded-lg p-4 shadow-lg h-full max-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-300">{column.title}</h2>
        <button
          onClick={handleDeleteColumn}
          className="text-gray-400 hover:text-red-500 font-bold transition-colors duration-200 text-2xl leading-none px-2"
          aria-label="Delete column"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Column;