export default function PasswordStrength({ password }) {

  const getStrength = () => {

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getStrength();

  const labels = ["Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-red-500", "bg-yellow-400", "bg-blue-400", "bg-green-500"];

  return (
    <div className="mt-2">

      <div className="flex gap-1">

        {[0, 1, 2, 3].map(i => (

          <div
            key={i}
            className={`
              h-1 flex-1 rounded
              ${strength > i ? colors[strength - 1] : "bg-gray-700"}
            `}
          />

        ))}

      </div>

      {password && (
        <p className="text-xs mt-1 text-gray-400">
          Strength: {labels[strength - 1] || "Very Weak"}
        </p>
      )}

    </div>
  );
}
