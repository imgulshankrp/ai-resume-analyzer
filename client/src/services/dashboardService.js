import api from "./api";

/* ==========================================
      Get Dashboard Data
========================================== */

export const getDashboardData = async () => {
  const { data } = await api.get(
    "/dashboard/latest"
  );

  return data;
};