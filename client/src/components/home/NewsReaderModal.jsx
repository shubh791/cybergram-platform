import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function NewsReaderModal({ news, onClose }) {

  if (!news) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4">

      <div className="bg-[#081423] max-w-2xl w-full rounded-xl overflow-hidden border border-cyan-500/20">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-cyan-500/10">

          <span className="text-cyan-400 text-sm">
            {news.source}
          </span>

          <button onClick={onClose}>
            <CloseIcon className="text-white" />
          </button>

        </div>

        {/* Image */}
        {news.image && (
          <img
            src={news.image}
            alt="news"
            className="w-full h-56 object-cover"
          />
        )}

        {/* Content */}
        <div className="p-4 space-y-3">

          <h2 className="text-white font-semibold text-lg leading-snug">
            {news.title}
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed">
            {news.description || "Full article available on original website."}
          </p>

          <div className="flex justify-between items-center pt-3">

            <span className="text-xs text-gray-500">
              {new Date(news.publishedAt).toLocaleString()}
            </span>

            <a
              href={news.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-cyan-400 text-sm hover:underline"
            >
              Read Original <OpenInNewIcon fontSize="small" />
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}
