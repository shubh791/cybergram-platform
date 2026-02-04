import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// ================= BASE URL =================
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function ImageCarousel({ images, onPreview, onDoubleClick }) {

  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex(p => (p === 0 ? images.length - 1 : p - 1));
  };

  const next = () => {
    setIndex(p => (p === images.length - 1 ? 0 : p + 1));
  };

  // ✅ SAFE IMAGE NORMALIZER
  const getImageUrl = (img) =>
    img?.startsWith("http")
      ? img
      : `${BASE_URL}/uploads/${img}`;

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden">

      <img
        src={getImageUrl(images[index])}
        onClick={() => onPreview(index)}
        onDoubleClick={onDoubleClick}
        className="w-full max-h-[420px] object-contain cursor-pointer select-none"
        alt="post"
      />

      <button
        onClick={prev}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full"
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </button>

      <button
        onClick={next}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full"
      >
        <ArrowForwardIosIcon fontSize="small" />
      </button>

      <div className="absolute bottom-2 w-full flex justify-center gap-1">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-cyan-400" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
