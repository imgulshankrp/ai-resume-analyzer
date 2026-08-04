import api from "./api";

/* =====================================
   Get Auth Header
===================================== */

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/* =====================================
   Get Resume By ID
===================================== */

export const getResumeById = async (id) => {
  const { data } = await api.get(
    `/resume/${id}`,
    getAuthConfig()
  );

  return data;
};

/* =====================================
   Get Resume History
===================================== */

export const getResumeHistory = async () => {
  const { data } = await api.get(
    "/resume/history",
    getAuthConfig()
  );

  return data;
};

/* =====================================
   Delete Resume
===================================== */

export const deleteResume = async (id) => {
  const { data } = await api.delete(
    `/resume/${id}`,
    getAuthConfig()
  );

  return data;
};

/* =====================================
   Upload Resume
===================================== */

export const uploadResume = async (formData) => {
  const { data } = await api.post(
    "/upload",
    formData,
    getAuthConfig()
  );

  return data;
};