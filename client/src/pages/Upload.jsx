import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import UploadBox from "../components/upload/UploadBox";

export default function Upload() {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-80px)] w-full overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            mx-auto
            flex
            w-full
            max-w-5xl
            flex-col
            items-center
            px-4
            py-5
            sm:px-6
            sm:py-6
          "
        >

          {/* Page Heading */}
          <div className="mb-5 text-center">

            <h1
              className="
                text-3xl
                font-extrabold
                tracking-tight
                text-slate-900
                sm:text-4xl
                dark:text-white
              "
            >
              Upload Your Resume
            </h1>

            <p
              className="
                mt-2
                text-sm
                font-medium
                text-slate-500
                sm:text-base
                dark:text-slate-400
              "
            >
              Upload your resume and get AI-powered insights instantly.
            </p>

          </div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full"
          >
            <UploadBox />
          </motion.div>

        </motion.div>

      </div>
    </MainLayout>
  );
}