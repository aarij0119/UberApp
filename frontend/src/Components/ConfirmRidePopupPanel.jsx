import React, { useState } from 'react'
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ConfirmRidePopupPanel = ({ setConfirmPanel, Ride }) => {
    const navigate = useNavigate();
    const [otp, setotp] = useState();
    const Submithandler = async (e) => {
        e.preventDefault();
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: Ride.populatedRide._id,
                otp: otp
            },
            headers: {
                Authorization: localStorage.getItem('captaintoken')
            }
        })
        if(response.status === 200){
            setConfirmPanel(false);
            navigate('/captain-riding',{state:{Ride}})
        }
    }
    return (
        <div>
            <div className='flex flex-col gap-2 mb-3'>
                <h1 className='text-2xl font-bold mb-2'>Confirm this ride to start</h1>
                <div className='flex justify-between p-2 bg-yellow-400 rounded-xl px-4'>
                    <div className='flex items-center gap-3'>
                        <img className='w-16 rounded-full' src="https://unavatar.io/github/1stevengrant" alt="" />
                        <h2 className='text-2xl font-bold'>{Ride?.populatedRide?.user?.fullname?.firstname}</h2>
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
                        <h2 className='text-2xl font-bold'>{Ride?.populatedRide?.origin}</h2>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-4 border-b-[0.1px]'>
                    <div>
                        <FaLocationDot size={22} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold'>{Ride?.populatedRide?.destination}</h2>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-4'>
                    <div>
                        <BsCashCoin size={22} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold flex items-center'><FaIndianRupeeSign size={20} />{Ride?.populatedRide?.fare}</h2>
                        <h4 className='text-gray-700 font-semibold'>Cash Cash</h4>
                    </div>
                </div>
            </div>
            <form>
                <input
                    type='text'
                    required
                    className='w-full p-3 mb-3 text-lg font-bold bg-gray-300 rounded-md placeholder:text-xl focus:outline-yellow-500'
                    placeholder='Enter OTP'
                    onChange={(e) => {
                        setotp(e.target.value)
                    }}
                />
                <button onClick={Submithandler} className='bg-green-700 w-full inline-block mb-2 p-3 text-xl text-center rounded-xl font-semibold text-white'>Confirm</button>
                <button onClick={() => { setConfirmPanel(false) }} className='bg-red-500 text-white w-full p-3 text-xl font-semibold  rounded-xl mb-3'>Cancel</button>
            </form>
        </div>
    )
}

export default ConfirmRidePopupPanel