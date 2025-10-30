import { useState} from 'react'
import {Link} from 'react-router'
import axios from 'axios'


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [tc, setTc] = useState(false);
  const [success, setSuccess] = useState(false)

  const [errors, setErrors] = useState({})

  const handleRegistration = async (e) => {
    e.preventDefault();
    
    const payload = {
      name,
      email,
      password,
      password2,
      tc
    };

    try{
      const response = await axios.post('http://127.0.0.1:8000/api/user/register/', payload)
      setErrors({})
      setSuccess(true)
    }catch(error){
      setErrors(error.response.data.error)
      console.log(error.response.data.error)

    }
   
  }

  return (
    <>
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6  p-4 rounded-2 bg-light-dark">
          <h3 className="text-light text-center mb-4">Create an Account</h3>

          {/* Success message */}
          {success && <div className="alert alert-success">Account created successfully! You can now log in.</div>}

          <form onSubmit={handleRegistration}>
            {/* Name */}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
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
            {/* Confirm Password */}
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirm Your Password"
              value={password2}
              onChange={(e)=>setPassword2(e.target.value)}
            />
            {errors.password2 && <p className="text-danger">{errors.password2}</p>}
            {/* Terms and Conditions */}
            <div className="form-check my-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
                checked={tc}
                onChange={(e) => setTc(e.target.checked)}
              />
              {errors.tc && <p className="text-danger">{errors.tc}</p>}
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