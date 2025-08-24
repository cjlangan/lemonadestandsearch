export interface SearchResult {
    id: number; // unique identifier
    hl_text: string; // contains <b>...<b>
    time: number; // seconds
    title: string;
    upload_date: string; // "YYYY-MM-DD"
    video_id: string;
}
