import React from 'react'
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";

const RidingPopUp = ({ Ride, setRidePopUpPanel, setConfirmPanel,confirmRide }) => {
    function clearRidingdata() {
        localStorage.removeItem('ride-dets')
    }
    return (
        <div>
            <div className='flex flex-col gap-2 mb-3'>
                <h1 className='text-2xl font-bold mb-2 pt-2'>New Ride available !</h1>
                <div className='flex justify-between p-2 bg-yellow-400 rounded-xl px-4'>
                    <div className='flex items-center gap-3'>
                        <img className='w-16 rounded-full' src="https://unavatar.io/github/1stevengrant" alt="" />
                        <h2 className='text-2xl font-bold'>{Ride?.populatedRide?.user.fullname.firstname}</h2>
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
                        <h2 className='text-2xl font-bold'>562/11-A</h2>
                        <h4 className='text-gray-700 font-semibold'>{Ride?.populatedRide?.origin}</h4>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-4 border-b-[0.1px]'>
                    <div>
                        <FaLocationDot size={22} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold'>562/11-A</h2>
                        <h4 className='text-gray-700 font-semibold'>{Ride?.populatedRide?.destination}</h4>
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
            <div className='w-full flex items-center justify-between mb-3'>
                <button onClick={() => { setRidePopUpPanel(false), clearRidingdata() }} className='bg-gray-300 p-2 px-13 text-xl font-semibold  rounded-xl '>Ignore</button>
                <button onClick={() => { setRidePopUpPanel(false), setConfirmPanel(true),confirmRide() }} className='bg-green-700  p-2  px-13 text-xl font-semibold text-white rounded-xl'>Accept</button>

            </div>
        </div>
    )
}

export default RidingPopUp