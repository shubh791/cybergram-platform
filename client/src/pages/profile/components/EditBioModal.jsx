export default function EditBioModal({ bio, setBio, onClose, onSave }) {

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="
        bg-[#0b1628]
        p-6
        rounded-xl
        w-full max-w-md
        border border-cyan-500/20
      ">

        <h3 className="text-lg font-bold mb-4">
          Edit Bio
        </h3>

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows="4"
          className="
            w-full
            bg-[#081423]
            border border-cyan-500/20
            rounded-lg
            p-3
            text-white
            outline-none
          "
        />

        <div className="flex justify-end gap-3 mt-4">

          <button
            onClick={onClose}
            className="text-gray-400 px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="bg-green-500 px-4 py-2 rounded-lg text-black font-semibold"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}
