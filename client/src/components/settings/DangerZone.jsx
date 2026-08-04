import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  HiOutlineTrash,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineExclamationTriangle,
  HiOutlineShieldExclamation,
  HiOutlineDocumentText,
  HiOutlineBell,
} from "react-icons/hi2";

import {
  deleteAccount,
  deleteAllNotifications,
  deleteAllResumes,
} from "../../services/dangerService";

export default function DangerZone() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully.");

    navigate("/login", {
      replace: true,
    });

  };

  const handleDeleteResumes = async () => {

    if (
      !window.confirm(
        "Delete all resume history?"
      )
    )
      return;

    try {

      await deleteAllResumes();

      toast.success(
        "All resume history deleted."
      );

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Failed to delete resumes."
      );

    }

  };

  const handleDeleteNotifications =
    async () => {

      if (
        !window.confirm(
          "Delete all notifications?"
        )
      )
        return;

      try {

        await deleteAllNotifications();

        toast.success(
          "Notifications deleted."
        );

      } catch (err) {

        toast.error(
          err.response?.data?.message ||
            "Failed to delete notifications."
        );

      }

    };

  const handleDeleteAccount =
    async () => {

      const text = prompt(
        'Type "DELETE" to permanently delete your account.'
      );

      if (text !== "DELETE") {

        toast.info(
          "Account deletion cancelled."
        );

        return;

      }

      try {

        await deleteAccount();

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success(
          "Account deleted successfully."
        );

        navigate("/login", {
          replace: true,
        });

      } catch (err) {

        toast.error(
          err.response?.data?.message ||
            "Failed to delete account."
        );

      }

    };

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-red-300 bg-gradient-to-br from-red-50 to-red-100 p-8 shadow-lg dark:border-red-800 dark:from-red-900/20 dark:to-red-950/20"
    >
          {/* Header */}

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-red-600 p-4 text-white shadow-lg">

          <HiOutlineShieldExclamation className="text-3xl" />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-red-600">

            Danger Zone

          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-300">

            These actions are permanent and cannot be undone.
            Please proceed carefully.

          </p>

        </div>

      </div>

      {/* Warning */}

      <div className="mt-8 flex items-start gap-4 rounded-2xl border border-red-300 bg-white p-5 dark:border-red-700 dark:bg-slate-900">

        <HiOutlineExclamationTriangle className="mt-1 text-3xl text-red-500" />

        <div>

          <h3 className="font-bold text-slate-900 dark:text-white">

            Important Notice

          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">

            Deleting your account permanently removes your profile,
            uploaded resumes, ATS reports, AI analysis,
            notifications and all related data.

          </p>

        </div>

      </div>

      {/* Actions */}

      <div className="mt-10 grid gap-5 md:grid-cols-2">

        {/* Logout */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-6 py-5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >

          <HiOutlineArrowLeftOnRectangle className="text-2xl" />

          Logout From Current Device

        </motion.button>

        {/* Delete Resume History */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDeleteResumes}
          className="flex items-center justify-center gap-3 rounded-2xl border border-orange-300 bg-orange-50 px-6 py-5 font-semibold text-orange-700 shadow-sm transition hover:bg-orange-100 dark:border-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
        >

          <HiOutlineDocumentText className="text-2xl" />

          Delete Resume History

        </motion.button>

        {/* Delete Notifications */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDeleteNotifications}
          className="flex items-center justify-center gap-3 rounded-2xl border border-yellow-300 bg-yellow-50 px-6 py-5 font-semibold text-yellow-700 shadow-sm transition hover:bg-yellow-100 dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
        >

          <HiOutlineBell className="text-2xl" />

          Delete All Notifications

        </motion.button>

        {/* Delete Account */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDeleteAccount}
          className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 font-semibold text-white shadow-lg transition hover:shadow-xl"
        >

          <HiOutlineTrash className="text-2xl" />

          Delete My Account

        </motion.button>

      </div>
            {/* Footer */}

      <div className="mt-8 rounded-2xl border border-red-200 bg-red-100 px-5 py-4 dark:border-red-800 dark:bg-red-900/30">

        <p className="text-sm leading-7 text-red-700 dark:text-red-300">

          ⚠️ These actions are irreversible.
          Before deleting your account, make sure you have downloaded any
          resume reports or data you wish to keep.

        </p>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-red-700 dark:text-red-300">

          <li>
            Deleting your account permanently removes all your personal data.
          </li>

          <li>
            Resume history and AI analysis cannot be recovered.
          </li>

          <li>
            Notifications will be permanently deleted.
          </li>

          <li>
            You will be logged out immediately after account deletion.
          </li>

        </ul>

      </div>

    </motion.div>

  );

}