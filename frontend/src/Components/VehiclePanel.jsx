import React from 'react'
import { FaRupeeSign } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
const VehiclePanel = ({ setVehicleRidePanel,setVehiclepanel,fare }) => {
    return (
        <div>
            {/* Car  */}
            <div onClick={()=> {setVehicleRidePanel(true),setVehiclepanel(false)}} className="bg-gray-200 p-2 rounded-lg border-1 border-black overflow-hidden flex items-center gap-1.5 mb-3">
                <div className='flex items-center justify-center'>
                    <img className='w-16 h-16 bg-cover' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_254,w_450/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                </div>
                <div>
                    <h2 className='flex gap-1 text-2xl font-bold items-center '>UberGo <FaUser />4</h2>
                    <h3 className='text-base font-semibold'>2 mins away</h3>
                    <h4 className='text-sm'>Affordable, compact rides</h4>
                </div>
                <div>
                    <h1 className='text-xl font-bold flex items-center'><FaRupeeSign />{fare?.car}</h1>
                </div>
            </div>

            {/* Bike */}
            <div onClick={()=> {setVehicleRidePanel(true),setVehiclepanel(false)}} className="bg-gray-200 p-2 rounded-lg border-1 border-black overflow-hidden flex items-center gap-1.5 mb-3">
                <div className='flex items-center justify-center'>
                    <img className='w-16 h-16 bg-cover' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_1152/v1649230978/assets/a2/553a18-2f77-4722-a4ba-f736f4cb405e/original/Uber_Moto_Orange_558x372_pixels_Desktop.png" alt="Bike" />
                </div>
                <div>
                    <h2 className='flex gap-1 text-2xl font-bold items-center '>Moto <FaUser />1</h2>
                    <h3 className='text-base font-semibold'>3 mins away</h3>
                    <h4 className='text-sm'>Affordable, Motorcycle rides</h4>
                </div>
                <div>
                    <h1 className='text-xl font-bold flex items-center'><FaRupeeSign />{fare?.bike}</h1>
                </div>
            </div>

            {/* Auto */}
            <div onClick={()=> {setVehicleRidePanel(true),setVehiclepanel(false)}} className="bg-gray-200 p-2 rounded-lg border-1 border-black overflow-hidden flex items-center gap-1.5">
                <div className='flex items-center justify-center'>
                    <img className='w-16 h-16 bg-cover' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="Bike" />
                </div>
                <div>
                    <h2 className='flex gap-1 text-2xl font-bold items-center '>UberAuto <FaUser />3</h2>
                    <h3 className='text-base font-semibold'>3 mins away</h3>
                    <h4 className='text-sm'>Affordable, Auto rides</h4>
                </div>
                <div>
                    <h1 className='text-xl font-bold flex items-center'><FaRupeeSign />{fare?.auto}</h1>
                </div>
            </div>
        </div>
    )
}

export default VehiclePanel