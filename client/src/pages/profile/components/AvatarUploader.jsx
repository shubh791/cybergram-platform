import Cropper from "react-easy-crop";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../../../api/axios.js";

export default function AvatarUploader({ onClose, onUpdate }) {

  const [imageSrc, setImageSrc] = useState(null);
  const [fileObj, setFileObj] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [uploading, setUploading] = useState(false);

  // ================= LOCK BACKGROUND =================

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ================= CLEAN OBJECT URL =================

  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  // ================= FILE PICK =================

  const handleFile = (e) => {

    const file = e.target.files[0];
    if (!file) return;

    setFileObj(file);

    const previewUrl = URL.createObjectURL(file);
    setImageSrc(previewUrl);

  };

  // ================= SAVE =================

  const handleSave = async () => {

    if (!fileObj || uploading) return;

    try {

      setUploading(true);

      const formData = new FormData();
      formData.append("avatar", fileObj);

      const res = await axios.put(
        "/profile/edit/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      const avatarPath = res.data?.avatar;

      if (avatarPath) {

        // ================= FIX START =================

        // Update localStorage user (HEADER + APP SYNC)
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
          storedUser.avatar = avatarPath;
          localStorage.setItem("user", JSON.stringify(storedUser));
        }

        // ================= FIX END =================

        // Update Profile UI (already working)
        onUpdate(avatarPath);
      }

      onClose();

    } catch (error) {

      console.log("Avatar upload error:", error);
      alert("Avatar upload failed");

    } finally {

      setUploading(false);

    }

  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

      <div
        className="
          relative
          bg-[#0b1628]
          rounded-xl
          border border-cyan-500/20
          w-full max-w-sm
          p-5
        "
      >

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <CloseIcon fontSize="small" />
        </button>

        {!imageSrc ? (

          <div className="text-center py-10">

            <p className="text-gray-400 text-sm mb-4">
              Upload profile picture
            </p>

            <label>

              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                hidden
              />

              <span
                className="
                  bg-cyan-500 hover:bg-cyan-600
                  px-4 py-2
                  rounded
                  text-black
                  text-sm
                  font-semibold
                  cursor-pointer
                "
              >
                Choose Image
              </span>

            </label>

          </div>

        ) : (

          <>
            {/* CROP */}

            <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden">

              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
              />

            </div>

            {/* BUTTONS */}

            <div className="flex gap-3 mt-5">

              <button
                onClick={onClose}
                disabled={uploading}
                className="flex-1 bg-gray-700 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={uploading}
                className="flex-1 bg-green-500 py-2 rounded font-semibold"
              >
                {uploading ? "Uploading..." : "Save"}
              </button>

            </div>

          </>
        )}

      </div>

    </div>
  );
}
