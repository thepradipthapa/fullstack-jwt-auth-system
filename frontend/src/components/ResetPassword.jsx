import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { Link, useParams} from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const { uid, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      password,
      password2
    }

    try {
      const response = await axiosInstance.post(`/reset-password/${uid}/${token}/`, payload);
      setSuccess(true)
      setMessage(response.data.message);
      console.log("response:", response.data);
      console.log("success")
      // Clear the form fields

    } catch (error) {
      console.log("error response:", error.response.data.error);
      setErrors(error.response.data.error);
    }
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-dark p-4 rounded-2">
          <h3 className="text-light text-center mb-4">Reset Password</h3>
          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirm New Password */}
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirm New Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />

            {errors.non_field_errors && <p className="text-danger">{errors.non_field_errors}</p>}
            {/* Submit */}
            <button type="submit" className="btn btn-danger w-100">
              Reset Password
            </button>

            {/* Back to login */}
            <p className="text-center text-light mt-3">
              <Link to="/login" className="text-info">
                Back to Login
              </Link>
            </p>
          </form>
          {/* Success message */}
          {success && <div className="alert alert-success mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
