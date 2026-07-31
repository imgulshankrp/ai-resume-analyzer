import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function useDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalResumes: 0,
    averageScore: 0,
    bestScore: 0,
    totalAIAnalysis: 0,
  });

  const [recentResume, setRecentResume] = useState(null);
  const [activities, setActivities] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  const token = localStorage.getItem("token");

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const requests = [
        axios.get(`${API_URL}/history/stats`, { headers }),
      ];

      const [statsRes] = await Promise.all(requests);

      if (statsRes.data.success) {
        setStats({
          totalResumes: statsRes.data.totalResumes,
          averageScore: statsRes.data.averageScore,
          bestScore: statsRes.data.bestScore,
          totalAIAnalysis: statsRes.data.totalAIAnalysis,
        });
      }

      /*
        Future APIs

        setRecentResume(...)
        setActivities(...)
        setAnalytics(...)
      */
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    loading,
    stats,
    recentResume,
    activities,
    analytics,
    refreshDashboard: fetchDashboard,
  };
}