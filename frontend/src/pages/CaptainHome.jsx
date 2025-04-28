import React, { useContext, useEffect, useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Captaindetails from "../Components/Captaindetails";
import LiveTracking from "../Components/LiveTracking";

import {CaptainDataContext} from '../Context/CaptainContext'
import {SocketContext} from '../Context/SocketContext'

const CaptainHome = () => {
const {captainId} = useContext(CaptainDataContext);
const {socket} = useContext(SocketContext);
useEffect(() => {
  if(captainId){
    // console.log(captainId)
    socket.emit('join',{userType:'captain',userId:captainId})
  }
}, [captainId])

  return (
    <div className="h-screen flex flex-col relative">
      {/* Header (Fixed at Top) */}
      <div className="fixed top-0 w-full h-10 px-3 flex items-center justify-between z-[50] bg-white">
        <img
          className="w-14 object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to={"/captain-home"}
          className="w-12 h-12 font-extrabold rounded-full bg-white flex items-center justify-center"
        >
          <IoExitOutline size={24} />
        </Link>
      </div>

      <div className="h-[65%] relative z-[10]">
        <LiveTracking className='w-full h-full bg-cover' />
      </div>

      <div className="h-[35%] bg-white z-[20]">
        <Captaindetails />
      </div>
    </div>
  );
};

export default CaptainHome;
