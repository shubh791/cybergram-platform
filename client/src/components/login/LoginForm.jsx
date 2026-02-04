import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import API from "../../api/axios";

export default function LoginForm({ onLoginSuccess, onLoginError }) {

  const [loginInput, setLoginInput] = useState(""); // email OR username
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const submitLogin = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post("/auth/login", {
        login: loginInput,   // IMPORTANT (email OR username)
        password
      });

      // STORAGE BASED ON REMEMBER ME
      const storage = remember ? localStorage : sessionStorage;

      storage.setItem("token", res.data.token);
      storage.setItem("user", JSON.stringify(res.data.user));

      onLoginSuccess();

    } catch (err) {

      onLoginError("Invalid email/username or password");

    } finally {

      setLoading(false);

    }
  };

  return (

    <form
      onSubmit={submitLogin}
      autoComplete="on"
      className="space-y-4"
    >

      {/* EMAIL OR USERNAME */}

      <input
        type="text"
        name="username"
        autoComplete="username"
        placeholder="Email or Username"
        value={loginInput}
        onChange={e => setLoginInput(e.target.value)}
        required
        className="
          w-full px-4 py-3 rounded-md
          bg-black/60 text-white
          border border-cyan-400/25
          outline-none
          placeholder-gray-400
          focus:border-cyan-400
          focus:ring-1 focus:ring-cyan-400/30
          transition
        "
      />

      {/* PASSWORD */}

      <div className="relative">

        <input
          type={showPass ? "text" : "password"}
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="
            w-full px-4 py-3 pr-12 rounded-md
            bg-black/60 text-white
            border border-cyan-400/25
            outline-none
            placeholder-gray-400
            focus:border-cyan-400
            focus:ring-1 focus:ring-cyan-400/30
            transition
          "
        />

        {/* SHOW / HIDE PASSWORD */}

        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPass(!showPass)}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-cyan-400 hover:scale-110 transition
          "
        >
          {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>

      </div>

      {/* REMEMBER ME */}

      <div className="flex items-center gap-2 text-sm text-gray-400">

        <input
          type="checkbox"
          checked={remember}
          onChange={() => setRemember(!remember)}
          className="accent-cyan-400 cursor-pointer"
        />

        <span>Remember this device</span>

      </div>

      {/* REAL SUBMIT (FOR PASSWORD MANAGER) */}
      <button type="submit" hidden />

      {/* LOGIN BUTTON */}

      <button
        disabled={loading}
        className="
          w-full mt-2 py-3 rounded-md
          bg-gradient-to-r from-cyan-400 to-blue-500
          text-black font-semibold
          hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]
          hover:scale-[1.01]
          transition
          disabled:opacity-70
        "
      >
        {loading ? "Verifying..." : "Login"}
      </button>

    </form>

  );
}
