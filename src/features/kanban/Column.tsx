import type { ColumnType } from '../../types/kanban';

type ColumnProps = {
  column: ColumnType;
};

const Column = ({ column }: ColumnProps) => {
  return (
    <div className="flex-shrink-0 w-80 bg-gray-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-300">{column.title}</h2>
    </div>
  );
};

export default Column;