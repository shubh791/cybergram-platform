import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "../../api/axios.js";

import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";
import ProfilePostsGrid from "./components/ProfilePostsGrid";
import EditBioModal from "./components/EditBioModal";
import AvatarUploader from "./components/AvatarUploader";

// ===== ICONS =====
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function ProfilePage() {

  const { username } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("posts");

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  const [showAvatarUploader, setShowAvatarUploader] = useState(false);
  const [bioInput, setBioInput] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ✅ NEW: password state for delete confirmation
  const [deletePassword, setDeletePassword] = useState("");

  /* ================= PROFILE ================= */

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/profile/${username}`);
      setProfile(res.data);
      setBioInput(res.data.bio || "");
    } catch (err) {
      console.log("Profile fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  /* ================= FOLLOW ================= */

  const handleFollowToggle = async () => {

    try {

      await axios.post(`/follow/${username}`);

      const res = await axios.get(`/profile/${username}`);
      setProfile(res.data);

      window.dispatchEvent(
        new CustomEvent("followUpdated", {
          detail: {
            username,
            following: res.data.isFollowing
          }
        })
      );

    } catch (error) {
      console.log("Follow error:", error);
    }

  };

  /* ================= POSTS ================= */

  useEffect(() => {

    if (activeTab !== "posts") return;

    axios.get(`/profile/${username}/posts`)
      .then(res => setPosts(res.data))
      .catch(err => console.log("Post fetch error:", err));

  }, [activeTab, username]);

  /* ================= SAVED ================= */

  useEffect(() => {

    if (activeTab !== "saved") return;

    axios.get("/profile/saved/me")
      .then(res => setSavedPosts(res.data))
      .catch(err => console.log("Saved fetch error:", err));

  }, [activeTab]);

  /* ================= BIO ================= */

  const handleBioUpdate = async () => {

    try {

      await axios.put("/profile/edit/bio", { bio: bioInput });

      setProfile(prev => ({
        ...prev,
        bio: bioInput
      }));

      setShowEdit(false);

    } catch (err) {
      console.log("Bio update error:", err);
    }

  };

  /* ================= AVATAR ================= */

  const handleAvatarUpdate = (newAvatar) => {

    setProfile(prev => ({
      ...prev,
      avatar: newAvatar
    }));

  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    localStorage.clear();
    sessionStorage.clear();

    window.location.href = "/gateway";

  };

  /* ================= DELETE ACCOUNT ================= */

  const handleDeleteAccount = async () => {

    if (!deletePassword) {
      alert("Please enter your password");
      return;
    }

    try {

      setDeleting(true);

      // axios instance already attaches token
      await axios.delete("/profile/delete/me", {
        data: {
          password: deletePassword
        }
      });

      localStorage.clear();
      sessionStorage.clear();

      alert("Account permanently deleted");

      window.location.href = "/";

    } catch (error) {

      console.log("Delete account error:", error);

      const msg =
        error.response?.data?.message ||
        "Failed to delete account";

      alert(msg);

    } finally {

      setDeleting(false);
      setDeletePassword("");
      setShowDeleteConfirm(false);

    }

  };

  if (!profile) {
    return <div className="text-white p-10">Loading profile...</div>;
  }

  return (

    <div className="min-h-screen bg-[#050d1a] text-white px-3 sm:px-5 md:px-10 py-6">

      {/* ================= DROPDOWN ================= */}

      <div className="flex justify-end items-center mb-4 relative">

        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="
            flex items-center gap-1
            bg-[#0b1628]
            border border-cyan-500/20
            px-3 py-2
            rounded-lg
            text-cyan-400
          "
        >
          <PersonIcon fontSize="small" />
          <ArrowDropDownIcon />
        </button>

        {menuOpen && (

          <div className="
            absolute right-0 top-12
            w-52
            bg-[#071427]
            border border-cyan-500/20
            rounded-xl
            shadow-xl
            overflow-hidden
            z-50
          ">

            {/* MOBILE HOME */}
            <button
              onClick={() => {
                navigate("/home");
                setMenuOpen(false);
              }}
              className="
                flex md:hidden
                w-full items-center gap-2
                px-4 py-3 text-sm
                text-gray-300 hover:bg-cyan-500/10
              "
            >
              <HomeIcon fontSize="small" />
              Home
            </button>

            {/* DELETE */}
            <button
              onClick={() => {
                setShowDeleteConfirm(true);
                setMenuOpen(false);
              }}
              className="
                flex w-full items-center gap-2
                px-4 py-3 text-sm
                text-red-400 hover:bg-red-500/10
              "
            >
              <DeleteForeverIcon fontSize="small" />
              Delete Account
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="
                flex w-full items-center gap-2
                px-4 py-3 text-sm
                text-red-400 hover:bg-red-500/10
              "
            >
              <LogoutIcon fontSize="small" />
              Logout
            </button>

          </div>

        )}

      </div>

      {/* ================= PROFILE ================= */}

      <ProfileHeader
        profile={profile}
        onEdit={() => setShowEdit(true)}
        onAvatarClick={() => setShowAvatarUploader(true)}
        onFollowToggle={handleFollowToggle}
      />

      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <ProfilePostsGrid
        activeTab={activeTab}
        posts={posts}
        setPosts={setPosts}
        savedPosts={savedPosts}
        setSavedPosts={setSavedPosts}
      />

      {showEdit && (
        <EditBioModal
          bio={bioInput}
          setBio={setBioInput}
          onClose={() => setShowEdit(false)}
          onSave={handleBioUpdate}
        />
      )}

      {showAvatarUploader && (
        <AvatarUploader
          onClose={() => setShowAvatarUploader(false)}
          onUpdate={handleAvatarUpdate}
        />
      )}

      {/* ================= DELETE MODAL ================= */}

      {showDeleteConfirm && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#071427] border border-red-500/40 rounded-xl p-6 w-[90%] max-w-md text-center">

            <DeleteForeverIcon className="text-red-500 text-5xl mb-3" />

            <h2 className="text-lg font-bold text-red-400">
              Delete Account Permanently?
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              This action is irreversible. Your profile, posts and data will be removed forever.
            </p>

            {/* PASSWORD CONFIRM INPUT */}
            <input
              type="password"
              placeholder="Enter your password to confirm"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="
                w-full mt-4 px-3 py-2 rounded-lg
                bg-[#050d1a]
                border border-red-500/40
                text-white
                outline-none
                focus:border-red-500
              "
            />

            <div className="flex gap-4 mt-6">

              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletePassword("");
                }}
                className="flex-1 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                disabled={deleting}
                onClick={handleDeleteAccount}
                className="
                  flex-1 py-2 rounded-lg
                  bg-red-500 hover:bg-red-600
                  disabled:opacity-60
                "
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}
