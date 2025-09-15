import { useState, useEffect } from "react";

import Title from "./components/Title"
import SortSelect from "./components/SortSelect"
import SearchBar from "./components/SearchBar"
import MyDatePicker from "./components/MyDatePicker"
import CardGrid from "./components/CardGrid"


import type { SearchResult } from "./types/SearchResult";
import type { Value, OptionType } from "./types/SmallTypes";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const options = [
    { value: "best", label: "Best Match" },
    { value: "desc", label: "Newest First" },
    { value: "asc", label: "Oldest First" },
];

function App() {

    const [data, setData] = useState<SearchResult[]>([]);
    const [query, setQuery] = useState<string>("");
    const [startDate, setStartDate] = useState<Value>(new Date("2024-01-02"));
    const [endDate, setEndDate] = useState<Value>(new Date());
    const [order, setOrder] = useState<OptionType>(options[0]);

    useEffect(() => {
        if (query !== "") {
            handleSubmit(query);
        }
    }, [order, startDate, endDate]);

    function handleSubmit(query: string) {
        if (query === "") {
          return
        }

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
        console.log("Order:", order.value);

        const params = new URLSearchParams({
            q: query,
            start: start,
            end: end,
            order: order.value,
        });

        fetch(`${apiBaseUrl}/search?${params.toString()}`)
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
      <div className="min-h-screen bg-light-yellow dark:bg-dark-brown flex flex-col items-center">

        {/* Spacer for vertical centering */}
        <div
          className="transition-all duration-700 ease-out mt-12 w-full"
          style={{
            height:
              data.length === 0
                ? window.innerWidth < 640
                  ? '0px'      // shrink to 0 on small screens
                  : '20vh'     // normal height on larger screens
                : '20px',       // when data exists
          }}
        />

        <Title />
          <div className="flex flex-col items-center gap-4 w-full max-w-5xl mt-4">
            <SearchBar query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
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
