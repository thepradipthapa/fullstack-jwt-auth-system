import { useState, useContext} from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { AuthContext } from '../AuthProvider.jsx'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/login/', payload);
      setErrors({});
      localStorage.setItem('accessToken', response.data.tokens.access)
      localStorage.setItem('refreshToken', response.data.tokens.refresh)
      setIsLoggedIn(true)
      navigate('/dashboard')
    } catch (error) {
      setErrors(error.response.data.error);
    }
  };

  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-4 rounded-2">
          <h3 className="text-light text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
            {/* Email */}
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
            {/* Password */}
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
            {errors.non_field_errors && <p className="text-danger">{errors.non_field_errors}</p>}

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
              <Link to="/register" className="text-info">
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