import { Routes, Route, Outlet, useLocation } from "react-router-dom";

// ================= PUBLIC PAGES =================

import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AboutPage from "../pages/about/AboutPage";

// ================= LEGAL PAGES =================

import PrivacyPolicy from "../pages/privacy/PrivacyPolicy";
import TermsPage from "../pages/terms/TermsPage";

// ================= PROTECTED PAGES =================

import Gateway from "../pages/gateway/Gateway";
import Home from "../pages/home/Home";
import ProfilePage from "../pages/profile/ProfilePage";
import CyberNewsPage from "../pages/news/CyberNewsPage";
import HelpPage from "../pages/help/HelpPage";
import CityPage from "../pages/help/CityPage";
import ChatPage from "../pages/chat/ChatPage";

import HomeHeader from "../components/home/HomeHeader";
import ProtectedRoute from "./ProtectedRoute";


// ================= PROTECTED LAYOUT =================

function ProtectedLayout() {

  const location = useLocation();

  const hideHeader =
    location.pathname === "/home" ||
    location.pathname === "/gateway" ||
    location.pathname.startsWith("/chat") ||
    location.pathname.startsWith("/help");

  return (
    <>
      {/* KEEP HEADER MOUNTED FOR SOCKET STABILITY */}
      <div style={{ display: hideHeader ? "none" : "block" }}>
        <HomeHeader />
      </div>

      <Outlet />
    </>
  );
}


export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about-us" element={<AboutPage />} />

      {/* LEGAL */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsPage />} />

      {/* PROTECTED */}
      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/gateway" element={<Gateway />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/news" element={<CyberNewsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/help/:state" element={<CityPage />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Login />} />

    </Routes>
  );
}
