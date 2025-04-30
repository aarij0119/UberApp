import React from 'react'
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FinishRidePanel = ({ setFinishRidePopUp, rideData }) => {
 const navigate = useNavigate();
  const endRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      rideId: rideData.populatedRide._id
    }, {
      headers: {
        Authorization: `${localStorage.getItem('captaintoken')}`
      }
    });
    
    if (response.status === 200) {
      setFinishRidePopUp(false);
      navigate('/captain-home');
      localStorage.removeItem('ride-dets')
    }
};

  return (
    <div>
      <div className='flex flex-col gap-2 mb-3'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold mb-2'>Finish this Ride</h1>
          <h2 onClick={() => { setFinishRidePopUp(false) }}><IoIosArrowDown size={29} /></h2>
        </div>
        <div className='flex justify-between p-2 bg-yellow-400 rounded-xl px-4'>
          <div className='flex items-center gap-3'>
            <img className='w-16 rounded-full' src="https://unavatar.io/github/1stevengrant" alt="" />
            <h2 className='text-2xl font-bold'>{rideData?.populatedRide
              .user?.fullname?.firstname}</h2>
          </div>
          <div className='flex justify-center items-center flex-col'>
            <h1 className='flex items-center text-2xl font-bold'>2.2 KM</h1>
          </div>
        </div>
        <div className='flex items-center gap-5 p-4 border-b-[0.1px]'>
          <div>
            <FaHouseChimneyUser size={22} />
          </div>
          <div>
            <h2 className='text-2xl font-bold'>{rideData?.populatedRide.origin}</h2>
          </div>
        </div>
        <div className='flex items-center gap-5 p-4 border-b-[0.1px]'>
          <div>
            <FaLocationDot size={22} />
          </div>
          <div>
            <h2 className='text-2xl font-bold'>{<h2 className='text-2xl font-bold'>{rideData?.populatedRide.destination}</h2>}</h2>
          </div>
        </div>
        <div className='flex items-center gap-5 p-4'>
          <div>
            <BsCashCoin size={22} />
          </div>
          <div>
            <h2 className='text-2xl font-bold flex items-center'><FaIndianRupeeSign size={20} />{rideData?.populatedRide.fare}</h2>
            <h4 className='text-gray-700 font-semibold'>Cash Cash</h4>
          </div>
        </div>
      </div>
      <button onClick={endRide} className='bg-green-700 w-full inline-block mb-2 p-3 text-xl text-center rounded-xl font-semibold text-white'>Finish Ride</button>
    </div>
  )
}

export default FinishRidePanel