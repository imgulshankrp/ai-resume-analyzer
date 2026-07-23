import Navbar from "../components/common/Navbar";
import UploadBox from "../components/upload/UploadBox";

function Upload() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-16 px-6">

        <h1 className="text-4xl font-bold text-center mb-10">
          Upload Your Resume
        </h1>

        <UploadBox />

      </div>
    </>
  );
}

export default Upload;