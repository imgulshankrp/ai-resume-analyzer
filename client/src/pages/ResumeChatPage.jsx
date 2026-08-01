import MainLayout from "../components/layout/MainLayout";
import ResumeChat from "../components/chat/ResumeChat";
import { useLocation } from "react-router-dom";

function ResumeChatPage() {
  const location = useLocation();

  const resumeText =
    location.state?.resumeText || "";

  return (
    <MainLayout>
      <ResumeChat resumeText={resumeText} />
    </MainLayout>
  );
}

export default ResumeChatPage;