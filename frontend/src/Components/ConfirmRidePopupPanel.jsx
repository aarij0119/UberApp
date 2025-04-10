import React from 'react'
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const ConfirmRidePopupPanel = ({setConfirmPanel}) => {
    return (
        <div>
            <div className='flex flex-col gap-2 mb-3'>
                <h1 className='text-2xl font-bold mb-2 pt-2'>Confirm this ride to start</h1>
                <div className='flex justify-between p-2 bg-yellow-400 rounded-xl px-4'>
                    <div className='flex items-center gap-3'>
                        <img className='w-16 rounded-full' src="https://unavatar.io/github/1stevengrant" alt="" />
                        <h2 className='text-2xl font-bold'>Aarij</h2>
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
                        <h4 className='text-gray-700 font-semibold'>Sector 13 Manimajra, Chandigarh</h4>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-4 border-b-[0.1px]'>
                    <div>
                        <FaLocationDot size={22} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold'>562/11-A</h2>
                        <h4 className='text-gray-700 font-semibold'>Sector 13 Manimajra, Chandigarh</h4>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-4'>
                    <div>
                        <BsCashCoin size={22} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold flex items-center'><FaIndianRupeeSign size={20} />193.86</h2>
                        <h4 className='text-gray-700 font-semibold'>Cash Cash</h4>
                    </div>
                </div>
            </div>
            <Link to={'/captain-riding'} className='bg-green-700 w-full inline-block mb-4 p-2 text-xl text-center rounded-xl font-semibold text-white'>Confirm</Link>
            <button onClick={()=>{setConfirmPanel(false)}} className='bg-red-500 text-white w-full p-2 text-xl font-semibold  rounded-xl mb-3'>Cancel</button>
        </div>
    )
}

export default ConfirmRidePopupPanel