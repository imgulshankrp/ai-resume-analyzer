import api from "./api";

/* ============================
   Delete Account
============================ */

export const deleteAccount = async () => {
  const { data } = await api.delete("/danger/account");
  return data;
};

/* ============================
   Delete All Resume History
============================ */

export const deleteAllResumes = async () => {
  const { data } = await api.delete("/danger/resumes");
  return data;
};

/* ============================
   Delete All Notifications
============================ */

export const deleteAllNotifications = async () => {
  const { data } = await api.delete("/danger/notifications");
  return data;
};