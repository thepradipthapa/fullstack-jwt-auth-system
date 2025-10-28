import Button from './Button'

const home = () => {
  return (
    <>
    <div className='container align-items-center'>
        <div className='text-center bg-light-dark p-5 mt-5 rounded'>
            <h1 className='text-light'>Welcome to FullStack JWT Auth System</h1>
            <p className='text-light lead'>This is a full-stack authentication system using JSON Web Tokens (JWT) for secure user authentication and authorization. It includes a React frontend and a Django and DRF backend.</p>
            <Button text='Login' class='btn-danger' />
        </div>
    </div>

    </>
  )
}

export default home