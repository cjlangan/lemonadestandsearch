import { useState } from "react";

import Header from "./components/Header"
import SortSelect from "./components/SortSelect"
import SearchBar from "./components/SearchBar"
import MyDatePicker from "./components/MyDatePicker"
import CardGrid from "./components/CardGrid"

import type { SearchResult } from "./types/SearchResult";
import type { Value, OptionType } from "./types/SmallTypes";

const options = [
    { value: "best", label: "Best Match" },
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
];

function App() {

    const [data, setData] = useState<SearchResult[]>([]);
    const [query, setQuery] = useState<string>("");
    const [startDate, setStartDate] = useState<Value>(new Date("2024-01-02"));
    const [endDate, setEndDate] = useState<Value>(new Date());
    const [order, setOrder] = useState<OptionType>(options[0]);

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
            order: order.value,
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
          style={{ height: data.length === 0 ? '35vh' : '20px' }}
        />
        <Header />
          <div className="flex flex-col items-center gap-4 w-full max-w-5xl mt-4">
            <SearchBar query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
            <div className="flex gap-4 justify-center w-full">
              <SortSelect order={order} setOrder={setOrder} options={options} />
              <MyDatePicker date={startDate} setDate={setStartDate} title="Start Date" />
              <MyDatePicker date={endDate} setDate={setEndDate} title="End Date" />
            </div>
          </div>
        <CardGrid allResults={data} />
      </div>
    );
}

export default App;
