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
      <div className="bg-white rounded-xl p-6">
        No Resume Uploaded
      </div>
    );
  }

  const BACKEND_URL =
  "https://ai-resume-analyzer-zf65.onrender.com";

  let pdfUrl = "";

  if (file instanceof File) {
    pdfUrl = URL.createObjectURL(file);
  } else if (file.filePath) {
    pdfUrl = `${BACKEND_URL}${file.filePath}`;
  }

  return (
    <motion.div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5">
        Resume Preview
      </h2>

      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) =>
          setNumPages(numPages)
        }
        loading={<p>Loading...</p>}
        error={<p>Unable to load PDF.</p>}
      >
        <Page pageNumber={1} width={450} />
      </Document>

      <p className="mt-4">
        Pages : {numPages || "-"}
      </p>
    </motion.div>
  );
}

export default ResumePreview;