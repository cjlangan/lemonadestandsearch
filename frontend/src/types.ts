export interface SearchResult {
    hl_text: string; // contains <b>...<b>
    time: number; // seconds
    title: string;
    upload_date: string; // "YYYY-MM-DD"
    video_id: string;
}
