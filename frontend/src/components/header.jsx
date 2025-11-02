import {useContext} from 'react'
import Button from './Button'
import { Link , useNavigate} from 'react-router'
import {AuthContext} from '../AuthProvider.jsx'


const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    navigate('/login')
  }
  return (
       <>
        <nav className='navbar container pt-4 align-items-start'>
            <Link className='navbar-brand text-light' to="/">FullStack JWT Auth System</Link>

        <div>
          {isLoggedIn ? (
            <>
              <Button text='Dashboard' class='btn-danger' url='/dashboard'/>
              &nbsp; &nbsp;
              <button onClick={handleLogout} className='btn btn-outline-danger'>Logout</button>
            </>
          ) : (
            <>
            <Button text='Login' class='btn-danger' url='/login'/>
            &nbsp; &nbsp;
            <Button text='Register' class='btn-outline-danger' url='/register'/>
            </>
          )}
            
        </div>
        </nav>
    </>
  )
}

export default Header