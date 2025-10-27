import React from 'react'
import Button from './Button'

const header = () => {
  return (
       <>
        <nav className='navbar container mt-3'>
            <a className='navbar-brand text-light' href="">FullStack JWT Auth System</a>

        <div>
            <Button text='Login' class='btn-danger' />
            &nbsp; &nbsp;
            <Button text='Register' class='btn-outline-danger' />
        </div>
        </nav>
    </>
  )
}

export default header