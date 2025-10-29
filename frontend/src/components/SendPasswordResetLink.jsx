import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-dark p-4 rounded-2">
          <h3 className="text-light text-center mb-4">Forgot Password</h3>
          <p className="text-light text-center">
            Enter your email address and we’ll send you a link to reset your password.
          </p>

          <form>
            {/* Email */}
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter Your Email"
              required
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
