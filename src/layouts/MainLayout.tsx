type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md py-4 px-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Kanban Board App</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="bg-gray-800 py-3 text-center text-gray-500 text-sm">
        <p>Made with ❤️ by Zain.</p>
      </footer>
    </div>
  );
};

export default MainLayout;