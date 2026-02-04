import { useState } from "react";
import LoginForm from "./LoginForm";

export default function LoginCard({ onSuccess }) {

  const [success, setSuccess] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const triggerError = (msg) => {
    setErrorMsg(msg);
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 500);
  };

  const handleSuccess = () => {

    setSuccess(true);

    setTimeout(() => {
      onSuccess();
    }, 3000);
  };

  return (
    <div className={`relative ${errorShake ? "shake" : ""}`}>

      {/* SUCCESS OVERLAY */}

      {success && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50 rounded-xl">

          <div className="text-center animate-pulse">

            <p className="text-green-400 text-2xl font-bold tracking-wider">
              ACCESS GRANTED ✔
            </p>

            <p className="text-gray-400 mt-2 text-sm">
              Redirecting to secure dashboard...
            </p>

          </div>

        </div>
      )}

      {/* LOGIN FORM */}

      <LoginForm
        onLoginSuccess={handleSuccess}
        onLoginError={triggerError}
      />

      {/* ERROR MESSAGE */}

      {errorMsg && (
        <p className="text-red-400 text-sm text-center mt-3">
          {errorMsg}
        </p>
      )}

    </div>
  );
}
