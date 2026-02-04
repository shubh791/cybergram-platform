import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ImageCarousel({ images, onPreview, onDoubleClick }) {

  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden">

      {/* IMAGE */}

      <img
        src={`http://localhost:5000/uploads/${images[index]}`}
        onClick={() => onPreview(index)}     // ✅ SEND INDEX
        onDoubleClick={onDoubleClick}        // ✅ LIKE ON DOUBLE CLICK
        className="
          w-full
          max-h-[420px]
          object-contain
          cursor-pointer
          select-none
        "
        alt="post"
      />

      {/* LEFT BUTTON */}

      <button
        onClick={prev}
        className="
          absolute
          top-1/2
          left-3
          -translate-y-1/2
          bg-black/70
          text-white
          p-2
          rounded-full
          hover:bg-black
          z-20
        "
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </button>

      {/* RIGHT BUTTON */}

      <button
        onClick={next}
        className="
          absolute
          top-1/2
          right-3
          -translate-y-1/2
          bg-black/70
          text-white
          p-2
          rounded-full
          hover:bg-black
          z-20
        "
      >
        <ArrowForwardIosIcon fontSize="small" />
      </button>

      {/* DOT INDICATORS */}

      <div className="absolute bottom-2 w-full flex justify-center gap-1">

        {images.map((_, i) => (

          <span
            key={i}
            className={`
              h-2 w-2 rounded-full
              ${i === index ? "bg-cyan-400" : "bg-gray-600"}
            `}
          />

        ))}

      </div>

    </div>
  );
}
