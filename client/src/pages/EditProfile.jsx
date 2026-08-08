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

  const [errors, setErrors] = useState({});

  const BACKEND_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

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
  const [skillInput, setSkillInput] = useState("");

  /* =========================================
     VALIDATION HELPERS
  ========================================= */

  const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;

  const phoneRegex = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;

  const locationRegex = /^[A-Za-z0-9]+(?:[A-Za-z0-9\s,.'-]*[A-Za-z0-9])?$/;

  const roleRegex =
    /^[A-Za-z0-9]+(?:[A-Za-z0-9\s/&.,'()+#-]*[A-Za-z0-9+#)]?)?$/;

  const validateUrl = (value) => {
    if (!value.trim()) return true;

    try {
      const url = new URL(value.trim());

      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const validateGithub = (value) => {
    if (!value.trim()) return true;

    try {
      const url = new URL(value.trim());

      return (
        (url.protocol === "https:" || url.protocol === "http:") &&
        url.hostname.toLowerCase() === "github.com" &&
        url.pathname.length > 1
      );
    } catch {
      return false;
    }
  };

  const validateLinkedin = (value) => {
    if (!value.trim()) return true;

    try {
      const url = new URL(value.trim());

      return (
        (url.protocol === "https:" || url.protocol === "http:") &&
        url.hostname.toLowerCase().includes("linkedin.com") &&
        url.pathname.length > 1
      );
    } catch {
      return false;
    }
  };

  /* =========================================
     LOAD PROFILE
  ========================================= */

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

  /* =========================================
     VALIDATE SINGLE FIELD
  ========================================= */

  const validateField = (name, value) => {
    const trimmed = value.trim();

    switch (name) {
      case "name":
        if (!trimmed) {
          return "Full name is required.";
        }

        if (trimmed.length < 2) {
          return "Name must contain at least 2 characters.";
        }

        if (trimmed.length > 50) {
          return "Name cannot exceed 50 characters.";
        }

        if (!nameRegex.test(trimmed)) {
          return "Name can contain only letters, spaces, apostrophes or hyphens.";
        }

        return "";

      case "phone": {
        if (!trimmed) {
          return "Phone number is required.";
        }

        const normalized = trimmed.replace(/[\s-]/g, "");

        if (!phoneRegex.test(normalized)) {
          return "Enter a valid 10-digit Indian mobile number.";
        }

        return "";
      }

      case "location":
        if (!trimmed) {
          return "Location is required.";
        }

        if (trimmed.length < 2) {
          return "Location must contain at least 2 characters.";
        }

        if (trimmed.length > 80) {
          return "Location cannot exceed 80 characters.";
        }

        if (!locationRegex.test(trimmed)) {
          return "Enter a valid location.";
        }

        return "";

      case "targetRole":
        if (!trimmed) {
          return "Target role is required.";
        }

        if (trimmed.length < 2) {
          return "Target role must contain at least 2 characters.";
        }

        if (trimmed.length > 80) {
          return "Target role cannot exceed 80 characters.";
        }

        if (!roleRegex.test(trimmed)) {
          return "Enter a valid professional role.";
        }

        return "";

      case "bio":
        if (!trimmed) return "";

        if (trimmed.length < 10) {
          return "About Me should contain at least 10 characters.";
        }

        if (trimmed.length > 500) {
          return "About Me cannot exceed 500 characters.";
        }

        return "";

      case "github":
        if (!validateGithub(trimmed)) {
          return "Enter a valid GitHub profile URL.";
        }

        return "";

      case "linkedin":
        if (!validateLinkedin(trimmed)) {
          return "Enter a valid LinkedIn profile URL.";
        }

        return "";

      case "website":
        if (!validateUrl(trimmed)) {
          return "Enter a valid website URL starting with http:// or https://.";
        }

        return "";

      default:
        return "";
    }
  };

  /* =========================================
     VALIDATE COMPLETE PROFILE
  ========================================= */

  const validateProfile = () => {
    const fields = [
      "name",
      "phone",
      "location",
      "targetRole",
      "bio",
      "github",
      "linkedin",
      "website",
    ];

    const newErrors = {};

    fields.forEach((field) => {
      const error = validateField(field, profile[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================
     HANDLE INPUT CHANGE
  ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    /*
      Phone:
      Only allow numbers, spaces, + and -
    */
    if (name === "phone") {
      newValue = value.replace(/[^\d+\s-]/g, "");

      /*
        Prevent + from appearing anywhere except beginning.
      */
      if (newValue.includes("+")) {
        newValue = "+" + newValue.replace(/\+/g, "").replace(/[^\d\s-]/g, "");
      }

      /*
        Limit length.
      */
      if (newValue.replace(/\D/g, "").length > 12) {
        return;
      }
    }

    /*
      Full name:
      Do not allow numbers or random symbols.
    */
    if (name === "name") {
      newValue = value.replace(/[^A-Za-z\s'-]/g, "");

      if (newValue.length > 50) {
        return;
      }
    }

    /*
      Location:
      Remove obviously invalid characters.
    */
    if (name === "location") {
      newValue = value.replace(/[^A-Za-z0-9\s,.'-]/g, "");

      if (newValue.length > 80) {
        return;
      }
    }

    /*
      Target role:
      Allow normal professional role characters.
    */
    if (name === "targetRole") {
      newValue = value.replace(/[^A-Za-z0-9\s/&.,'()+#-]/g, "");

      if (newValue.length > 80) {
        return;
      }
    }

    /*
      Bio length limit.
    */
    if (name === "bio" && newValue.length > 500) {
      return;
    }

    setProfile((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    /*
      Remove error as user starts correcting.
    */
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  /* =========================================
     AVATAR
  ========================================= */

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG or WEBP images are allowed.");

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Profile image must be smaller than 5 MB.");

      e.target.value = "";
      return;
    }

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

      toast.error(err.response?.data?.message || "Failed to upload image.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  /* =========================================
   SKILLS
========================================= */

  const validateSkill = (skill) => {
    const value = skill.trim();

    if (!value) {
      return "Please enter a skill.";
    }

    if (value.length < 2) {
      return "Skill must contain at least 2 characters.";
    }

    if (value.length > 40) {
      return "Skill cannot exceed 40 characters.";
    }

    if (!/[A-Za-z]/.test(value)) {
      return "Please enter a valid skill.";
    }

    if (!/^[A-Za-z0-9.+#&/\- ]+$/.test(value)) {
      return "Skill contains invalid characters.";
    }

    if (
      profile.skills.some(
        (skill) => skill.trim().toLowerCase() === value.toLowerCase(),
      )
    ) {
      return "This skill is already added.";
    }

    return "";
  };

  const addSkill = () => {
    const value = skillInput.trim();

    const error = validateSkill(value);

    if (error) {
      toast.warning(error);
      return;
    }

    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, value],
    }));

    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  /* =========================================
     SAVE PROFILE
  ========================================= */

  const handleSave = async () => {
    const isValid = validateProfile();

    if (!isValid) {
      toast.error("Please correct the highlighted fields before saving.");

      return;
    }

    try {
      setSaving(true);

      const cleanedProfile = {
        ...profile,
        name: profile.name.trim(),
        phone: profile.phone.replace(/\s+/g, "").replace(/-/g, ""),
        location: profile.location.trim(),
        targetRole: profile.targetRole.trim(),
        bio: profile.bio.trim(),
        github: profile.github.trim(),
        linkedin: profile.linkedin.trim(),
        website: profile.website.trim(),
      };

      await updateProfile(cleanedProfile);

      toast.success("Profile updated successfully.");

      navigate("/profile");
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
     INPUT CLASS
  ========================================= */

  const inputClass = (field) => `
    w-full
    rounded-xl
    border
    p-4
    outline-none
    transition
    ${
      errors[field]
        ? "border-red-500 focus:ring-2 focus:ring-red-500"
        : "border-slate-300 focus:ring-2 focus:ring-blue-500 dark:border-slate-700"
    }
    bg-white
    text-slate-900
    dark:bg-slate-800
    dark:text-white
  `;

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="text-xl font-semibold text-slate-700 dark:text-white">
            Loading Profile...
          </div>
        </div>
      </MainLayout>
    );
  }

  /* =========================================
     UI
  ========================================= */

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-6xl space-y-8"
      >
        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold">Edit Profile</h1>

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
              accept="image/jpeg,image/png,image/webp"
              hidden
              ref={fileInputRef}
              onChange={handleAvatarUpload}
            />

            <div className="relative">
              <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-5xl font-bold text-white shadow-xl">
                {profile.avatar ? (
                  <img
                    src={`${BACKEND_URL}${profile.avatar}`}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  profile.name.charAt(0).toUpperCase()
                )}
              </div>

              <button
                type="button"
                onClick={handleAvatarClick}
                disabled={uploading}
                className="absolute bottom-2 right-2 rounded-full bg-white p-3 shadow-lg transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <HiOutlineCamera className="text-xl text-blue-600" />
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
              {uploading
                ? "Uploading image..."
                : "JPG, PNG or WEBP • Maximum 5 MB"}
            </p>
          </div>

          {/* Personal Information */}

          <div className="mt-10">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
              Personal Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}

              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                  <HiOutlineUser />
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="e.g. Gulshan Kumar"
                  className={inputClass("name")}
                />

                {errors.name && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                  <HiOutlineEnvelope />
                  Email
                </label>

                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-slate-300 bg-slate-100 p-4 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                />

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Email address cannot be changed from this page.
                </p>
              </div>

              {/* Phone */}

              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                  <HiOutlinePhone />
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  inputMode="tel"
                  className={inputClass("phone")}
                />

                {errors.phone && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Location */}

              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                  <HiOutlineMapPin />
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="e.g. Delhi, India"
                  className={inputClass("location")}
                />

                {errors.location && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Target Role */}

              <div className="md:col-span-2">
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                  <HiOutlineBriefcase />
                  Target Role
                </label>

                <input
                  type="text"
                  name="targetRole"
                  value={profile.targetRole}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Developer"
                  className={inputClass("targetRole")}
                />

                {errors.targetRole && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.targetRole}
                  </p>
                )}
              </div>

              {/* About */}

              <div className="md:col-span-2">
                <div className="mb-2 flex items-center justify-between">
                  <label className="font-semibold text-slate-900 dark:text-white">
                    About Me
                  </label>

                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {profile.bio.length}/500
                  </span>
                </div>

                <textarea
                  rows={5}
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Write something meaningful about yourself..."
                  className={inputClass("bio")}
                />

                {errors.bio && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.bio}
                  </p>
                )}
              </div>

              {/* =========================================
    Technical Skills
========================================= */}

              <div className="md:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Technical Skills
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Add the technologies and skills you actually know.
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    {profile.skills.length} Skills
                  </span>
                </div>

                {/* Add Skill */}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="e.g. React, Python, MongoDB"
                    maxLength={40}
                    className="
        flex-1
        rounded-xl
        border
        border-slate-300
        bg-white
        p-4
        text-slate-900
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/20
        dark:border-slate-700
        dark:bg-slate-800
        dark:text-white
        dark:placeholder:text-slate-500
      "
                  />

                  <button
                    type="button"
                    onClick={addSkill}
                    className="
        rounded-xl
        bg-blue-600
        px-7
        py-3
        font-bold
        text-white
        transition
        hover:bg-blue-700
        hover:shadow-lg
      "
                  >
                    + Add Skill
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Press Enter or click Add Skill.
                </p>

                {/* Current Skills */}

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">
                  {profile.skills.length === 0 ? (
                    <div className="py-6 text-center">
                      <p className="font-semibold text-slate-600 dark:text-slate-300">
                        No skills added yet
                      </p>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Add your technical skills above.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {profile.skills.map((skill, index) => (
                        <motion.div
                          key={`${skill}-${index}`}
                          initial={{
                            opacity: 0,
                            scale: 0.9,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-200
              bg-blue-50
              px-4
              py-2
              text-sm
              font-semibold
              text-blue-700
              dark:border-blue-800
              dark:bg-blue-900/30
              dark:text-blue-300
            "
                        >
                          <span>{skill}</span>

                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                text-blue-500
                transition
                hover:bg-red-100
                hover:text-red-600
                dark:hover:bg-red-900/30
                dark:hover:text-red-400
              "
                            aria-label={`Remove ${skill}`}
                          >
                            ×
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* GitHub */}

              <div>
                <label className="mb-2 block font-semibold text-slate-900 dark:text-white">
                  GitHub
                </label>

                <input
                  type="url"
                  name="github"
                  value={profile.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className={inputClass("github")}
                />

                {errors.github && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.github}
                  </p>
                )}
              </div>

              {/* LinkedIn */}

              <div>
                <label className="mb-2 block font-semibold text-slate-900 dark:text-white">
                  LinkedIn
                </label>

                <input
                  type="url"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className={inputClass("linkedin")}
                />

                {errors.linkedin && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.linkedin}
                  </p>
                )}
              </div>

              {/* Portfolio */}

              <div className="md:col-span-2">
                <label className="mb-2 block font-semibold text-slate-900 dark:text-white">
                  Portfolio Website
                </label>

                <input
                  type="url"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className={inputClass("website")}
                />

                {errors.website && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.website}
                  </p>
                )}
              </div>
            </div>

            {/* Skills */}

            <div className="mt-10">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
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
                className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
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
