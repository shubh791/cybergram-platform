import { useState } from "react";
import axios from "../../../api/axios";
import { ClipLoader } from "react-spinners";

import { SCAM_CATEGORIES } from "./scamCategories";
import ImageCropModal from "./ImageCropModal";

export default function PostComposer({ onPostSuccess }) {


  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  const [cropImage, setCropImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const WORD_LIMIT = 150;

  const wordCount = caption.trim()
    ? caption.trim().split(/\s+/).length
    : 0;

  // ================= IMAGE PICK =================

  const handleImagePick = (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setCropImage(previewUrl);

  };

  // ================= AFTER CROP =================

  const handleCropDone = (croppedFile) => {

    if (images.length >= 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setImages(prev => [...prev, croppedFile]);
    setCropImage(null);

  };

  // ================= REMOVE IMAGE =================

  const removeImage = (index) => {

    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);

  };

  // ================= POST =================

  const handlePost = async () => {

    if (!caption.trim() && images.length === 0) {
      alert("Post cannot be empty");
      return;
    }

    if (!category) {
      alert("Select scam category");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("caption", caption);
      formData.append("category", category);

      images.forEach(file => {
        formData.append("images", file);
      });

      await axios.post(
        "/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      // Reset UI
     setCaption("");
setImages([]);
setCategory("");
onPostSuccess();



    } catch (error) {

      console.error("POST ERROR:", error.response?.data || error.message);
      alert("Post failed");

    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="
      border border-cyan-400/30
      rounded-xl
      p-5
      mb-6
      bg-[#050b14]
      shadow-[0_0_30px_rgba(0,255,255,0.08)]
    ">

      {/* CATEGORY DROPDOWN */}

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="
          w-full
          bg-[#081423]
          border border-cyan-500/30
          text-cyan-400
          text-sm
          rounded-lg
          px-4 py-3
          mb-4
          outline-none
        "
      >
        <option value="">Select Scam Category</option>

        {SCAM_CATEGORIES.map(cat => (
          <option key={cat}>{cat}</option>
        ))}

      </select>

      {/* IMAGE PREVIEW */}

      {images.length > 0 && (

        <div className="grid grid-cols-3 gap-3 mb-4">

          {images.map((img, i) => (

            <div key={i} className="relative group">

              <img
                src={URL.createObjectURL(img)}
                className="h-28 w-full object-cover rounded-lg border border-cyan-500/20"
                alt="preview"
              />

              <button
                onClick={() => removeImage(i)}
                className="
                  absolute top-2 right-2
                  bg-black/70 text-white
                  text-xs px-2 py-1 rounded-full
                  opacity-0 group-hover:opacity-100
                  transition
                "
              >
                ✕
              </button>

            </div>

          ))}

        </div>

      )}

      {/* TEXT AREA */}

      <textarea
        value={caption}
        onChange={(e) => {

          const words = e.target.value.trim().split(/\s+/);

          if (words.length <= WORD_LIMIT) {
            setCaption(e.target.value);
          }

        }}
        placeholder="Describe the cyber scam or issue..."
        className="
          w-full
          bg-transparent
          outline-none
          resize-none
          text-sm
          text-white
          min-h-[120px]
          leading-relaxed
          mb-3
        "
      />

      {/* FOOTER BAR */}

      <div className="flex justify-between items-center pt-2 border-t border-cyan-500/20">

        <label className="text-cyan-400 text-sm cursor-pointer hover:underline">

          Add Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImagePick}
          />

        </label>

        <span className={`text-xs ${wordCount >= WORD_LIMIT ? "text-red-400" : "text-gray-400"}`}>
          {wordCount}/{WORD_LIMIT}
        </span>

        <button
          onClick={handlePost}
          disabled={loading}
          className="
            bg-gradient-to-r from-cyan-500 to-blue-500
            px-5 py-2 rounded-lg
            text-sm font-semibold
            disabled:opacity-50
            flex items-center gap-2
          "
        >

          {loading && <ClipLoader size={14} color="#000" />}
          Post

        </button>

      </div>

      {/* CROP MODAL */}

      {cropImage && (

        <ImageCropModal
          image={cropImage}
          onCancel={() => setCropImage(null)}
          onCropDone={handleCropDone}
        />

      )}

    </div>
  );
}
