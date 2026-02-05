import { Routes, Route, Outlet, useLocation } from "react-router-dom";

// PUBLIC
import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AboutPage from "../pages/about/AboutPage";

// LEGAL
import PrivacyPolicy from "../pages/privacy/PrivacyPolicy";
import TermsPage from "../pages/terms/TermsPage";

// PROTECTED
import Gateway from "../pages/gateway/Gateway";
import Home from "../pages/home/Home";
import ProfilePage from "../pages/profile/ProfilePage";
import CyberNewsPage from "../pages/news/CyberNewsPage";
import HelpPage from "../pages/help/HelpPage";
import CityPage from "../pages/help/CityPage";
import ChatPage from "../pages/chat/ChatPage";

import HomeHeader from "../components/home/HomeHeader";
import ProtectedRoute from "./ProtectedRoute";


// ================= HEADER CONTROL =================

function ProtectedLayout() {

  const location = useLocation();
  const isMobile = window.innerWidth < 768;

  let showHeader = false;

  // Desktop → only home
  if (!isMobile) {
    showHeader = location.pathname === "/home";
  }

  // Mobile → home + news only
  else {
    showHeader =
      location.pathname === "/home" ||
      location.pathname === "/news";
  }

  return (
    <>
      {showHeader && <HomeHeader />}
      <Outlet />
    </>
  );
}


// ================= ROUTES =================

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
