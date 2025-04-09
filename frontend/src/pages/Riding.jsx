import React from 'react'
import { RiHome2Line } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to={'/home'} className='font-bold w-10 h-10 fixed  right-2 top-2 rounded-full bg-white flex items-center justify-center'>
            <RiHome2Line size={24} />
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="https://cdn.dribbble.com/userupload/22910073/file/original-f308c35778d329518ef2b88f866111ec.gif" alt="" />
            </div>
            <div className='h-1/2 p-2'>
                <div className='mb-2 flex justify-between'>
                    <img className='w-28' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_254,w_450/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                    <div className='text-right'>
                        <h1 className='text-xl font-bold -mb-1'>Muhammad</h1>
                        <h2 className='text-xl font-bold -mb-1 -mt-1'>CH 0 1 BL 2213</h2>
                        <h3 className='text-base'>Maruti Suzuki, Alto</h3>
                    </div>
                </div>
                <div className='flex flex-col gap-1 mb-2 mt-4'>
                    <div className='flex items-center gap-5 p-3 border-b-[0.1px]'>
                        <div>
                            <FaLocationDot size={22} />
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>562/11-A</h2>
                            <h4 className='text-gray-700 font-semibold'>Sector 13 Manimajra, Chandigarh</h4>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <div>
                            <BsCashCoin size={22} />
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold flex items-center'><FaIndianRupeeSign size={20} />193.86</h2>
                            <h4 className='text-gray-700 font-semibold'>Cash Cash</h4>
                        </div>
                    </div>
                </div>
                <button className='bg-green-700 w-full p-2 text-xl font-semibold text-white rounded-xl'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding