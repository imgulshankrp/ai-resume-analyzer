import api from "./api";

/* ===========================
   Register
=========================== */

export const register = async (userData) => {
  const { data } = await api.post(
    "/auth/register",
    userData
  );

  return data;
};

/* ===========================
   Login
=========================== */

export const login = async (userData) => {
  const { data } = await api.post(
    "/auth/login",
    userData
  );

  return data;
};

/* ===========================
   Google Login
=========================== */

export const googleLogin = async (
  credential
) => {
  const { data } = await api.post(
    "/google/login",
    {
      credential,
    }
  );

  return data;
};

/* ===========================
   Verify Email
=========================== */

export const verifyEmail = async ({
  email,
  otp,
}) => {
  const { data } = await api.post(
    "/auth/verify-email",
    {
      email,
      otp,
    }
  );

  return data;
};

/* ===========================
   Resend OTP
=========================== */

export const resendOTP = async ({
  email,
}) => {
  const { data } = await api.post(
    "/auth/resend-otp",
    {
      email,
    }
  );

  return data;
};

/* ===========================
   Forgot Password
=========================== */

export const forgotPassword = async ({
  email,
}) => {
  const { data } = await api.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return data;
};

/* ===========================
   Verify Reset OTP
=========================== */

export const verifyResetOTP = async ({
  email,
  otp,
}) => {
  const { data } = await api.post(
    "/auth/verify-reset-otp",
    {
      email,
      otp,
    }
  );

  return data;
};

/* ===========================
   Reset Password
=========================== */

export const resetPassword = async ({
  email,
  otp,
  password,
}) => {
  const { data } = await api.post(
    "/auth/reset-password",
    {
      email,
      otp,
      password,
    }
  );

  return data;
};

/* ===========================
   Change Password
=========================== */

export const changePassword = async (
  passwordData
) => {
  const { data } = await api.put(
    "/auth/change-password",
    passwordData
  );

  return data;
};