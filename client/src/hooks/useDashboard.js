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

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [statsRes, activitiesRes, latestRes] =
        await Promise.allSettled([
          axios.get(`${API_URL}/history/stats`, {
            headers,
          }),

          axios.get(`${API_URL}/dashboard/activities`, {
            headers,
          }),

          axios.get(`${API_URL}/dashboard/latest`, {
            headers,
          }),
        ]);

      // -----------------------------
      // STATS
      // -----------------------------

      if (
        statsRes.status === "fulfilled" &&
        statsRes.value.data?.success
      ) {
        const data = statsRes.value.data;

        setStats({
          totalResumes: data.totalResumes ?? 0,
          averageScore: data.averageScore ?? 0,
          bestScore: data.bestScore ?? 0,
          totalAIAnalysis: data.totalAIAnalysis ?? 0,
        });
      }


      // -----------------------------
      // ACTIVITIES
      // -----------------------------

      if (
        activitiesRes.status === "fulfilled" &&
        activitiesRes.value.data?.success
      ) {
        setActivities(
          activitiesRes.value.data.activities ?? []
        );
      } else {
        setActivities([]);
      }


      // -----------------------------
      // LATEST RESUME
      // -----------------------------

      if (
        latestRes.status === "fulfilled" &&
        latestRes.value.data?.success
      ) {
        setRecentResume(
          latestRes.value.data.analysis ?? null
        );
      } else {
        setRecentResume(null);
      }

    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

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