import api from "./api";

/* ============================
   Get Logged In User Profile
============================ */

export const getProfile = async () => {
  const { data } = await api.get("/profile");
  return data;
};

/* ============================
   Update Profile
============================ */

export const updateProfile = async (profileData) => {
  const { data } = await api.put(
    "/profile",
    profileData
  );

  return data;
};

/* ============================
   Upload Profile Avatar
============================ */

export const uploadAvatar = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const { data } = await api.post(
    "/profile/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};