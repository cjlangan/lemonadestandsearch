import type { SearchResult } from "./types"

type  Order = "asc" | "desc";

export async function searchApi(params: {
    q: string;
    start: string;  // "YYYY-MM-DD"
    end: string;    // "YYYY-MM-DD"
    order: Order;   // default "asc"
    baseUrl: string;
}): Promise<SearchResult[]> {
    const {q, start, end, order = "asc", baseUrl = "http://127.0.0.1:5000" } = params;
    const url = new URL("/api/search", baseUrl);
    url.searchParams.set("q", q);
    url.searchParams.set("start", start);
    url.searchParams.set("end", end);
    url.searchParams.set("order", order);

    const res = await fetch(url.toString());
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}
