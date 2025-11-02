import { useState } from "react";
import axiosInstance from "../axiosInstance";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      password,
      password2
    }

    try {
      const response = await axiosInstance.post('/changepassword/', payload);
      setSuccess(true)
      
      // Clear the form fields
      setPassword("");
      setPassword2("");

    } catch (error) {
      setErrors(error.response.data.error);
    }
  }

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
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        {errors && <p className="text-danger">{errors}</p>}
        {errors.non_field_errors && <p className="text-danger">{errors.non_field_errors}</p>}
        <button type="submit" className="btn btn-danger w-100">
          Update Password
        </button>
      </form>
      {/* Success message */}
          {success && <div className="alert alert-success mt-3">Your password has been changed successfully.</div>}
    </div>
  );
}

export default ChangePassword;
