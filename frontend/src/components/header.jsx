import React from 'react'

const header = () => {
  return (
       <>
        <nav className='navbar container mt-3'>
            <a className='navbar-brand text-light' href="">FullStack JWT Auth System</a>

        <div>
            <a className='btn btn-outline-danger' href="">Login</a>
            &nbsp; &nbsp;
            <a className='btn btn-danger' href="">Register</a>
        </div>
        </nav>
    </>
  )
}

export default header