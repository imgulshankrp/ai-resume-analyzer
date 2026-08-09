import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MainLayout from "../components/layout/MainLayout";

import {
  HiBell,
  HiCheckCircle,
  HiDocumentText,
  HiSparkles,
  HiTrash,
  HiSearch,
  HiDotsVertical,
  HiCheck,
  HiX,
  HiChevronDown,
  HiClock,
} from "react-icons/hi";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notificationService";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Search / Filter */
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  /* Menu */
  const [openMenuId, setOpenMenuId] = useState(null);

  /* Delete all modal */
  const [showDeleteAllModal, setShowDeleteAllModal] =
    useState(false);

  const [deletingAll, setDeletingAll] = useState(false);

  /* =========================================================
     LOAD NOTIFICATIONS
  ========================================================= */

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();

      setNotifications(res.notifications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     MARK SINGLE NOTIFICATION AS READ
  ========================================================= */

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isRead: true }
            : item
        )
      );

      setOpenMenuId(null);
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================================================
     DELETE SINGLE NOTIFICATION
  ========================================================= */

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((item) => item._id !== id)
      );

      setOpenMenuId(null);
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================================================
     MARK ALL AS READ
  ========================================================= */

  const handleMarkAll = async () => {
    try {
      await markAllAsRead();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================================================
     DELETE ALL
     
     Uses existing deleteNotification() API for each item.
     No new backend endpoint required.
  ========================================================= */

  const handleDeleteAll = async () => {
    if (notifications.length === 0) {
      setShowDeleteAllModal(false);
      return;
    }

    try {
      setDeletingAll(true);

      await Promise.all(
        notifications.map((item) =>
          deleteNotification(item._id)
        )
      );

      setNotifications([]);
      setOpenMenuId(null);
      setShowDeleteAllModal(false);
    } catch (err) {
      console.error(err);

      /*
       * Reload in case some notifications were deleted
       * successfully before an error occurred.
       */
      await loadNotifications();
    } finally {
      setDeletingAll(false);
    }
  };

  /* =========================================================
     ICON
  ========================================================= */

  const getIcon = (type) => {
    switch (type) {
      case "resume":
        return HiDocumentText;

      case "analysis":
        return HiSparkles;

      case "profile":
        return HiCheckCircle;

      default:
        return HiBell;
    }
  };

  /* =========================================================
     COLORS
  ========================================================= */

  const getIconStyle = (type) => {
    switch (type) {
      case "resume":
        return {
          wrapper:
            "bg-blue-500/10 text-blue-500",
          dot: "bg-blue-500",
          label:
            "bg-blue-500/10 text-blue-500",
        };

      case "analysis":
        return {
          wrapper:
            "bg-purple-500/10 text-purple-500",
          dot: "bg-purple-500",
          label:
            "bg-purple-500/10 text-purple-500",
        };

      case "profile":
        return {
          wrapper:
            "bg-emerald-500/10 text-emerald-500",
          dot: "bg-emerald-500",
          label:
            "bg-emerald-500/10 text-emerald-500",
        };

      default:
        return {
          wrapper:
            "bg-slate-500/10 text-slate-500",
          dot: "bg-slate-500",
          label:
            "bg-slate-500/10 text-slate-500",
        };
    }
  };

  /* =========================================================
     TYPE LABEL
  ========================================================= */

  const getTypeLabel = (type) => {
    switch (type) {
      case "resume":
        return "Resume";

      case "analysis":
        return "Analysis";

      case "profile":
        return "Profile";

      default:
        return "System";
    }
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredNotifications = useMemo(() => {
    let data = [...notifications];

    /* Search */
    if (searchTerm.trim()) {
      const search = searchTerm
        .toLowerCase()
        .trim();

      data = data.filter((item) => {
        const title =
          item.title?.toLowerCase() || "";

        const message =
          item.message?.toLowerCase() || "";

        return (
          title.includes(search) ||
          message.includes(search)
        );
      });
    }

    /* Category */
    if (activeFilter === "unread") {
      data = data.filter(
        (item) => !item.isRead
      );
    } else if (
      ["resume", "analysis", "profile"].includes(
        activeFilter
      )
    ) {
      data = data.filter(
        (item) => item.type === activeFilter
      );
    }

    return data;
  }, [
    notifications,
    searchTerm,
    activeFilter,
  ]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  const resumeCount = notifications.filter(
    (item) => item.type === "resume"
  ).length;

  const analysisCount = notifications.filter(
    (item) => item.type === "analysis"
  ).length;

  const profileCount = notifications.filter(
    (item) => item.type === "profile"
  ).length;

  /* =========================================================
     DATE
  ========================================================= */

  const formatDate = (date) => {
    if (!date) {
      return {
        date: "Unknown",
        time: "",
      };
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return {
        date: "Unknown",
        time: "",
      };
    }

    return {
      date: parsedDate.toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      ),

      time: parsedDate.toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
    };
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <MainLayout>
        <div
          className="
            min-h-[70vh]
            flex
            items-center
            justify-center
            bg-gray-100
            dark:bg-[#07111f]
          "
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className="
                h-11
                w-11
                rounded-full
                border-4
                border-blue-500/20
                border-t-blue-500
                animate-spin
              "
            />

            <p
              className="
                text-base
                font-semibold
                text-gray-700
                dark:text-gray-200
              "
            >
              Loading Notifications...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  /* =========================================================
     MAIN
  ========================================================= */

  return (
    <MainLayout>
      <div
        className="
          min-h-full
          bg-gray-100
          dark:bg-[#07111f]
          transition-colors
          duration-300
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1200px]
            px-3
            py-5
            sm:px-5
            sm:py-7
            lg:px-6
          "
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-6"
          >
            <div
              className="
                flex
                flex-col
                gap-5
                sm:flex-row
                sm:items-start
                sm:justify-between
              "
            >

              {/* LEFT */}

              <div className="flex items-start gap-4">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-600
                    text-white
                    shadow-lg
                    shadow-blue-600/20
                  "
                >
                  <HiBell className="text-2xl" />
                </div>

                <div>

                  <div className="flex flex-wrap items-center gap-3">

                    <h1
                      className="
                        text-3xl
                        font-bold
                        tracking-tight
                        text-gray-900
                        dark:text-white
                        sm:text-4xl
                      "
                    >
                      Notifications
                    </h1>

                    {unreadCount > 0 && (
                      <span
                        className="
                          rounded-full
                          bg-blue-600
                          px-3
                          py-1
                          text-xs
                          font-bold
                          text-white
                        "
                      >
                        {unreadCount} unread
                      </span>
                    )}

                  </div>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-gray-600
                      dark:text-gray-400
                      sm:text-base
                    "
                  >
                    Stay updated with your
                    ResumeAI activity and alerts.
                  </p>

                </div>

              </div>

              {/* =================================================
                  TOP ACTIONS
              ================================================= */}

              <div
                className="
                  flex
                  w-full
                  flex-wrap
                  gap-2
                  sm:w-auto
                  sm:justify-end
                "
              >

                <button
                  onClick={handleMarkAll}
                  disabled={unreadCount === 0}
                  className="
                    inline-flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-blue-200
                    bg-blue-50
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-blue-600
                    transition
                    hover:bg-blue-100
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                    dark:border-blue-500/20
                    dark:bg-blue-500/10
                    dark:text-blue-400
                    dark:hover:bg-blue-500/20
                    sm:flex-none
                  "
                >
                  <HiCheck className="text-lg" />
                  Mark All Read
                </button>

                <button
                  onClick={() =>
                    setShowDeleteAllModal(true)
                  }
                  disabled={
                    notifications.length === 0
                  }
                  className="
                    inline-flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-red-500
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-red-500/10
                    transition
                    hover:bg-red-600
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                    sm:flex-none
                  "
                >
                  <HiTrash className="text-lg" />
                  Delete All
                </button>

              </div>

            </div>
          </motion.div>

          {/* =================================================
              SEARCH
          ================================================= */}

          <div
            className="
              mb-4
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-4
              shadow-sm
              dark:border-slate-800
              dark:bg-[#0c192b]
            "
          >

            <div
              className="
                relative
                w-full
              "
            >

              <HiSearch
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-xl
                  text-gray-400
                  dark:text-slate-500
                "
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search notifications..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  pl-11
                  pr-10
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                  dark:border-slate-700
                  dark:bg-[#111f33]
                  dark:text-white
                  dark:placeholder:text-slate-500
                "
              />

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    rounded-full
                    p-1
                    text-gray-400
                    hover:text-gray-700
                    dark:hover:text-white
                  "
                >
                  <HiX />
                </button>
              )}

            </div>

          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div
            className="
              mb-5
              flex
              gap-2
              overflow-x-auto
              pb-1
            "
          >

            {/* ALL */}

            <button
              onClick={() => setActiveFilter("all")}
              className={`
                shrink-0
                rounded-xl
                px-4
                py-2
                text-sm
                font-semibold
                transition
                ${
                  activeFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 bg-white text-gray-600 dark:border-slate-800 dark:bg-[#0c192b] dark:text-gray-300"
                }
              `}
            >
              All
              <span className="ml-2 opacity-70">
                {notifications.length}
              </span>
            </button>

            {/* UNREAD */}

            <button
              onClick={() =>
                setActiveFilter("unread")
              }
              className={`
                shrink-0
                rounded-xl
                px-4
                py-2
                text-sm
                font-semibold
                transition
                ${
                  activeFilter === "unread"
                    ? "bg-blue-500/15 text-blue-500 border border-blue-500/30"
                    : "border border-gray-200 bg-white text-gray-600 dark:border-slate-800 dark:bg-[#0c192b] dark:text-gray-300"
                }
              `}
            >
              Unread
              <span className="ml-2 opacity-70">
                {unreadCount}
              </span>
            </button>

            {/* RESUME */}

            <button
              onClick={() =>
                setActiveFilter("resume")
              }
              className={`
                shrink-0
                rounded-xl
                px-4
                py-2
                text-sm
                font-semibold
                transition
                ${
                  activeFilter === "resume"
                    ? "bg-blue-500/15 text-blue-500 border border-blue-500/30"
                    : "border border-gray-200 bg-white text-gray-600 dark:border-slate-800 dark:bg-[#0c192b] dark:text-gray-300"
                }
              `}
            >
              Resume
              <span className="ml-2 opacity-70">
                {resumeCount}
              </span>
            </button>

            {/* ANALYSIS */}

            <button
              onClick={() =>
                setActiveFilter("analysis")
              }
              className={`
                shrink-0
                rounded-xl
                px-4
                py-2
                text-sm
                font-semibold
                transition
                ${
                  activeFilter === "analysis"
                    ? "bg-purple-500/15 text-purple-500 border border-purple-500/30"
                    : "border border-gray-200 bg-white text-gray-600 dark:border-slate-800 dark:bg-[#0c192b] dark:text-gray-300"
                }
              `}
            >
              Analysis
              <span className="ml-2 opacity-70">
                {analysisCount}
              </span>
            </button>

            {/* PROFILE */}

            <button
              onClick={() =>
                setActiveFilter("profile")
              }
              className={`
                shrink-0
                rounded-xl
                px-4
                py-2
                text-sm
                font-semibold
                transition
                ${
                  activeFilter === "profile"
                    ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                    : "border border-gray-200 bg-white text-gray-600 dark:border-slate-800 dark:bg-[#0c192b] dark:text-gray-300"
                }
              `}
            >
              Profile
              <span className="ml-2 opacity-70">
                {profileCount}
              </span>
            </button>

          </div>

          {/* =================================================
              RESULT COUNT
          ================================================= */}

          <div className="mb-3 px-1">

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {filteredNotifications.length}
              </span>{" "}
              notification
              {filteredNotifications.length !== 1
                ? "s"
                : ""}
            </p>

          </div>

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {filteredNotifications.length === 0 ? (

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                rounded-2xl
                border
                border-dashed
                border-gray-300
                bg-white
                px-5
                py-20
                text-center
                shadow-sm
                dark:border-slate-700
                dark:bg-[#0c192b]
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-500/10
                  text-blue-500
                "
              >
                <HiBell className="text-3xl" />
              </div>

              <h2
                className="
                  mt-5
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                {searchTerm ||
                activeFilter !== "all"
                  ? "No Notifications Found"
                  : "You're All Caught Up"}
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                {searchTerm
                  ? "Try searching with a different keyword."
                  : activeFilter !== "all"
                    ? "There are no notifications in this category."
                    : "New resume activity and important alerts will appear here."}
              </p>

              {(searchTerm ||
                activeFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("all");
                  }}
                  className="
                    mt-5
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  Clear Filters
                </button>
              )}

            </motion.div>

          ) : (

            /* =================================================
               NOTIFICATION LIST
            ================================================= */

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
                dark:border-slate-800
                dark:bg-[#0c192b]
              "
            >

              <AnimatePresence initial={false}>

                {filteredNotifications.map(
                  (item, index) => {

                    const Icon =
                      getIcon(item.type);

                    const style =
                      getIconStyle(item.type);

                    const dateInfo =
                      formatDate(
                        item.createdAt
                      );

                    return (
                      <motion.div
                        key={item._id}
                        layout
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          overflow: "hidden",
                        }}
                        transition={{
                          duration: 0.2,
                          delay: index * 0.02,
                        }}
                        className={`
                          relative
                          border-b
                          border-gray-200
                          p-4
                          transition
                          last:border-b-0
                          sm:p-5
                          dark:border-slate-800
                          ${
                            !item.isRead
                              ? "bg-blue-50/50 dark:bg-blue-500/[0.04]"
                              : "hover:bg-gray-50 dark:hover:bg-[#101e31]"
                          }
                        `}
                      >

                        {/* UNREAD INDICATOR */}

                        {!item.isRead && (
                          <span
                            className="
                              absolute
                              left-0
                              top-0
                              h-full
                              w-1
                              bg-blue-600
                            "
                          />
                        )}

                        <div
                          className="
                            flex
                            items-start
                            gap-3
                            sm:gap-4
                          "
                        >

                          {/* ICON */}

                          <div
                            className={`
                              flex
                              h-11
                              w-11
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              sm:h-12
                              sm:w-12
                              ${style.wrapper}
                            `}
                          >
                            <Icon className="text-xl" />
                          </div>

                          {/* CONTENT */}

                          <div className="min-w-0 flex-1">

                            {/* TITLE ROW */}

                            <div
                              className="
                                flex
                                items-start
                                justify-between
                                gap-2
                              "
                            >

                              <div className="min-w-0">

                                <div
                                  className="
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-2
                                  "
                                >

                                  <h3
                                    className={`
                                      text-sm
                                      sm:text-base
                                      ${
                                        item.isRead
                                          ? "font-semibold"
                                          : "font-bold"
                                      }
                                      text-gray-900
                                      dark:text-white
                                    `}
                                  >
                                    {item.title}
                                  </h3>

                                  {!item.isRead && (
                                    <span
                                      className="
                                        rounded-full
                                        bg-blue-600
                                        px-2
                                        py-0.5
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-wide
                                        text-white
                                      "
                                    >
                                      New
                                    </span>
                                  )}

                                </div>

                              </div>

                              {/* THREE DOT */}

                              <div className="relative shrink-0">

                                <button
                                  type="button"
                                  onClick={() =>
                                    setOpenMenuId(
                                      openMenuId ===
                                        item._id
                                        ? null
                                        : item._id
                                    )
                                  }
                                  className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    text-gray-400
                                    transition
                                    hover:bg-gray-100
                                    hover:text-gray-800
                                    dark:hover:bg-slate-800
                                    dark:hover:text-white
                                  "
                                >
                                  <HiDotsVertical className="text-lg" />
                                </button>

                                <AnimatePresence>

                                  {openMenuId ===
                                    item._id && (

                                    <motion.div
                                      initial={{
                                        opacity: 0,
                                        scale: 0.95,
                                        y: -5,
                                      }}
                                      animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                      }}
                                      exit={{
                                        opacity: 0,
                                        scale: 0.95,
                                        y: -5,
                                      }}
                                      className="
                                        absolute
                                        right-0
                                        top-10
                                        z-50
                                        w-44
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-white
                                        p-1.5
                                        shadow-2xl
                                        dark:border-slate-700
                                        dark:bg-[#101e31]
                                      "
                                    >

                                      {!item.isRead && (
                                        <button
                                          onClick={() =>
                                            handleMarkRead(
                                              item._id
                                            )
                                          }
                                          className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-lg
                                            px-3
                                            py-2.5
                                            text-left
                                            text-sm
                                            text-gray-700
                                            transition
                                            hover:bg-gray-100
                                            dark:text-gray-200
                                            dark:hover:bg-slate-800
                                          "
                                        >
                                          <HiCheck />
                                          Mark as Read
                                        </button>
                                      )}

                                      <button
                                        onClick={() =>
                                          handleDelete(
                                            item._id
                                          )
                                        }
                                        className="
                                          flex
                                          w-full
                                          items-center
                                          gap-3
                                          rounded-lg
                                          px-3
                                          py-2.5
                                          text-left
                                          text-sm
                                          text-red-500
                                          transition
                                          hover:bg-red-50
                                          dark:hover:bg-red-500/10
                                        "
                                      >
                                        <HiTrash />
                                        Delete
                                      </button>

                                    </motion.div>

                                  )}

                                </AnimatePresence>

                              </div>

                            </div>

                            {/* MESSAGE */}

                            <p
                              className="
                                mt-1.5
                                max-w-3xl
                                text-sm
                                leading-6
                                text-gray-600
                                dark:text-gray-300
                              "
                            >
                              {item.message}
                            </p>

                            {/* META */}

                            <div
                              className="
                                mt-3
                                flex
                                flex-wrap
                                items-center
                                gap-x-4
                                gap-y-2
                              "
                            >

                              <span
                                className={`
                                  inline-flex
                                  items-center
                                  rounded-full
                                  px-2.5
                                  py-1
                                  text-[10px]
                                  font-semibold
                                  ${style.label}
                                `}
                              >
                                {getTypeLabel(
                                  item.type
                                )}
                              </span>

                              <span
                                className="
                                  inline-flex
                                  items-center
                                  gap-1
                                  text-xs
                                  text-gray-400
                                  dark:text-gray-500
                                "
                              >
                                <HiClock />
                                {dateInfo.date}{" "}
                                {dateInfo.time}
                              </span>

                            </div>

                            {/* MOBILE QUICK ACTION */}

                            {!item.isRead && (
                              <button
                                onClick={() =>
                                  handleMarkRead(
                                    item._id
                                  )
                                }
                                className="
                                  mt-3
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  rounded-lg
                                  bg-blue-500/10
                                  px-3
                                  py-1.5
                                  text-xs
                                  font-semibold
                                  text-blue-600
                                  transition
                                  hover:bg-blue-500/20
                                  dark:text-blue-400
                                "
                              >
                                <HiCheck />
                                Mark as Read
                              </button>
                            )}

                          </div>

                        </div>

                      </motion.div>
                    );
                  }
                )}

              </AnimatePresence>

            </div>
          )}

        </div>
      </div>

      {/* =====================================================
          DELETE ALL CONFIRMATION MODAL
      ===================================================== */}

      {showDeleteAllModal && (

        <div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            bg-black/60
            px-4
            backdrop-blur-sm
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              shadow-2xl
              dark:border-slate-800
              dark:bg-[#0c192b]
            "
          >

            {/* MODAL HEADER */}

            <div className="flex items-start gap-4">

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-500/10
                  text-red-500
                "
              >
                <HiTrash className="text-2xl" />
              </div>

              <div>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  Delete All Notifications
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-gray-600
                    dark:text-gray-400
                  "
                >
                  Are you sure you want to delete all{" "}
                  <span className="font-semibold text-red-500">
                    {notifications.length}
                  </span>{" "}
                  notifications?
                </p>

              </div>

            </div>

            {/* WARNING */}

            <div
              className="
                mt-5
                rounded-xl
                bg-red-500/10
                px-4
                py-3
                text-sm
                text-red-500
              "
            >
              This action cannot be undone.
            </div>

            {/* BUTTONS */}

            <div className="mt-7 flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowDeleteAllModal(false)
                }
                disabled={deletingAll}
                className="
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-5
                  py-2.5
                  font-semibold
                  text-gray-700
                  transition
                  hover:bg-gray-100
                  disabled:opacity-50
                  dark:border-slate-700
                  dark:bg-[#111f33]
                  dark:text-gray-200
                  dark:hover:bg-[#16243a]
                "
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAll}
                disabled={deletingAll}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  px-5
                  py-2.5
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-700
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {deletingAll ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <HiTrash />
                    Delete All
                  </>
                )}

              </button>

            </div>

          </motion.div>

        </div>
      )}

    </MainLayout>
  );
}