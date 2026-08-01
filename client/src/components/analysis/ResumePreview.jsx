import { useState } from "react";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function ResumePreview({ file }) {
  const [numPages, setNumPages] = useState(null);

  const BACKEND_URL =
    "https://ai-resume-analyzer-zf65.onrender.com";

  let pdfUrl = "";

  if (file instanceof File) {
    pdfUrl = URL.createObjectURL(file);
  } else if (file?.filePath) {
    pdfUrl = `${BACKEND_URL}${file.filePath}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        shadow-xl
        p-6
      "
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Resume Preview
      </h2>

      {!file ? (
        <div
          className="
            flex
            h-[550px]
            items-center
            justify-center
            rounded-2xl
            border-2
            border-dashed
            border-slate-300
            dark:border-slate-700
            bg-slate-50
            dark:bg-slate-800
            text-slate-500
            dark:text-slate-400
          "
        >
          No Resume Uploaded
        </div>
      ) : (
        <>
          <div
            className="
              h-[600px]
              overflow-auto
              rounded-2xl
              border
              border-slate-200
              dark:border-slate-700
              bg-slate-100
              dark:bg-slate-950
              flex
              justify-center
              p-4
            "
          >
            <Document
              file={pdfUrl}
              onLoadSuccess={({ numPages }) =>
                setNumPages(numPages)
              }
              loading={
                <p className="text-slate-500 dark:text-slate-400">
                  Loading Resume...
                </p>
              }
              error={
                <p className="text-red-500">
                  Unable to load PDF.
                </p>
              }
            >
              <Page
                pageNumber={1}
                width={380}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Document>
          </div>

          <div className="mt-5 flex justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>Total Pages</span>
            <span className="font-semibold">
              {numPages || "-"}
            </span>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default ResumePreview;