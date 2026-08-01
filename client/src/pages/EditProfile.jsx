import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";

import {
  HiOutlineCamera,
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineBriefcase,
} from "react-icons/hi2";

export default function EditProfile() {
  const [profile, setProfile] = useState({
    name: "Gulshan Kumar",
    email: "gulshan@example.com",
    phone: "+91 9876543210",
    location: "Delhi, India",
    jobTitle: "Full Stack Developer",
    bio: "",
    github: "",
    linkedin: "",
    portfolio: "",
    avatar: "",
    skills: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JavaScript",
      "Tailwind CSS",
    ],
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

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

            <div className="relative">

              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-5xl font-bold text-white shadow-xl">

                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  profile.name.charAt(0)
                )}

              </div>

              <button
                className="absolute bottom-2 right-2 rounded-full bg-white p-3 shadow-lg hover:scale-110 transition"
              >
                <HiOutlineCamera className="text-xl text-blue-600" />
              </button>

            </div>

            <p className="mt-4 text-sm text-slate-500">
              Click camera icon to change profile photo
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
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
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

              {/* Job Title */}

              <div className="md:col-span-2">

                <label className="mb-2 flex items-center gap-2 font-semibold">
                  <HiOutlineBriefcase />
                  Job Title
                </label>

                <input
                  type="text"
                  name="jobTitle"
                  value={profile.jobTitle}
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
                  name="portfolio"
                  value={profile.portfolio}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* Skills */}

            <div className="mt-10">

              <h2 className="mb-4 text-2xl font-bold">
                Skills
              </h2>

              <div className="flex flex-wrap gap-3">

                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>

            {/* Buttons */}

            <div className="mt-12 flex flex-wrap justify-end gap-4">

              <button
                type="button"
                className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      </motion.div>
    </MainLayout>
  );
}