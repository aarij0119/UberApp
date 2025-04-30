import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react'
import { FaChevronUp } from "react-icons/fa";
import FinishRidePanel from '../Components/FinishRidePanel';
import { useLocation } from 'react-router-dom';

const CaptainRiding = () => {
  const location = useLocation();
  const rideData = location.state?.Ride
  const[FinishRidePopUp,setFinishRidePopUp] = useState(false);
  const FinishRidePoppanelRef = useRef(null);
  useGSAP(function(){
    if(FinishRidePopUp){
      gsap.to(FinishRidePoppanelRef.current,{
        y:0
      })
    }else{
      gsap.to(FinishRidePoppanelRef.current,{
        y:'100%'
      })
    }
  },[FinishRidePopUp])
  
  return (
    <div className='h-screen'>
      <div className='w-full h-[80%] bg-red-400'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='w-full h-[20%] bg-yellow-400' onClick={()=>setFinishRidePopUp(true)}>
        <h3 className='w-full p-2'><FaChevronUp size={24} className='mx-auto' /> </h3>
        <div className='flex justify-between items-center p-3'>
          <h1 className='text-2xl font-bold'>4 KM away</h1>
          <button className='text-xl font-bold bg-green-600 text-white p-3 px-6 rounded-xl'>Complete Ride</button>
        </div>
      </div>
      <div ref={FinishRidePoppanelRef}  className='fixed bottom-0 bg-white w-full p-4 transform translate-y-full'>
        <FinishRidePanel rideData={rideData} setFinishRidePopUp={setFinishRidePopUp}/>
      </div>
    </div>
  )
}

export default CaptainRiding