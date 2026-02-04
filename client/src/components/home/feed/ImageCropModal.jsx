import Cropper from "react-easy-crop";
import { useState } from "react";

export default function ImageCropModal({ image, onCancel, onCropDone }) {

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const createImage = async () => {

    const response = await fetch(image);
    const blob = await response.blob();

    const file = new File([blob], "cropped.png", {
      type: "image/png"
    });

    onCropDone(file);
  };

  return (
    <div className="
      fixed inset-0 z-50 bg-black/80
      flex flex-col justify-center items-center
    ">

      <div className="relative w-[300px] h-[300px] bg-black">

        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
        />

      </div>

      <div className="flex gap-4 mt-4">

        <button
          onClick={onCancel}
          className="px-4 py-1 bg-gray-600 rounded"
        >
          Cancel
        </button>

        <button
          onClick={createImage}
          className="px-4 py-1 bg-cyan-500 rounded text-black"
        >
          Crop
        </button>

      </div>

    </div>
  );
}
