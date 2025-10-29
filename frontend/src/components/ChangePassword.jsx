import { useState } from "react";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    // TODO: Send new password to backend API
    console.log("Password updated:", password);
  };

  return (
    <div className="card bg-dark text-light p-3">
      <h5 className="mb-3">Change Password</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-danger w-100">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
