import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

function StatsCards() {
  const [stats, setStats] = useState({
    totalResumes: 0,
    averageScore: 0,
    bestScore: 0,
    totalAIAnalysis: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `${API_URL}/api/history/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.success) {
          setStats({
            totalResumes: data.totalResumes,
            averageScore: data.averageScore,
            bestScore: data.bestScore,
            totalAIAnalysis: data.totalAIAnalysis,
          });
        }
      } catch (error) {
        console.error("Stats Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-28 rounded-xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Resumes",
      value: stats.totalResumes,
      icon: "📄",
      color: "bg-blue-500",
    },
    {
      title: "Average ATS",
      value: `${stats.averageScore}%`,
      icon: "🎯",
      color: "bg-green-500",
    },
    {
      title: "Best ATS",
      value: `${stats.bestScore}%`,
      icon: "🏆",
      color: "bg-yellow-500",
    },
    {
      title: "AI Analyses",
      value: stats.totalAIAnalysis,
      icon: "🤖",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white ${card.color}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;