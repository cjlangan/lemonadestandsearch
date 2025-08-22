import Header from "./Header";
import SearchBar from "./SearchBar";

export default function App() {
    return (
        <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <Header />
            <SearchBar />
        </div>
    );
}
