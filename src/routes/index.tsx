import { Routes, Route, Navigate } from 'react-router-dom';
import KanbanBoard from '../features/kanban/KanbanBoard';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/boards" replace />} />
    <Route path="/boards" element={<KanbanBoard />} />
    <Route
      path="*"
      element={
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
          <p>Page not found</p>
        </div>
      }
    />
  </Routes>
);

export default AppRoutes;