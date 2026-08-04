import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";

import {
  FaSearchPlus,
  FaSearchMinus,
  FaArrowLeft,
  FaArrowRight,
  FaExternalLinkAlt,
  FaDownload,
} from "react-icons/fa";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function ResumePreview({ file }) {
  const BACKEND_URL = "http://localhost:5000";

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);

  let pdfUrl = "";

  if (file instanceof File) {
    pdfUrl = URL.createObjectURL(file);
  } else if (file?.filePath) {
    pdfUrl = `${BACKEND_URL}${file.filePath}`;
  }

  useEffect(() => {
    return () => {
      if (file instanceof File && pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, []);

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.6));
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber((p) => p + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((p) => p - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Resume Preview
        </h2>

        {file && (
          <div className="flex flex-wrap gap-2">

            <button
              onClick={zoomOut}
              className="rounded-lg bg-slate-200 dark:bg-slate-700 p-2 hover:bg-slate-300"
            >
              <FaSearchMinus />
            </button>

            <button
              onClick={zoomIn}
              className="rounded-lg bg-slate-200 dark:bg-slate-700 p-2 hover:bg-slate-300"
            >
              <FaSearchPlus />
            </button>

            <button
              onClick={() => window.open(pdfUrl, "_blank")}
              className="rounded-lg bg-blue-600 text-white px-3 py-2 hover:bg-blue-700"
            >
              <FaExternalLinkAlt />
            </button>

            <a
              href={pdfUrl}
              download
              className="rounded-lg bg-green-600 text-white px-3 py-2 hover:bg-green-700"
            >
              <FaDownload />
            </a>

          </div>
        )}

      </div>

      {!file ? (
        <div className="mt-6 flex h-[600px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          No Resume Uploaded
        </div>
      ) : (
        <>
          <div className="mt-6 flex items-center justify-between">

            <button
              onClick={prevPage}
              disabled={pageNumber === 1}
              className="flex items-center gap-2 rounded-lg bg-slate-200 dark:bg-slate-700 px-4 py-2 disabled:opacity-50"
            >
              <FaArrowLeft />
              Previous
            </button>

            <div className="text-center">

              <p className="font-semibold text-slate-900 dark:text-white">
                Page {pageNumber} / {numPages || "-"}
              </p>

              <p className="text-sm text-slate-500">
                Zoom {(zoom * 100).toFixed(0)}%
              </p>

            </div>

            <button
              onClick={nextPage}
              disabled={pageNumber === numPages}
              className="flex items-center gap-2 rounded-lg bg-slate-200 dark:bg-slate-700 px-4 py-2 disabled:opacity-50"
            >
              Next
              <FaArrowRight />
            </button>

          </div>

          <div className="mt-6 h-[750px] overflow-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 p-6 flex justify-center">

            <Document
              file={pdfUrl}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
                setPageNumber(1);
              }}
              loading={
                <p className="text-slate-500">
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
                pageNumber={pageNumber}
                scale={zoom}
                renderAnnotationLayer={false}
                renderTextLayer={true}
              />
            </Document>

          </div>
        </>
      )}
    </motion.div>
  );
}

export default ResumePreview;