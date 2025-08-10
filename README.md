# Kanban Board Application

## Summary
This is a Kanban board application built with React, TypeScript, and Tailwind CSS. It allows users to manage tasks and columns with drag-and-drop functionality. The application is responsive and includes features like task details, comments, and column reordering.

## Features
- Drag-and-drop functionality for tasks and columns.
- Add, edit, and delete tasks and columns.
- Task detail modal with comments.
- Responsive design for mobile and desktop.

## Directory Structure
```
.
├── public/                    # Static assets
│   └── vite.svg
├── src/
│   ├── context/
│   │   └── kanban/            # Kanban context and hooks
│   ├── features/
│   │   └── kanban/
│   │       ├── Column.tsx
│   │       ├── KanbanBoard.tsx
│   │       ├── TaskCard.tsx
│   │       ├── TaskDetailModal.tsx
│   │       └── __tests__/     # Component tests
│   ├── reducer/              # Board, column, and task reducers
│   │   ├── boardReducer.ts
│   │   ├── columnReducer.ts
│   │   ├── taskReducer.ts
│   │   └── index.ts           # Root kanbanReducer
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── __tests__/         # Hook tests
│   ├── layouts/
│   │   └── MainLayout.tsx
│   ├── routes/
│   │   └── index.tsx
│   ├── types/
│   │   └── kanban.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   └── setupTests.ts
│   ├── index.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── eslint.config.js           # ESLint configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts             # Vite configuration
├── package.json
└── README.md                  # Project documentation
```

## How to Run the Project

### Prerequisites
- Node.js (v22 or higher)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ZtheLeader/kanban-board-zain.git
   cd kanban-board-zain
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open the application in your browser at `http://localhost:5173`.

### Tests
To run the tests, use the following command:
```bash
npm test
```
# or
```bash
yarn test
```

---

**Made with ❤️ by [Zain](https://www.linkedin.com/in/ztheleader)**