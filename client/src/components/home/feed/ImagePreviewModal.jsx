import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function ImagePreviewModal({ images = [], startIndex = 0, onClose }) {

  const [index, setIndex] = useState(startIndex);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images.length - 1) setIndex(i => i + 1);
    },
    onSwipedRight: () => {
      if (index > 0) setIndex(i => i - 1);
    },
    trackMouse: true
  });

  if (!images.length) return null;

  return (
    <div
      {...handlers}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/70 p-2 rounded-full"
      >
        <CloseIcon />
      </button>

      <img
        src={`http://localhost:5000/uploads/${images[index]}`}
        className="max-w-[95%] max-h-[95%] object-contain"
      />

    </div>
  );
}
