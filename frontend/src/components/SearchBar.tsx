type SearchBarProps = {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent<Element>) => void;
};

function SearchBar({ query, setQuery, handleSubmit }: SearchBarProps) {
    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center p-3">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 'Horse Electrolytes', 'Gavin Newsom', ..."
                className="shadow-md border-2 bg-white w-200 border-gray-300 p-6 rounded-full w-96 text-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </form>
    );
}

export default SearchBar;
