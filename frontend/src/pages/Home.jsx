import React, { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import { IoIosArrowDown } from "react-icons/io";
import gsap from "gsap";
import axios from 'axios'

//Context
import { SocketContext } from '../Context/SocketContext'
import { UserContextData } from '../Context/UserContext';

//Components
import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import ConfirmRidePanel from '../Components/ConfirmRidePanel';
import LookingForDriver from '../Components/LookingForDriver';
import WaitingForDriver from '../Components/WaitingForDriver';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../Components/LiveTracking';

const Home = () => {
  LiveTracking
  const navigate = useNavigate();
  const [origin, setpiclocation] = useState('');
  const [destination, setdestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [ispanelopen, setpanleopen] = useState(false);
  const [vehiclepanel, setVehiclepanel] = useState(false);
  const [VehicleRidePanel, setVehicleRidePanel] = useState(false);
  const [DriverFoundPanel, setDriverFoundPanel] = useState(false);
  const [WaitingDriverPanel, setWaitingPanel] = useState(false);
  const [rideStartdata, setrideStartdata] = useState({
    captain: {
      fullname: {
        firstname: '',
        lastname: '',
      },
      platenumber: '',
      vehicle: {
        color: ''
      },
      vehicleType: '',
      origin: '',
      destination: '',
      fare: '',
      otp: ''
    }
  });
  const [vehicleType, setvehicleType] = useState('')
  const [fare, setfare] = useState('')
  const [Ispick, setIspic] = useState(true);
  const [Isdest, setdest] = useState(false);
  const panelref = useRef(null);
  const panelclose = useRef(null);
  const RidePanelRef = useRef(null);
  const choosevehiclepanel = useRef(null);
  const arrowref = useRef(null);
  const DriverFoundRef = useRef(null);
  const WaitingDriverPanelRef = useRef(null);


  const { socket } = useContext(SocketContext);
  const { userId } = useContext(UserContextData)

  useEffect(() => {
    if (userId) {
      // console.log("got userdat",userId)
    }
    socket.emit('join', { userType: 'user', userId: userId });
  })
  socket.on('ride-confirmed', (ride) => {
    setrideStartdata(ride)
    setWaitingPanel(true)
    setDriverFoundPanel(false)
  });

  socket.on('ride-start', (ride) => {
    setWaitingPanel(false);
    navigate('/riding', { state: { ride } })
  })

  async function findtrip() {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/getfare`, {
      params: { origin, destination },
      withCredentials: true,
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    })
    const data = response.data;
    setfare(data);
    // setpiclocation('');
    // setdestination('');
    setpanleopen(false);
    setVehiclepanel(true);

  }
  async function createride() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      origin,
      destination,
      vehicleType
    },
      {
        withCredentials: true,
        Authorization: `${localStorage.getItem('token')}`
      }
    )
    console.log(response)
  }

  let timeout = null;
  const debounce = (callback, delay) => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };

  const fetchSuggestions = async (query, type) => {
    if (!query) {
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        [type]: [],
      }));
      return;
    }

    try {
      const response = await axios.get(
        `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(query)}&key=${import.meta.env.VITE_API_KEY}`
      );
      const results = response.data.hits.map((hit) => hit.name);

      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        [type]: results,
      }));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handlePickupChange = (e) => {
    const query = e.target.value;
    setpiclocation(query);
    setIspic(true);
    setdest(false);
    setSuggestions((prevSuggestions) => ({
      ...prevSuggestions,
      destination: [],
    }));

    debounce(() => fetchSuggestions(query, "pickup"), 300);
  };

  const handleDestinationChange = (e) => {
    const query = e.target.value;
    setdestination(query);
    setdest(true);
    setIspic(false);
    setSuggestions((prevSuggestions) => ({
      ...prevSuggestions,
      pickup: [],
    }));

    debounce(() => fetchSuggestions(query, "destination"), 300);
  };

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
  useGSAP(function () {
    if (DriverFoundPanel) {
      gsap.to(DriverFoundRef.current, {
        y: 0
      })
    } else {
      gsap.to(DriverFoundRef.current, {
        y: '100%'
      })
    }
  }, [DriverFoundPanel])
  useGSAP(function () {
    if (WaitingDriverPanel) {
      gsap.to(WaitingDriverPanelRef.current, {
        y: 0
      })
    } else {
      gsap.to(WaitingDriverPanelRef.current, {
        y: '100%'
      })
    }
  }, [WaitingDriverPanel])



  return (
    
    <div className='w-full h-screen'>
      <div className="h-[60%] z-[10]">
        <LiveTracking className='w-full h-full bg-cover' />
      </div>
      <div className='flex flex-col justify-end absolute bottom-0 w-full h-full '>
        <div className='w-full h-[40%] bg-white px-3 '>
          <div className='mb-4 flex items-center justify-between'>
            <h4 className='text-2xl font-bold mt-3'>Find a trip</h4>
            <IoIosArrowDown onClick={() => {
              setpanleopen(false)
            }} ref={panelclose} className='opacity-0 mt-3' size={22} />
          </div>
          <form>
            <input
              className="w-full outline-[#000] p-3 rounded-lg text-lg font-semibold bg-[#eee] mb-5"
              placeholder="Add a pickup location"
              value={origin}
              onChange={handlePickupChange}
              onClick={() => {
                setSuggestions({});
                setpanleopen(true);
              }}
              type="text"
              name="pickup"
              autoComplete='off'
              required
            />
            <input
              className="w-full outline-[#000] p-3 rounded-lg text-lg font-semibold bg-[#eee]"
              placeholder="Enter your destination"
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setSuggestions({});
                setpanleopen(true);
              }}
              type="text"
              name="destination"
              autoComplete='off'
              required
            />
          </form>
          <button onClick={findtrip} className='text-white bg-black w-full p-2 text-lg rounded-2xl mt-3'>Find Trip</button>
        </div>

        <div ref={panelref} className='w-full h-[60%] bg-white px-3 overflow-y-auto'>
          <LocationSearchPanel setpiclocation={setpiclocation} setdestination={setdestination} suggestions={suggestions} picklocation={origin} destination={destination}
            Ispick={Ispick} Isdest={Isdest} />
        </div>

        {/*vehiclePanel*/}
        <div ref={choosevehiclepanel} className='fixed bottom-0 w-full bg-white p-4 translate-y-full'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-2xl font-bold'>Choose a vehicle Type</h2>
            <IoIosArrowDown className='opacity-0' onClick={() => { setVehiclepanel(false) }} ref={arrowref} size={22} />
          </div>
          <VehiclePanel fare={fare} setVehicleRidePanel={setVehicleRidePanel} setVehiclepanel={setVehiclepanel} setvehicleType={setvehicleType} />
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
          <ConfirmRidePanel setDriverFoundPanel={setDriverFoundPanel} setVehicleRidePanel={setVehicleRidePanel} origin={origin} destination={destination} fare={fare} vehicleType={vehicleType} createride={createride} />
        </div>

        {/* LookingForDriver Panel */}
        <div ref={DriverFoundRef} className='fixed bottom-0 bg-white w-full p-4 transform translate-y-full'>
          <h2 className='text-2xl font-bold text-center'>Looking For driver</h2>
          <div className='mb-2'>
            <img className='w-3/5 mx-auto' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_254,w_450/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
          </div>
          <LookingForDriver origin={origin} destination={destination} fare={fare} vehicleType={vehicleType} />
        </div>

        {/* WaitingForDriver Panel */}
        <div ref={WaitingDriverPanelRef} className='fixed bottom-0 bg-white w-full p-4 transform translate-y-full'>
          <div className='mb-2 flex justify-between'>
            <img className='w-28' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_254,w_450/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
            <div className='text-right'>
              <h1 className='text-xl font-bold -mb-1'>
                {rideStartdata?.captain?.fullname?.firstname}
              </h1>
              <h2 className='text-lg font-bold -mb-1 -mt-1 uppercase'>{rideStartdata?.captain?.platenumber}</h2>
              <h3 className='text-sm uppercase'>{rideStartdata?.captain?.vehicleType} <span className='text-black font-bold'>Color</span> {rideStartdata?.captain?.vehicle?.color}</h3>
              <h2 className='text-lg font-bold -mb-1 -mt-1 uppercase'>OTP : {rideStartdata?.otp}</h2>
            </div>
          </div>
          <WaitingForDriver rideStartdata={rideStartdata} />
        </div>
      </div>
    </div>
  )
}

export default Home