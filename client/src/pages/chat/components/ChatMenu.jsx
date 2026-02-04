import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import API from "../../../api/axios";

export default function ChatMenu({ selectedUser }) {

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {

    const confirm = window.confirm("Delete chat for you?");

    if (!confirm) return;

    try {

      await API.delete(`/chat/delete/${selectedUser.id}`);

      window.location.reload();

    } catch (err) {
      alert("Delete failed");
    }

  };

  return (
    <div className="relative">

      <MoreVertIcon
        onClick={() => setOpen(prev => !prev)}
        className="text-cyan-400 cursor-pointer"
      />

      {open && (

        <div className="
          absolute right-0 mt-2
          bg-[#081423]
          border border-cyan-500/20
          rounded-lg
          shadow-xl
          overflow-hidden
          w-40
        ">

          <div
            onClick={handleDelete}
            className="
              px-4 py-3
              text-sm text-red-400
              cursor-pointer
              hover:bg-red-500/10
            "
          >
            Delete chat for me
          </div>

        </div>

      )}

    </div>
  );
}
