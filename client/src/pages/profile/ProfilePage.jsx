import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import API from "../../api/axios"; // renamed for clarity

import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";
import ProfilePostsGrid from "./components/ProfilePostsGrid";
import EditBioModal from "./components/EditBioModal";
import AvatarUploader from "./components/AvatarUploader";

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
  const [deletePassword, setDeletePassword] = useState("");

  /* ================= PROFILE FETCH ================= */

  const fetchProfile = async () => {
    try {

      if (!username) return;

      const res = await API.get(`/profile/${username}`);
      setProfile(res.data);
      setBioInput(res.data.bio || "");

    } catch (err) {

      console.error("Profile fetch error:", err);

      if (err.response?.status === 404) {
        navigate("/home");
      }

    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  /* ================= FOLLOW ================= */

  const handleFollowToggle = async () => {

    try {

      await API.post(`/follow/${username}`);
      await fetchProfile();

      window.dispatchEvent(
        new CustomEvent("followUpdated", {
          detail: {
            username,
            following: profile?.isFollowing
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

    API.get(`/profile/${username}/posts`)
      .then(res => setPosts(res.data))
      .catch(err => console.log("Post fetch error:", err));

  }, [activeTab, username]);

  /* ================= SAVED POSTS ================= */

  useEffect(() => {

    if (activeTab !== "saved") return;

    API.get("/profile/saved/me")
      .then(res => setSavedPosts(res.data))
      .catch(err => console.log("Saved fetch error:", err));

  }, [activeTab]);

  /* ================= BIO UPDATE ================= */

  const handleBioUpdate = async () => {

    try {

      await API.put("/profile/edit/bio", { bio: bioInput });

      setProfile(prev => ({
        ...prev,
        bio: bioInput
      }));

      setShowEdit(false);

    } catch (err) {
      console.log("Bio update error:", err);
    }

  };

  /* ================= AVATAR UPDATE ================= */

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

    navigate("/login");

  };

  /* ================= DELETE ACCOUNT ================= */

  const handleDeleteAccount = async () => {

    if (!deletePassword) {
      alert("Please enter password");
      return;
    }

    try {

      setDeleting(true);

      await API.delete("/profile/delete/me", {
        data: { password: deletePassword }
      });

      localStorage.clear();
      sessionStorage.clear();

      alert("Account deleted permanently");

      navigate("/");

    } catch (error) {

      console.log("Delete error:", error);

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

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

      {/* DROPDOWN */}
      <div className="flex justify-end mb-4 relative">

        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="flex items-center gap-1 bg-[#0b1628] border border-cyan-500/20 px-3 py-2 rounded-lg text-cyan-400"
        >
          <PersonIcon fontSize="small" />
          <ArrowDropDownIcon />
        </button>

        {menuOpen && (

          <div className="absolute right-0 top-12 w-52 bg-[#071427] border border-cyan-500/20 rounded-xl shadow-xl z-50">

            <button
              onClick={() => {
                navigate("/home");
                setMenuOpen(false);
              }}
              className="flex md:hidden w-full items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-cyan-500/10"
            >
              <HomeIcon fontSize="small" />
              Home
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
            >
              <DeleteForeverIcon fontSize="small" />
              Delete Account
            </button>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
            >
              <LogoutIcon fontSize="small" />
              Logout
            </button>

          </div>

        )}

      </div>

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
        savedPosts={savedPosts}
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

    </div>
  );
}
