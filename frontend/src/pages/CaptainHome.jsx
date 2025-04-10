import React from 'react'
import { IoExitOutline } from "react-icons/io5";

import { Link } from 'react-router-dom';
import Captaindetails from '../Components/Captaindetails';
const CaptainHome = () => {
  return (
    <div className='h-screen'>
      {/* Uber Logo */}
      <div className='flex items-center justify-between fixed top-0 w-full h-16 px-3'>
        <img className='w-20 object-cover' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
        <Link to={'/captain-home'} className='w-12 h-12 font-extrabold  rounded-full bg-white flex items-center justify-center'>
          <IoExitOutline size={28} />
        </Link>
      </div>

      <div className='h-[60%]'>
        <img className='h-full w-full object-cover' src="https://cdn.dribbble.com/userupload/22910073/file/original-f308c35778d329518ef2b88f866111ec.gif" alt="" />
      </div>
      <div className='h-[40%] bg-white'>
        <Captaindetails />
      </div>
    </div>
  )
}

export default CaptainHome