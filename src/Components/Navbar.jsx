import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className='w-full flex justify-between items-center bg-[#181111] text-white py-5 px-10'>
        <Link to="/">
        <h1 className='capitalize text-white text-2xl'>
            <span className='text-green-500 font-semibold text-3xl'>Think</span>
            -Board
        </h1>
        </Link>
        <Link to="/addnote" className='capitalize bg-green-500 px-5 py-2 rounded-lg cursor-pointer flex items-center gap-2'>
            <i className="fa-solid fa-plus"></i>
            new Note
        </Link>
    </div>
    </>
  )
}

export default Navbar