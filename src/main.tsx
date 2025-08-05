import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import './index.css'
import App from './App.tsx'
import { KanbanProvider } from './context/kanban/KanbanContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <KanbanProvider>
        <App />
      </KanbanProvider>
    </BrowserRouter>
  </StrictMode>,
)
