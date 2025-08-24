import Card from "./Card";
import type { SearchResult } from "../types/SearchResult";

type CardGridProps = {
    allResults: SearchResult[];
};

function CardGrid({ allResults }: CardGridProps){
    return (
        <div className="flex flex-wrap gap-4 p-4 justify-start max-w-5xl mx-auto">
            {allResults.map(item => (
                <Card
                    key = {item.id}
                    imageUrl = {getImageUrl(item.video_id)}
                    title = {item.title}
                    text = {item.hl_text}
                    watchUrl = {getWatchUrl(item.video_id, item.time)}
                    date = {item.upload_date}
                />
            ))}
        </div>
    )
}

export default CardGrid;

function getImageUrl(video_id: string) {
    return `https://i3.ytimg.com/vi/${video_id}/maxresdefault.jpg`
}

function getWatchUrl(video_id: string, time: number) {
    return `https://www.youtube.com/watch?v=${video_id}&t=${time-4}s`
}
