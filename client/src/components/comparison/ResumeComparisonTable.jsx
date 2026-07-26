function ResumeComparisonTable({ data }) {
  const left = data.resume1;
  const right = data.resume2;

  return (
    <div className="mt-10 overflow-x-auto">

      <table className="w-full border rounded-lg">

        <thead className="bg-blue-600 text-white">

          <tr>
            <th className="p-4">Metric</th>
            <th className="p-4">Resume A</th>
            <th className="p-4">Resume B</th>
          </tr>

        </thead>

        <tbody>

          <tr className="border">
            <td className="p-4 font-semibold">
              ATS Score
            </td>

            <td className="text-center">
              {left.score}%
            </td>

            <td className="text-center">
              {right.score}%
            </td>
          </tr>

          <tr className="border">

            <td className="p-4 font-semibold">
              Skills
            </td>

            <td className="text-center">
              {left.skills.length}
            </td>

            <td className="text-center">
              {right.skills.length}
            </td>

          </tr>

          <tr className="border">

            <td className="p-4 font-semibold">
              Missing Skills
            </td>

            <td className="text-center">
              {left.missingSkills.length}
            </td>

            <td className="text-center">
              {right.missingSkills.length}
            </td>

          </tr>

          <tr className="border">

            <td className="p-4 font-semibold">
              Suggestions
            </td>

            <td className="text-center">
              {left.suggestions.length}
            </td>

            <td className="text-center">
              {right.suggestions.length}
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default ResumeComparisonTable;