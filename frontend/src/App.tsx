import { useState } from "react";

import Header from "./Header"
import SearchBar from "./SearchBar"
import CardGrid from "./CardGrid"

import type { SearchResult } from "./types";

function App() {

    const [data, setData] = useState<SearchResult[]>([]);

    return (
        <div className="min-h-screen bg-yellow-100 flex-col items-center justify-center">
            <Header />
            <SearchBar setData={setData}/>
            <CardGrid allResults={data}/>
        </div>
    )
}

export default App
