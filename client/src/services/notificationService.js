import api from "./api";

/* ==============================
   Get Notifications
============================== */

export const getNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data;
};

/* ==============================
   Mark Single Notification Read
============================== */

export const markAsRead = async (id) => {
  const { data } = await api.put(
    `/notifications/${id}/read`
  );

  return data;
};

/* ==============================
   Mark All Read
============================== */

export const markAllAsRead = async () => {
  const { data } = await api.put(
    "/notifications/read-all"
  );

  return data;
};

/* ==============================
   Delete Notification
============================== */

export const deleteNotification = async (
  id
) => {
  const { data } = await api.delete(
    `/notifications/${id}`
  );

  return data;
};