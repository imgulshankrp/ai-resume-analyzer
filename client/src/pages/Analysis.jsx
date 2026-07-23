import { useLocation, Navigate } from "react-router-dom";

import ScoreCard from "../components/dashboard/ScoreCard";
import SummaryCard from "../components/dashboard/SummaryCard";
import SkillsCard from "../components/dashboard/SkillsCard";
import SuggestionsCard from "../components/dashboard/SuggestionsCard";
import ResumePreview from "../components/dashboard/ResumePreview";
import MissingSkillsCard from "../components/dashboard/MissingSkillsCard";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";

function Analysis() {
  const location = useLocation();

  const analysis = location.state?.analysis;
  const file = location.state?.file;

  if (!analysis) {
    return <Navigate to="/upload" replace />;
  }

  const skillStrength = Math.min(
    (analysis.foundSkills?.length || 0) * 8,
    100
  );

  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Resume Analysis
      </h1>

      {/* Score + Preview */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <ScoreCard score={analysis.score} />

        <ResumePreview file={file} />

      </div>

      {/* Summary */}

      <div className="mt-6">

        <SummaryCard
          score={analysis.score}
          skills={analysis.foundSkills}
          summary={analysis.summary}
        />

      </div>

      {/* Job Match */}

      <div className="bg-green-50 border border-green-300 rounded-xl shadow-lg p-6 mt-6">

        <h2 className="text-2xl font-bold text-green-700">
          🎯 Job Description Match
        </h2>

        <p className="text-5xl font-bold text-green-600 mt-3">
          {analysis.jdMatch}%
        </p>

        <p className="mt-2 text-gray-700">
          Your resume matches{" "}
          <strong>{analysis.jdMatch}%</strong> of the job description.
        </p>

      </div>

      <div className="mt-6">

        <AnalyticsChart
          score={analysis.score}
          jdMatch={analysis.jdMatch}
        />

      </div>

      {/* Resume Strength */}

      <div className="bg-white rounded-xl shadow-lg p-6 mt-6">

        <h2 className="text-2xl font-bold mb-4">
          Resume Strength
        </h2>

        <div className="space-y-5">

          <div>

            <div className="flex justify-between mb-2">

              <span>Skills</span>

              <span>{skillStrength}%</span>

            </div>

            <progress
              className="w-full"
              value={skillStrength}
              max="100"
            />

          </div>

          <div>

            <div className="flex justify-between mb-2">

              <span>Overall ATS</span>

              <span>{analysis.score}%</span>

            </div>

            <progress
              className="w-full"
              value={analysis.score}
              max="100"
            />

          </div>

        </div>

      </div>

      {/* Skills */}

      <div className="mt-6">

        <SkillsCard skills={analysis.foundSkills} />

      </div>

      {/* Missing Skills */}

      <div className="mt-6">

        <MissingSkillsCard
          missingSkills={analysis.missingSkills}
        />

      </div>

      {/* Suggestions */}

      <div className="mt-6">

        <SuggestionsCard
          suggestions={analysis.suggestions}
        />

      </div>

    </div>
  );
}

export default Analysis;