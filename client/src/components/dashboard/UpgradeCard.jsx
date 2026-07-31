import { motion } from "framer-motion";
import { HiSparkles, HiArrowUpRight } from "react-icons/hi2";

export default function UpgradeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
          <HiSparkles className="text-3xl" />
        </div>

        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
          PRO
        </span>
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        Unlock Premium AI
      </h2>

      <p className="mt-3 text-sm leading-6 text-blue-100">
        Get advanced ATS analysis, unlimited resume uploads,
        AI resume chat, JD matching and priority features.
      </p>

      <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 font-semibold text-indigo-700 transition hover:scale-[1.02]">
        Upgrade Now
        <HiArrowUpRight />
      </button>
    </motion.div>
  );
}