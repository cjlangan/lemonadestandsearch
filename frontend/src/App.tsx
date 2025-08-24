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
    const [startDate, setStartDate] = useState<Value>(new Date("2024-01-02"));
    const [endDate, setEndDate] = useState<Value>(new Date());

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // prevent page reload
        console.log("Searching for:", query);

        let start = ""
        let end = ""

        if (startDate instanceof Date) {
            start = startDate.toISOString().split("T")[0] ?? "";
        }
        if (endDate instanceof Date) {
            end = endDate.toISOString().split("T")[0] ?? "";
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
        <div className="min-h-screen bg-yellow-100 flex flex-col items-center">
          {/* Spacer for vertical centering */}
          <div
            className="transition-all duration-700 ease-out"
            style={{ height: data.length === 0 ? '50vh' : '20px' }}
          />
          <Header />
          <div className="flex gap-6 items-start w-full max-w-5xl justify-center mt-4">
            <div className="flex-1">
              <SearchBar query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
            </div>
            {/* Date pickers */}
            <div className="flex gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-gray-700 font-medium">Start Date</label>
                <div className="p-3 bg-white rounded-2xl shadow-md w-64">
                  <DatePicker
                    onChange={setStartDate}
                    value={startDate}
                    closeCalendar={false}
                    className="w-full text-lg font-medium"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-gray-700 font-medium">End Date</label>
                <div className="p-3 bg-white rounded-2xl shadow-md w-64">
                  <DatePicker
                    onChange={setEndDate}
                    value={endDate}
                    closeCalendar={false}
                    className="w-full text-lg font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
          <CardGrid allResults={data} />
        </div>
    )
}

export default App
