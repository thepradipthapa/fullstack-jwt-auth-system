import React from 'react'
import {Link} from 'react-router'

const Register = () => {
  return (
    <>
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-dark p-4 rounded-2">
          <h3 className="text-light text-center mb-4">Create an Account</h3>
          <form>
            {/* Name */}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter Your Name"
              required
            />

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

            {/* Confirm Password */}
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirm Your Password"
              required
            />

            {/* Terms and Conditions */}
            <div className="form-check my-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
                required
              />
              <label className="form-check-label text-light" htmlFor="terms">
                Yes, I accept the terms and conditions
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-danger w-100">
              Register
            </button>

            {/* Already have an account */}
            <p className="text-center text-light mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-info">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register