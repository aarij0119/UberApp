import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import { IoIosArrowDown } from "react-icons/io";
import gsap from "gsap";


//Icons
import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import ConfirmRidePanel from '../Components/ConfirmRidePanel';


const Home = () => {
  const [picklocation, setpiclocation] = useState('');
  const [destination, setdestination] = useState('');
  const [ispanelopen, setpanleopen] = useState(false);
  const [vehiclepanel, setVehiclepanel] = useState(false);
  const [VehicleRidePanel, setVehicleRidePanel] = useState(false);
  const panelref = useRef(null);
  const panelclose = useRef(null);
  const RidePanelRef = useRef(null);
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
      gsap.to(arrowref.current, {
        opacity: 1
      })
    } else {
      gsap.to(choosevehiclepanel.current, {
        y: 670
      })
      gsap.to(arrowref.current, {
        opacity: 0
      })
    }
  }, [vehiclepanel])
  useGSAP(function () {
    if (VehicleRidePanel) {
      gsap.to(RidePanelRef.current, {
        y: 0
      })
    } else {
      gsap.to(RidePanelRef.current, {
        y: '100%'
      })
    }
  }, [VehicleRidePanel])

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

        <div ref={panelref} className='w-full h-[70%] bg-white px-3 overflow-y-auto'>
          <LocationSearchPanel setpanleopen={setpanleopen} setVehiclepanel={setVehiclepanel} />
        </div>
        
        {/*vehiclePanel*/}
        <div ref={choosevehiclepanel} className='fixed bottom-0 w-full bg-white p-4 translate-y-full'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-2xl font-bold'>Choose a vehicle Type</h2>
            <IoIosArrowDown className='opacity-0' onClick={() => { setVehiclepanel(false) }} ref={arrowref} size={22} />
          </div>
          <VehiclePanel setVehicleRidePanel={setVehicleRidePanel} setVehiclepanel={setVehiclepanel} />
        </div>

        {/* ConfirmRidePanle */}
        <div ref={RidePanelRef} className='fixed bottom-0 bg-white w-full p-4 transform translate-y-full'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold mb-2'>Confirm Your Ride</h2>
            <IoIosArrowDown onClick={() => setVehicleRidePanel(false)} className='font-bold' size={24} />
          </div>
          <div className='mb-2'>
            <img className='w-3/5 mx-auto' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_254,w_450/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
          </div>
          <ConfirmRidePanel/>
        </div>
      </div>
    </div>
  )
}

export default Home