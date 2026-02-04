import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export default function MessageBubble({ message, isMine }) {

  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  // ================= TICK LOGIC =================
  /*
    SENT (saved)        => ✓
    DELIVERED (socket) => ✓✓ gray
    READ               => ✓✓ blue
  */

  const isRead = message.read === true;

  // If message exists on both clients → delivered
  const isDelivered = Boolean(message.id);

  return (

    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>

      <div
        className={`
          max-w-[80%]
          px-4 py-2
          rounded-xl
          text-sm
          break-words
          ${
            isMine
              ? "bg-cyan-400 text-black rounded-br-none"
              : "bg-[#0b1d33] text-white rounded-bl-none"
          }
        `}
      >

        {/* MESSAGE TEXT */}
        <div>{message.content}</div>

        {/* TIME + STATUS */}
        <div className="flex items-center justify-end gap-1 text-[10px] mt-1 opacity-80">

          <span>{time}</span>

          {/* STATUS TICKS (ONLY FOR MY MSG) */}
          {isMine && (

            <>
              {/* READ = BLUE DOUBLE TICK */}
              {isRead ? (

                <DoneAllIcon
                  sx={{ fontSize: 14 }}
                  className="text-blue-500"
                />

              ) : isDelivered ? (

                /* DELIVERED = GRAY DOUBLE TICK */
                <DoneAllIcon
                  sx={{ fontSize: 14 }}
                  className="text-gray-600"
                />

              ) : (

                /* SENT = SINGLE TICK */
                <CheckIcon
                  sx={{ fontSize: 14 }}
                  className="text-gray-600"
                />

              )}
            </>

          )}

        </div>

      </div>

    </div>
  );
}
