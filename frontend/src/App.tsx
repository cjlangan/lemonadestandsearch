import { useState } from "react";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import CardGrid from "./components/CardGrid"

import type { SearchResult } from "./types/SearchResult";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function App() {

    const [data, setData] = useState<SearchResult[]>([]);
    const [query, setQuery] = useState<string>("");
    const [dateInfo, setDateInfo] = useState<Value>([
        new Date("2024-01-01"),
        new Date("2039-12-31"),
    ]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // prevent page reload
        console.log("Searching for:", query);

        let start = "";
        let end = "";

        if (Array.isArray(dateInfo)) {
            start = dateInfo[0]?.toISOString().split("T")[0] ?? "";
            end = dateInfo[1]?.toISOString().split("T")[0] ?? "";
        } else if (dateInfo instanceof Date) {
            start = dateInfo.toISOString().split("T")[0];
            end = start;
        }

        console.log("Start date:", start);
        console.log("End date:", end);

        const params = new URLSearchParams({
            q: query,
            start: start,
            end: end,
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
        <div className="min-h-screen bg-yellow-100 flex-col items-center justify-center">
            <Header />
            <SearchBar query={query} setQuery={setQuery} handleSubmit={handleSubmit}/>
            <div className="flex justify-center">
            <DatePicker 
                onChange={setDateInfo} 
                value={dateInfo} 
                returnValue="range"
                closeCalendar={false} 
                calendarProps={{ selectRange: true } as any}
            />
            </div>
            <CardGrid allResults={data}/>
        </div>
    )
}

export default App
