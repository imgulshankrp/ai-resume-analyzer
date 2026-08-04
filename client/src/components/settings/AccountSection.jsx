import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineBriefcase,
  HiOutlineGlobeAlt,
  HiOutlineCamera,
} from "react-icons/hi2";

import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

export default function AccountSection() {

  const BACKEND_URL =
    import.meta.env.VITE_API_URL.replace("/api", "");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({

    name: "",

    email: "",

    phone: "",

    location: "",

    targetRole: "",

    website: "",

    avatar: "",

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

        website: res.user.website || "",

        avatar: res.user.avatar || "",

      });

    } catch (err) {

      console.error(err);

      toast.error("Failed to load profile.");

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]: e.target.value,

    });

  };

  const handleSave = async () => {

    try {

      setSaving(true);

      await updateProfile({

        name: profile.name,

        phone: profile.phone,

        location: profile.location,

        targetRole: profile.targetRole,

        website: profile.website,

      });

      toast.success("Profile updated successfully.");

    } catch (err) {

      console.error(err);

      toast.error("Failed to update profile.");

    } finally {

      setSaving(false);

    }

  };

  if (loading) {

    return (

      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">

        <h2 className="text-xl font-semibold dark:text-white">

          Loading Profile...

        </h2>

      </div>

    );

  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
          {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            👤 Account Information
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Update your personal information.
          </p>

        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>

      {/* Avatar */}

      <div className="mt-10 flex flex-col items-center">

        <div className="relative">

          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-blue-500 shadow-xl">

            {profile.avatar ? (

              <img
                src={`${BACKEND_URL}${profile.avatar}`}
                alt={profile.name}
                className="h-full w-full object-cover"
              />

            ) : (

              <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-5xl font-bold text-white">

                {profile.name
                  ? profile.name.charAt(0).toUpperCase()
                  : "U"}

              </div>

            )}

          </div>

          <button
            type="button"
            className="absolute bottom-1 right-1 rounded-full bg-white p-3 shadow-lg dark:bg-slate-800"
          >
            <HiOutlineCamera className="text-xl text-blue-600" />
          </button>

        </div>

        <p className="mt-4 text-sm text-slate-500">
          Change profile picture from Profile → Edit Profile
        </p>

      </div>

      {/* Form */}

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        {/* Name */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">

            <HiOutlineUser />

            Full Name

          </label>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

        </div>

        {/* Email */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">

            <HiOutlineEnvelope />

            Email

          </label>

          <input
            type="email"
            value={profile.email}
            readOnly
            className="w-full cursor-not-allowed rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
          />

        </div>

        {/* Phone */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">

            <HiOutlinePhone />

            Phone Number

          </label>

          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

        </div>
                {/* Location */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">

            <HiOutlineMapPin />

            Location

          </label>

          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            placeholder="New Delhi, India"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

        </div>

        {/* Job Title */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">

            <HiOutlineBriefcase />

            Target Role

          </label>

          <input
            type="text"
            name="targetRole"
            value={profile.targetRole}
            onChange={handleChange}
            placeholder="Frontend Developer"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

        </div>

        {/* Portfolio */}

        <div className="md:col-span-2">

          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">

            <HiOutlineGlobeAlt />

            Portfolio / Website

          </label>

          <input
            type="url"
            name="website"
            value={profile.website}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

        </div>

      </div>

      {/* Footer */}

      <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-slate-700 dark:bg-slate-800">

        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">

          Your account information is securely stored and used to personalize
          resume analysis, ATS reports, and job recommendations. Email address
          cannot be changed from this page.

        </p>

      </div>

    </motion.div>

  );

}