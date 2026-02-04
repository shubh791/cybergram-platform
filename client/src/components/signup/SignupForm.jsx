import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PasswordStrength from "../auth/PasswordStrength";
import SuccessOverlay from "./SuccessOverlay";
import API from "../../api/axios";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function SignupForm() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const [accepted, setAccepted] = useState(false);
  const [success, setSuccess] = useState(false);

  const [usernameError, setUsernameError] = useState(null);
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  /* ================= USERNAME CHECK ================= */

  useEffect(() => {

    if (!form.username) {
      setUsernameStatus(null);
      setUsernameError(null);
      return;
    }

    if (form.username.includes("@")) {
      setUsernameError("Username cannot be an email");
      setUsernameStatus(null);
      return;
    }

    const regex = /^[a-zA-Z0-9._]+$/;

    if (!regex.test(form.username)) {
      setUsernameError("Only letters, numbers, dot (.) and underscore (_) allowed");
      setUsernameStatus(null);
      return;
    }

    setUsernameError(null);

    if (form.username.length < 3) {
      setUsernameStatus(null);
      return;
    }

    const timer = setTimeout(async () => {

      try {

        setCheckingUsername(true);

        const res = await API.get(`/auth/check-username/${form.username}`);

        setUsernameStatus(res.data.available ? "available" : "taken");

      } catch (err) {
        console.error("Username check error:", err);
      } finally {
        setCheckingUsername(false);
      }

    }, 600);

    return () => clearTimeout(timer);

  }, [form.username]);

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!accepted) return;

    try {

      setLoading(true);
      setEmailError(null);

      const res = await API.post("/auth/register", form);

      if (res.data.success) {

        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 3500);

      }

    } catch (err) {

      console.error("Register error:", err);

      if (err.response?.status === 409) {
        setEmailError("Email already registered");
      } else {
        alert("Registration failed. Try again.");
      }

    } finally {
      setLoading(false);
    }

  };

  return (
    <>

      {success && <SuccessOverlay />}

      <div className="
        bg-white text-black
        rounded-2xl p-8
        shadow-[0_0_35px_rgba(0,255,255,0.35)]
        w-full max-w-md mx-auto
      ">

        <h2 className="text-xl font-bold text-cyan-600 mb-1">
          Create your account
        </h2>

        <p className="text-gray-500 text-sm mb-4">
          Secure your digital identity with Cybergram
        </p>

        {/* IMPORTANT: disable browser autofill */}
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="space-y-4"
        >

          {/* Hidden dummy fields (Chrome autofill killer trick) */}
          <input type="text" name="fakeuser" autoComplete="username" hidden />
          <input type="password" name="fakepass" autoComplete="current-password" hidden />

          {/* FULL NAME */}
          <input
            required
            autoComplete="off"
            placeholder="Full Name"
            className="input-light"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* USERNAME */}
          <div>

            <input
              required
              autoComplete="off"
              inputMode="text"
              placeholder="Username"
              className="input-light"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />

            {checkingUsername && (
              <p className="text-xs text-gray-400 mt-1">
                Checking availability...
              </p>
            )}

            {usernameError && (
              <p className="text-xs text-red-600 mt-1">
                {usernameError}
              </p>
            )}

            {usernameStatus === "available" && (
              <p className="text-xs text-green-600 mt-1">
                ✔ Username is available
              </p>
            )}

            {usernameStatus === "taken" && (
              <p className="text-xs text-red-600 mt-1">
                ✖ Username is already taken
              </p>
            )}

          </div>

          {/* EMAIL */}
          <div>

            <input
              required
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              className="input-light"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {emailError && (
              <p className="text-xs text-red-600 mt-1">
                {emailError}
              </p>
            )}

          </div>

          {/* PASSWORD */}
          <div className="relative">

            <input
              required
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-light pr-12"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-cyan-500"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>

          </div>

          {/* PASSWORD STRENGTH */}
          {form.password.length > 0 && (
            <PasswordStrength password={form.password} />
          )}

          {/* TERMS */}
          <label className="flex items-center gap-2 text-xs text-gray-600">

            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />

            I agree to Cybergram’s

            <Link to="/terms" className="text-cyan-500 underline ml-1">
              Terms
            </Link>

            &

            <Link to="/privacy-policy" className="text-cyan-500 underline ml-1">
              Privacy Policy
            </Link>

          </label>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={
              !accepted ||
              usernameStatus === "taken" ||
              loading
            }
            className={`
              w-full py-2.5 rounded-lg font-semibold transition
              ${
                accepted &&
                usernameStatus !== "taken" &&
                !loading
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-cyan-500 cursor-pointer ml-1"
            >
              Login
            </span>
          </p>

        </form>

      </div>

    </>
  );
}
