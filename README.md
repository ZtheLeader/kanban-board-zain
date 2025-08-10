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
├── public/                # Static assets
├── src/
│   ├── context/
│   │   └── kanban/       # Kanban context and reducer
│   ├── features/
│   │   └── kanban/       # Kanban board components
│   ├── hooks/            # Custom hooks
│   ├── layouts/          # Main layout components
│   ├── routes/           # Application routes
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── eslint.config.js       # ESLint configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Project documentation
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

## How to Run the Project

### Tests
To run the tests, use the following command:
```bash
npm test
```
# or
```bash
yarn test
```