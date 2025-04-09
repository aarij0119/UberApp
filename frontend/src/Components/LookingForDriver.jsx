import React from 'react'
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";
const LookingForDriver = () => {
    return (
        <div>
            <div className='flex flex-col gap-3 mb-4'>
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
        </div>
    )
}

export default LookingForDriver