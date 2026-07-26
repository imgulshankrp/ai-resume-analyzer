import { useState } from "react";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";



pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
function ResumePreview({ file }) {
  const [numPages, setNumPages] = useState(null);

  if (!file) {
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4">📄 Resume Preview</h2>
        <p className="text-gray-500">No resume uploaded.</p>
      </motion.div>
    );
  }

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const pdfUrl =
    typeof file === "string"
      ? `${BASE_URL}${file}`
      : file?.filePath
        ? `${BASE_URL}${file.filePath}`
        : URL.createObjectURL(file);
  console.log("FILE =", file);
  console.log("PDF URL =", pdfUrl);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-xl border p-6"
    >
      <h2 className="text-2xl font-bold mb-4">📄 Resume Preview</h2>

      <div className="border rounded-xl overflow-hidden bg-gray-100 flex justify-center p-4">
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<p>Loading PDF...</p>}
          error={<p>Unable to load PDF.</p>}
        >
          <Page pageNumber={1} width={450} />
        </Document>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-600">Pages: {numPages || "-"}</p>

        <div className="flex gap-3">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Open PDF
          </a>

          <a
            href={pdfUrl}
            download
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Download
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default ResumePreview;
