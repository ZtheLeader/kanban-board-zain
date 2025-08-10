type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md py-4 px-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Kanban Board App</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="bg-gray-800 py-3 text-center text-gray-500 text-sm">
        <p>
          Made with ❤️ by{' '}
          <a
            href="https://www.linkedin.com/in/ztheleader"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition-colors duration-200 ease-in-out"
          >
            Zain
          </a>
        </p>
      </footer>
    </div>
  );
};