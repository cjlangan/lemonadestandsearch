import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Searching:", query);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="border-2 border-gray-300 rounded-full p-6 w-11/12 max-w-4xl text-3xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}
