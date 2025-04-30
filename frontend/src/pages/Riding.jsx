import React, { useContext } from 'react'
import { RiHome2Line } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SocketContext } from '../Context/SocketContext';
const Riding = () => {
   const navigate = useNavigate()
    const location = useLocation();
    const rideData = location.state?.ride;
    const {socket} = useContext(SocketContext)
    socket.on('ride-ended',()=>{
        navigate('/home')
    })
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
                        <h1 className='text-xl font-bold -mb-1'>{rideData.captain?.fullname.firstname}</h1>
                        <h2 className='text-xl font-bold -mb-1 -mt-1 uppercase'>{rideData.captain?.platenumber}</h2>
                        <h3 className='text-base uppercase'>{rideData.captain?.vehicleType}</h3>
                    </div>
                </div>
                <div className='flex flex-col gap-1 mb-2 mt-4'>
                    <div className='flex items-center gap-5 p-3 border-b-[0.1px]'>
                        <div>
                            <FaLocationDot size={22} />
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>{rideData?.origin}</h2>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <div>
                            <BsCashCoin size={22} />
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold flex items-center'><FaIndianRupeeSign size={20} />{rideData?.fare}</h2>
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