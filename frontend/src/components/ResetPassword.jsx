import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-dark p-4 rounded-2">
          <h3 className="text-light text-center mb-4">Reset Password</h3>
          <form>
            {/* New Password */}
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter New Password"
              required
            />

            {/* Confirm New Password */}
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirm New Password"
              required
            />

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
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
