import { useEffect } from "react";

type SearchBarProps = {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (query: string) => void;
};

function SearchBar({ query, setQuery, handleSubmit }: SearchBarProps) {

    useEffect(() => {
        if (query.length === 0) return;

        const handler = setTimeout(() => {
            handleSubmit(query);
        }, 500);

        return () => clearTimeout(handler);
    }, [query]);


  return (
    <form
      onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(query);
      }}
      className="flex justify-center items-center p-3 w-full"
    >
      <div className="flex w-full max-w-3xl bg-white border-2 border-gray-300 rounded-full overflow-hidden shadow-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. 'Horse Electrolytes', 'Gavin Newsom', ..."
          className="flex-1 px-4 py-3 text-base sm:text-lg md:text-xl placeholder-gray-400 focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          className="px-4 py-3 border-l border-gray-300 text-gray-700 hover:text-blue-500"
        >
          Go
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
