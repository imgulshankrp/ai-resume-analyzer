const API_URL = import.meta.env.VITE_API_URL;

// ======================================
// Get Resume History
// ======================================

export const getResumeHistory = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

// ======================================
// Search Resume History
// ======================================

export const searchResumes = async (keyword) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_URL}/history/search?keyword=${encodeURIComponent(keyword)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await res.json();
};

// ======================================
// Dashboard Stats
// ======================================

export const getHistoryStats = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/history/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

// ======================================
// Delete Resume
// ======================================

export const deleteResume = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/history/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

// ======================================
// Clear History
// ======================================

export const clearHistory = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/history/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};