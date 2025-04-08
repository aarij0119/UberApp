import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import { IoIosArrowDown } from "react-icons/io";
import gsap from "gsap";
import { FaRupeeSign } from "react-icons/fa";

//Icons
import LocationSearchPanel from '../Components/LocationSearchPanel';
import { FaUser } from "react-icons/fa";
const Home = () => {
  const [picklocation, setpiclocation] = useState('');
  const [destination, setdestination] = useState('');
  const [ispanelopen, setpanleopen] = useState(false);
  const [vehiclepanel, setVehiclepanel] = useState(false);
  const panelref = useRef(null);
  const panelclose = useRef(null);

  const choosevehiclepanel = useRef(null);
  const arrowref = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(function () {
    if (ispanelopen) {
      gsap.to(panelref.current, {
        height: '70%',
        padding: '1rem'
      });
      gsap.to(panelclose.current, {
        opacity: "1"
      })
    } else {
      gsap.to(panelref.current, {
        height: '0',
        padding: '0'
      });
      gsap.to(panelclose.current, {
        opacity: "0"
      })
    }
  }, [ispanelopen]);

  useGSAP(function () {
    if (vehiclepanel) {
      gsap.to(choosevehiclepanel.current, {
        y: 0
      })
      gsap.to(arrowref.current,{
        opacity:1
      })
    } else {
      gsap.to(choosevehiclepanel.current, {
        y: 670
      })
      gsap.to(arrowref.current,{
        opacity:0
      })
    }
  },[vehiclepanel])

  return (
    <div className='w-full h-screen'>
      <div className='absolute p-3 text-3xl font-bold'>Uber</div>
      <div className='w-full h-full'>
        <img className='h-full w-full object-cover' src="https://cdn.dribbble.com/userupload/22910073/file/original-f308c35778d329518ef2b88f866111ec.gif" alt="" />
      </div>
      <div className='flex flex-col justify-end absolute bottom-0 w-full h-full'>
        <div className='w-full h-[30%] bg-white px-3 '>
          <div className='mb-4 flex items-center justify-between'>
            <h4 className='text-2xl font-bold mt-3'>Find a trip</h4>
            <IoIosArrowDown onClick={() => {
              setpanleopen(false)
            }} ref={panelclose} className='opacity-0 mt-3' size={22} />
          </div>
          <form onSubmit={submitHandler}>
            <input
              className='w-full outline-[#000] p-3 rounded-lg text-lg font-semibold bg-[#eee] mb-5'
              placeholder='Add a pick up location'
              value={picklocation}
              onChange={(e) => {
                setpiclocation(e.target.value)
              }}
              onClick={() => {
                setpanleopen(true)
              }}
              type="text"
              name="pickup"
              required
              id="" />
            <input
              className='w-full outline-[#000] p-3 rounded-lg text-lg font-semibold bg-[#eee]'
              placeholder='Enter your destination'
              value={destination}
              onChange={(e) => {
                setdestination(e.target.value)
              }}
              onClick={() => {
                setpanleopen(true)
              }}
              type="text"
              name="destination"
              required
              id="" />
          </form>
        </div>
        <div ref={panelref} className='w-full bg-white px-3 overflow-y-auto'>
          <LocationSearchPanel setpanleopen={setpanleopen} setVehiclepanel={setVehiclepanel} />
        </div>
        {/* Choose Vehicle Type vehiclePane;*/}
        <div ref={choosevehiclepanel} className='fixed bottom-0 w-full bg-white p-4 '>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-2xl font-bold'>Choose a vehicle Type</h2>
            <IoIosArrowDown className='opacity-0' onClick={()=>{setVehiclepanel(false)}} ref={arrowref} size={22} />
          </div>
          {/* Car  */}
          <div className="bg-gray-200 p-2 rounded-lg border-1 border-black overflow-hidden flex items-center gap-1.5 mb-3">

            <div className='flex items-center justify-center'>
              <img className='w-[100px] h-[100px] bg-cover' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_254,w_450/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
            </div>

            <div>
              <h2 className='flex gap-1 text-2xl font-bold items-center '>UberGo <FaUser />4</h2>
              <h3 className='text-base font-semibold'>2 mins away</h3>
              <h4 className='text-sm'>Affordable, compact rides</h4>
            </div>

            <div>
              <h1 className='text-xl font-bold flex items-center pr-2'><FaRupeeSign />193.22</h1>
            </div>
          </div>

          {/* Bike */}
          <div className="bg-gray-200 p-2 rounded-lg border-1 border-black overflow-hidden flex items-center gap-1.5 mb-3">

            <div className='flex items-center justify-center'>
              <img className='w-[100px] h-[100px] bg-cover' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_1152/v1649230978/assets/a2/553a18-2f77-4722-a4ba-f736f4cb405e/original/Uber_Moto_Orange_558x372_pixels_Desktop.png" alt="Bike" />
            </div>

            <div>
              <h2 className='flex gap-1 text-2xl font-bold items-center '>Moto <FaUser />1</h2>
              <h3 className='text-base font-semibold'>3 mins away</h3>
              <h4 className='text-sm'>Affordable, Motorcycle rides</h4>
            </div>

            <div>
              <h1 className='text-xl font-bold flex items-center pr-2'><FaRupeeSign />65</h1>
            </div>
          </div>

          {/* Auto */}
          <div className="bg-gray-200 p-2 rounded-lg border-1 border-black overflow-hidden flex items-center gap-1.5">

            <div className='flex items-center justify-center'>
              <img className='w-[120px] h-[100px] bg-cover' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="Bike" />
            </div>

            <div>
              <h2 className='flex gap-1 text-2xl font-bold items-center '>UberAuto <FaUser />3</h2>
              <h3 className='text-base font-semibold'>3 mins away</h3>
              <h4 className='text-sm'>Affordable, Auto rides</h4>
            </div>

            <div>
              <h1 className='text-xl font-bold flex items-center pr-2'><FaRupeeSign />118.98</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home