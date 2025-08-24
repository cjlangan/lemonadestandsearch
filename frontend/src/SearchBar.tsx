import { useState } from "react";
import type { SearchResult } from './types'

type SearchBarProps = {
    setData: React.Dispatch<React.SetStateAction<SearchResult[]>>;
};

function SearchBar({ setData }: SearchBarProps) {
    const [query, setQuery] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // prevent page reload
        console.log("Searching for:", query);

        const params = new URLSearchParams({
            q: query,
            start: "2025-01-01",
            end: "2025-09-01",
            order: "asc",
        });

        fetch(`http://127.0.0.1:5000/api/search?${params.toString()}`)
            .then((res) => {
                if(!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Search results:", data)
                setData(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
    }

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center p-3">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 'Horse Electrolytes', 'Gavin Newsom', ..."
                className="border-2 bg-white w-200 border-gray-300 p-6 rounded-full w-96 text-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </form>
    );
}

export default SearchBar;
