import { useEffect, useState } from "react";
import { getCyberNews } from "../../services/news.service";
import NewsReaderModal from "./NewsReaderModal";

export default function CyberNewsPanel() {

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {

    const loadNews = async () => {
      try {
        const res = await getCyberNews();
        setNews(res.data.articles || []);
      } catch (err) {
        console.error("News fetch failed");
      } finally {
        setLoading(false);
      }
    };

    loadNews();

  }, []);

  return (
    <div className="
      bg-[#081423]
      border border-cyan-500/20
      rounded-xl
      p-4
      min-h-[300px]
    ">

      <h3 className="text-cyan-400 font-semibold mb-3 tracking-wide">
        CYBER NEWS
      </h3>

      {loading && (
        <div className="text-gray-400 text-sm">
          Loading cyber updates...
        </div>
      )}

      <div className="space-y-3 text-sm text-gray-400">

        {news.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedNews(item)}
            className="hover:text-cyan-400 cursor-pointer transition"
          >
            🔐 {item.title}
          </div>
        ))}

      </div>

      {/* Reader Modal */}
      <NewsReaderModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
      />

    </div>
  );
}
