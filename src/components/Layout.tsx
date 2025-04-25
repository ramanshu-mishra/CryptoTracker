export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white">

      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-gray-800 shadow-md py-4 px-6 text-center text-2xl font-bold tracking-wide">
        💹 RAMANSHU MISHRA • CRYPTO TRACKER
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto flex justify-center ">
          {children}
        </div>
      </main>

     
      <footer className="sticky bottom-0 bg-gray-800 py-3 text-sm text-gray-400 text-center">
        Built with ❤️ by Ramanshu
      </footer>
      
    </div>
  );
}