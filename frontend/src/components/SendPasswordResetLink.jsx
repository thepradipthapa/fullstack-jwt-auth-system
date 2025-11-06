import { Link } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../axiosInstance";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { email };

    try {
      const response = await axiosInstance.post("/send-password-reset-email/", payload);
      setErrors({});
      setMessage(response.data);
      console.log(response.data);
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
       setErrors(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-dark p-4 rounded-2">
          <h3 className="text-light text-center mb-4">Forgot Password</h3>
          <p className="text-light text-center">
            Enter your email address and we’ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Submit */}
            <button type="submit" className="btn btn-danger w-100">
              Send Reset Link
            </button>

            {/* Back to login */}
            <p className="text-center text-light mt-3">
              Remembered your password?{" "}
              <Link to="/login" className="text-info">
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
