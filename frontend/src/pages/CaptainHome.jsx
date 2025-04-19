import React, { useEffect } from "react";
import { IoExitOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Captaindetails from "../Components/Captaindetails";
import LiveTracking from "../Components/LiveTracking";

const CaptainHome = () => {
  useEffect(() => {
    console.log("CaptainHome Component Mounted!");
  }, []);

  return (
    <div className="h-screen flex flex-col relative">
      {/* Header (Fixed at Top) */}
      <div className="fixed top-0 w-full h-16 px-3 flex items-center justify-between z-[50] bg-white">
        <img
          className="w-20 object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to={"/captain-home"}
          className="w-12 h-12 font-extrabold rounded-full bg-white flex items-center justify-center"
        >
          <IoExitOutline size={28} />
        </Link>
      </div>

      {/* Map Section (65% Height) */}
      <div className="h-[65%] relative z-[10]">
        <LiveTracking />
      </div>

      {/* Details Section (35% Height) */}
      <div className="h-[35%] bg-white z-[20]">
        <Captaindetails />
      </div>
    </div>
  );
};

export default CaptainHome;
