import React from 'react'
import {Link} from 'react-router'

const Login = () => {
  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-dark p-4 rounded-2">
          <h3 className="text-light text-center mb-4">Login</h3>
          <form>
            {/* Email */}
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter Your Email"
              required
            />

            {/* Password */}
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter Your Password"
              required
            />

            {/* Remember me + Forgot password */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label text-light" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              {/* ✅ Use Link instead of <a> */}
              <Link to="/forgot-password" className="text-info small">
                Forgot Password?
              </Link>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-danger w-100">
              Login
            </button>

            {/* Signup link */}
            <p className="text-center text-light mt-3">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-info">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>

    </>
  )
}

export default Login