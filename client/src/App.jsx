import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";
import History from "./pages/History";
import CompareResume from "./pages/CompareResume";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import EditProfile from "./pages/EditProfile";
import ResumeChatPage from "./pages/ResumeChatPage";
import JDMatcherPage from "./pages/JDMatcherPage";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white">

      <Routes>

        {/* ================= Public Routes ================= */}

        <Route element={<PublicRoute />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/verify-email"
            element={<VerifyEmail />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

        </Route>

        {/* ================= Protected Routes ================= */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/upload"
            element={<Upload />}
          />

          <Route
            path="/analysis/:id"
            element={<Analysis />}
          />

          <Route
            path="/chat/:id"
            element={<ResumeChatPage />}
          />

          <Route
            path="/jd-matcher"
            element={<JDMatcherPage />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/compare"
            element={<CompareResume />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/profile/edit"
            element={<EditProfile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

        </Route>

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </div>
  );
}

export default App;