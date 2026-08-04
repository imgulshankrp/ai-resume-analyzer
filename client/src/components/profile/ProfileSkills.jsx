import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineSparkles,
  HiOutlineCodeBracket,
} from "react-icons/hi2";

import { getProfile } from "../../services/profileService";

export default function ProfileSkills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const res = await getProfile();

      setSkills(res.user.skills || []);
    } catch (error) {
      console.error("Profile Skills Error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-8"
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-4">

          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">

            <HiOutlineCodeBracket className="text-3xl text-white" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Technical Skills
            </h2>

            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Technologies detected from your profile
            </p>

          </div>

        </div>

        <div className="rounded-xl bg-indigo-100 dark:bg-indigo-900/40 px-4 py-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300">
          {skills.length} Skills
        </div>

      </div>

      {/* Skills */}

      {skills.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 py-12 text-center">

          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
            No Skills Added
          </h3>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Update your profile to add your technical skills.
          </p>

        </div>

      ) : (

        <div className="flex flex-wrap gap-4">

          {skills.map((skill, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.04,
              }}
              whileHover={{
                y: -4,
                scale: 1.06,
              }}
              className="
                group
                flex
                items-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                px-5
                py-3
                text-white
                shadow-lg
                cursor-pointer
              "
            >

              <HiOutlineSparkles className="text-lg group-hover:rotate-12 transition" />

              <span className="font-medium">
                {skill}
              </span>

            </motion.div>

          ))}

        </div>

      )}

      {/* Footer */}

      <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5">

        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">

          These skills are loaded directly from your profile. You can update
          them anytime from the <strong>Edit Profile</strong> page. Keeping
          them up to date improves ATS analysis, resume recommendations,
          and job matching.

        </p>

      </div>

    </motion.div>
  );
}