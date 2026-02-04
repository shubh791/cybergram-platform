import { motion } from "framer-motion";

export default function SuccessOverlay() {

  return (
    <div className="
      fixed inset-0 z-50
      bg-black/80 backdrop-blur-sm
      flex items-center justify-center
    ">

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="
          bg-white rounded-2xl
          px-10 py-8
          text-center
          shadow-[0_0_50px_rgba(0,255,255,0.6)]
        "
      >

        {/* CHECK ICON */}

        <div className="
          w-16 h-16 mx-auto
          rounded-full
          bg-green-500
          flex items-center justify-center
          text-white text-3xl
          mb-4
        ">
          ✓
        </div>

        <h2 className="text-lg font-bold text-gray-800">
          Account Created Successfully
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Redirecting you to login...
        </p>

      </motion.div>

    </div>
  );
}
