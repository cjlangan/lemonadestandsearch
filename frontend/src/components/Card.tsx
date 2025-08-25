import { parseISO, format } from 'date-fns';

export type CardProps = {
    key: number;
    imageUrl: string;
    title: string;
    text: string; // contains <b>...<b>
    watchUrl: string;
    date: string; // YYYY-MM-DD
};

function Card({ imageUrl, title, text, watchUrl, date }: CardProps) {

    const dateWords = format(parseISO(date), 'MMMM d, yyyy');
    const highlightedText = text.replace(/<b>(.*?)<\/b>/g, '<span class="bg-white text-black">$1</span>');

  return (
    <a href={watchUrl} className="max-w-xs rounded-2xl overflow-hidden shadow-lg dark:bg-gray-800" target="_blank" rel="noopener noreferrer">
      <img className="w-full h-40 object-cover" src={imageUrl} alt={title} />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm"
          dangerouslySetInnerHTML={{ __html: highlightedText}}>
        </p>
        <p className="text-right text-gray-700 dark:text-gray-300 text-sm">
          {dateWords}
        </p>
      </div>
    </a>
  )
}
export default Card;
