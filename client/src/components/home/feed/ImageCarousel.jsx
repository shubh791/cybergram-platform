import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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

  const getImageUrl = (img) =>
    img?.startsWith("http")
      ? img
      : `${BASE_URL}/uploads/${img}`;

  return (
    <div className="relative w-full max-w-full bg-black rounded-lg overflow-hidden">

      <img
        src={getImageUrl(images[index])}
        onClick={() => onPreview(index)}
        onDoubleClick={onDoubleClick}
        className="
          w-full
          max-h-[55vh] sm:max-h-[60vh]
          object-contain
          cursor-pointer
          select-none
          block
        "
        alt="post"
      />

      {/* PREV BUTTON */}
      <button
        onClick={prev}
        className="
          absolute top-1/2 left-2 -translate-y-1/2
          bg-black/70 text-white
          p-1.5 sm:p-2
          rounded-full
          active:scale-95
        "
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </button>

      {/* NEXT BUTTON */}
      <button
        onClick={next}
        className="
          absolute top-1/2 right-2 -translate-y-1/2
          bg-black/70 text-white
          p-1.5 sm:p-2
          rounded-full
          active:scale-95
        "
      >
        <ArrowForwardIosIcon fontSize="small" />
      </button>

      {/* DOTS */}
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
