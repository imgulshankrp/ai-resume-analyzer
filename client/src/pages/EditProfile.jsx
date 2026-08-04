import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "../services/profileService";

import {
  HiOutlineCamera,
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineBriefcase,
} from "react-icons/hi2";

export default function EditProfile() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const BACKEND_URL =
    import.meta.env.VITE_API_URL.replace("/api", "");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    targetRole: "",
    bio: "",
    github: "",
    linkedin: "",
    website: "",
    avatar: "",
    skills: [],
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      setProfile({
        name: res.user.name || "",
        email: res.user.email || "",
        phone: res.user.phone || "",
        location: res.user.location || "",
        targetRole: res.user.targetRole || "",
        bio: res.user.bio || "",
        github: res.user.github || "",
        linkedin: res.user.linkedin || "",
        website: res.user.website || "",
        avatar: res.user.avatar || "",
        skills: res.user.skills || [],
      });
    } catch (err) {
      console.error(err);

      toast.error("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const res = await uploadAvatar(file);

      setProfile((prev) => ({
        ...prev,
        avatar: res.avatar,
      }));

      toast.success("Profile photo updated.");

    } catch (err) {
      console.error(err);

      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await updateProfile(profile);

      toast.success("Profile updated successfully.");

      navigate("/profile");

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-[70vh] items-center justify-center">

          <div className="text-xl font-semibold">

            Loading Profile...

          </div>

        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-6xl space-y-8"
      >

        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-xl">

          <h1 className="text-4xl font-bold">

            Edit Profile

          </h1>

          <p className="mt-3 text-blue-100">

            Update your personal information and professional profile.

          </p>

        </div>

        {/* Main Card */}

        <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900">

          {/* Avatar */}

          <div className="flex flex-col items-center">

            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleAvatarUpload}
            />

            <div className="relative">

              <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-5xl font-bold text-white shadow-xl">

                {profile.avatar ? (

                  <img
                    src={`${BACKEND_URL}${profile.avatar}`}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />

                ) : (

                  profile.name.charAt(0).toUpperCase()

                )}

              </div>

              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute bottom-2 right-2 rounded-full bg-white p-3 shadow-lg transition hover:scale-110"
              >
                <HiOutlineCamera className="text-xl text-blue-600" />
              </button>

            </div>

            <p className="mt-4 text-sm text-slate-500">

              {uploading
                ? "Uploading image..."
                : "Click camera icon to change profile photo"}

            </p>

          </div>

          {/* Personal Information */}

          <div className="mt-10">

            <h2 className="mb-6 text-2xl font-bold">

              Personal Information

            </h2>

            <div className="grid gap-6 md:grid-cols-2">
                            {/* Name */}

              <div>

                <label className="mb-2 flex items-center gap-2 font-semibold">
                  <HiOutlineUser />
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* Email */}

              <div>

                <label className="mb-2 flex items-center gap-2 font-semibold">
                  <HiOutlineEnvelope />
                  Email
                </label>

                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border bg-slate-100 p-4 dark:bg-slate-800"
                />

              </div>

              {/* Phone */}

              <div>

                <label className="mb-2 flex items-center gap-2 font-semibold">
                  <HiOutlinePhone />
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* Location */}

              <div>

                <label className="mb-2 flex items-center gap-2 font-semibold">
                  <HiOutlineMapPin />
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* Target Role */}

              <div className="md:col-span-2">

                <label className="mb-2 flex items-center gap-2 font-semibold">
                  <HiOutlineBriefcase />
                  Target Role
                </label>

                <input
                  type="text"
                  name="targetRole"
                  value={profile.targetRole}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* About */}

              <div className="md:col-span-2">

                <label className="mb-2 block font-semibold">
                  About Me
                </label>

                <textarea
                  rows={5}
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Write something about yourself..."
                  className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* GitHub */}

              <div>

                <label className="mb-2 block font-semibold">
                  GitHub
                </label>

                <input
                  type="text"
                  name="github"
                  value={profile.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* LinkedIn */}

              <div>

                <label className="mb-2 block font-semibold">
                  LinkedIn
                </label>

                <input
                  type="text"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* Portfolio */}

              <div className="md:col-span-2">

                <label className="mb-2 block font-semibold">
                  Portfolio Website
                </label>

                <input
                  type="text"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* Skills */}

            <div className="mt-10">

              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-2xl font-bold">
                  Skills
                </h2>

                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200">

                  {profile.skills.length} Skills

                </span>

              </div>

              {profile.skills.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">

                  No skills added yet.

                </div>

              ) : (

                <div className="flex flex-wrap gap-3">

                  {profile.skills.map((skill, index) => (

                    <span
                      key={index}
                      className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-md"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              )}

            </div>
                        {/* Buttons */}

            <div className="mt-12 flex flex-wrap justify-end gap-4">

              <button
                type="button"
                onClick={() => navigate("/profile")}
                disabled={saving}
                className="
                  rounded-xl
                  border
                  border-slate-300
                  px-6
                  py-3
                  font-semibold
                  transition
                  hover:bg-slate-100
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  dark:hover:bg-slate-800
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  px-8
                  py-3
                  font-semibold
                  text-white
                  shadow-lg
                  transition
                  hover:scale-105
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </div>

        </div>

      </motion.div>

    </MainLayout>
  );
}