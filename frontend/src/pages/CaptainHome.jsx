import React, { useContext, useEffect, useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Captaindetails from "../Components/Captaindetails";
import LiveTracking from "../Components/LiveTracking";

import { CaptainDataContext } from '../Context/CaptainContext'
import { SocketContext } from '../Context/SocketContext'
import axios from "axios";

const CaptainHome = () => {
  const { captainId } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);
  const [RidePopupPanel, setRidePopUpPanel] = useState(false);
  const [Ride, setRide] = useState();
  useEffect(() => {
    if (captainId) {
      socket.emit('join', { userType: 'captain', userId: captainId })
      const updateLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            socket.emit('update-location-captain', {
              userId: captainId,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          });
        }
      };
      const locationInterval = setInterval(updateLocation, 10000);
      updateLocation();
// console.log("the ride id", Ride.populatedRide._id)
      // return () => {
      //     clearInterval(locationInterval);
      // };
    }
  }, [captainId]);

  socket.on('New-ride', (data) => {
    setRidePopUpPanel(true)
    localStorage.setItem('ride-dets', JSON.stringify(data));
    setRide(data)
  })
  useEffect(() => {
    const savedRide = localStorage.getItem('ride-dets');
    if (savedRide) {
      try {
        const parsedData = JSON.parse(savedRide);
        setRide(parsedData);
      } catch (error) {
        console.error('Error parsing saved ride data:', error);
        localStorage.removeItem('ride-dets');
      }
    }
  }, []);
  
 async function confirmRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
      rideId: Ride.populatedRide._id,
      captainId: captainId
    },{
      headers: {
         withCredentials: true, 
        Authorization: `${localStorage.getItem('captaintoken')}`
      }
    })
  }
  

  return (
    <div className="h-screen flex flex-col relative">
      {/* Header (Fixed at Top) */}
      <div className="fixed top-0 w-full h-10 px-3 flex items-center justify-between z-[50] bg-white">
        <img
          className="w-14 object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to={"/captain-home"}
          className="w-12 h-12 font-extrabold rounded-full bg-white flex items-center justify-center"
        >
          <IoExitOutline size={24} />
        </Link>
      </div>

      <div className="h-[65%] relative z-[10]">
        <LiveTracking className='w-full h-full bg-cover' />
      </div>

      <div className="h-[35%] bg-white z-[20]">
        <Captaindetails confirmRide={confirmRide} Ride={Ride} RidePopupPanel={RidePopupPanel} setRidePopUpPanel={setRidePopUpPanel}/>
      </div>
    </div>
  );
};

export default CaptainHome;
