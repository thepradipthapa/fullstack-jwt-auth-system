import React from 'react'

const footer = () => {
  return (
    <>
    <footer className=" text-light py-3 border-top">
    <div className=" text-center">
        <p className="mb-0">
        &copy; {new Date().getFullYear()} — Built with ❤️ by <strong>Pradip Thapa</strong>
        </p>
    </div>
    </footer>

    </>
  )
}

export default footer