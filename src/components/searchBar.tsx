export function SearchBar({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: (val: string) => void; }) {
  return (
    <div className="w-full p-2">
      <input
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring bg-slate-500"
        type="text"
        placeholder="Search for a coin..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </div>
  );
}