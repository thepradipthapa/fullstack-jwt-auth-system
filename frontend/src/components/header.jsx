import React from 'react'
import Button from './Button'
import { Link } from 'react-router'

const header = () => {
  return (
       <>
        <nav className='navbar container pt-4 align-items-start'>
            <Link className='navbar-brand text-light' to="/">FullStack JWT Auth System</Link>

        <div>
            <Button text='Login' class='btn-danger' url='/login'/>
            &nbsp; &nbsp;
            <Button text='Register' class='btn-outline-danger' url='/register'/>
        </div>
        </nav>
    </>
  )
}

export default header